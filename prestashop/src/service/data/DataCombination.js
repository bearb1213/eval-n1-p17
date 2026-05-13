import { saveProductOption } from "../product/ProductOptionApi.js";
import { saveProductOptionValue } from "../product/ProductOptionValueApi.js";
import { saveCombination } from "../combination/CombinationApi.js";


// -- Options
async function getOptions(file){
    const options = await createOptions(file);
    const optionsWithId = await saveOptions(options);
    return optionsWithId;
}

async function createOptions(file){
    const colonne = "specificité";
    const options = file.map(item => {
        if(!item[colonne]){
            return ;
        }
        return {
            public_name: item[colonne],
            name: (item[colonne])
        } ;
    });
    const uniqueOptions = [];
    for (const option of options) {
        if (!option) continue; // Skip undefined options
        if (!uniqueOptions.some(o => o.name === option.name)) {
            uniqueOptions.push(option);
        }
    }
    const retour = uniqueOptions.map(option => {
        return {
            name: { 
                language :[
                    {
                        "@_id": 1,
                        "#text": option.name
                    }
                ]
            } ,
            public_name : {
                language :[
                    {
                        "@_id": 1,
                        "#text": option.public_name
                    }
                ]
            } ,
            group_type : "select",
        };
    });
    return retour;
}

async function saveOptions(options) {
    const savedOptions = [];
    for (const option of options) {
        try {
            const savedOption = await saveProductOption(option);
            savedOptions.push({
                ...option,
                name: option.name.language[0]["#text"],
                pulbic_name: option.public_name.language[0]["#text"],
                id: savedOption.id
            });
        } catch (e) {
            throw e;
        }
    }
    return savedOptions;
}

// options values 
async function getOptionValues(file, options){
    const optionValues = await createOptionValues(file, options);
    const optionValuesWithId = await saveOptionValues(optionValues);
    return optionValuesWithId;
}
async function createOptionValues(file,options){
    const colonne = "karazany";
    const optionValues = file.map(item => {
        if(!item[colonne]){
            return ;
        }
        if(!item["specificité"]){
            return ;
        }
        return {
            reference: item["reference"],
            specificité : item["specificité"],
            karazany : item[colonne]
        }
    }); 
    const uniqueOptionValues = [];
    for (const optionValue of optionValues) {
        if (!optionValue) continue; // Skip undefined option values
        if (!uniqueOptionValues.some(o => o.karazany === optionValue.karazany && o.specificité === optionValue.specificité && o.reference === optionValue.reference)) {
            uniqueOptionValues.push(optionValue);
        }
    }
    // console.log("Unique option values:", uniqueOptionValues);
    const retour = uniqueOptionValues.map(optionValue => {
        if(!optionValue.karazany){
            return ;
        }
        const option = options.find(o => o.name == optionValue.specificité ) ;
        if(option){
            return {
                id_attribute_group : option.id,
                name : {
                    language : [ 
                        {
                            "@_id" : 1,
                            "#text" : optionValue.karazany
                        },
                    ],
            },
        }
        } else {
            return {
                name : {
                    language : [ 
                        {
                            "@_id" : 1,
                            "#text" : optionValue.karazany
                        },
                    ],
                },
            }
        }
        
    });

    return retour;
}

async function saveOptionValues(optionValues) {
    const savedOptionValues = [];
    for (const optionValue of optionValues) {
        try {
            const savedOptionValue = await saveProductOptionValue(optionValue);
            savedOptionValues.push({
                name: optionValue.name.language[0]["#text"],
                id_attribute_group: optionValue.id_attribute_group,
                id: savedOptionValue.id
            });
        } catch (e) {
            throw e;
        }
    }
    return savedOptionValues;
}

// Combinations 
async function getCombinations(file , products ,options, optionValues){
    const combinations = await createCombinations(file , products ,options, optionValues);
    const combinationsWithId = await saveCombinations(combinations);
    return combinationsWithId;
}

async function createCombinations(file , products ,options, optionValues){
    const combinations = file.map(item => {
        const productFound = products.find(p => p.reference === item["reference"]);
        const optionFound = options.find(o => o.name === item["specificité"]);
        const optionValueFound = optionValues.find(ov => ov.name === item["karazany"] && ov.id_attribute_group == optionFound.id);
        if(productFound && optionFound && optionValueFound){
            const price = parseFloat(item['prix_vente_ttc'].replace(',', '.')) / (1 + (productFound.tax.rate / 100));
            return {
                id_product : productFound.id,
                id_option : optionFound.id,
                id_option_value : optionValueFound.id,
                minimal_quantity : 1,
                price : price.toFixed(2),
                wholesale_price : productFound.wholesale_price , 
                available_date : productFound.available_date,
                associations : {
                    product_option_values : {
                        product_option_value : [
                            {
                                id : optionValueFound.id
                            }
                        ]
                    }
                }
            };
        } else {
            return;
        }
    });
    const uniqueCombinations = [];
    for (const combination of combinations) {
        if (!combination) continue; // Skip undefined combinations
        if (!uniqueCombinations.some(c => c.id_product === combination.id_product && c.associations.product_option_values.product_option_value[0].id === combination.associations.product_option_values.product_option_value[0].id)) {
            uniqueCombinations.push(combination);
        }
    }
    return uniqueCombinations;
}
async function saveCombinations(combinations) {
    const savedCombinations = [];
    for (const combination of combinations) {
        try {            
            const savedCombination = await saveCombination({
                id_product : combination.id_product,
                minimal_quantity : 1,
                price : combination.price,
                wholesale_price : combination.wholesale_price ,
                available_date : combination.available_date,
                associations : combination.associations
            });
            savedCombinations.push({ ...combination, id: savedCombination.id });
        } catch (e) {
            console.log(`Error saving combination for product ${combination.id_product}:`, e);
            throw e;
        }
    }
    return savedCombinations;
}

export { 
    getOptions ,
    getOptionValues,
    getCombinations,
};  