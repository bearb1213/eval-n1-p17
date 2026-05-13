import { saveProductOption , getProductOptionNameAndId } from "../product/ProductOptionApi.js";
import { saveProductOptionValue , getProductOptionValueNameAndId } from "../product/ProductOptionValueApi.js";
import { saveCombination , getCombinationIdAndProduct } from "../combination/CombinationApi.js";


// -- Options
async function getOptions(file){
    const options = await createOptions(file);
    await saveOptions(options);
    const optionsWithId = await setOptionIds(options);
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
    for (const option of options) {
        try {
            await saveProductOption(option);
        } catch (e) {
            throw e;
            console.log(`Error saving option ${option.name.language["#text"]}:`, e);
        }
    }
}

async function setOptionIds(options) {
    const optionMap = await getProductOptionNameAndId();
    const optionsWithId = options.map(option => {
        const foundOption = optionMap.find(p => p.name === option.name.language[0]["#text"]);
        if (foundOption) {
            return {
                ...option,
                name : option.name.language[0]["#text"],
                pulbic_name : option.public_name.language[0]["#text"],
                id: foundOption.id

            }
        } else {
            console.log(`Option not found: ${option.name.language["#text"]}`);
            return {
                ...option,
                name : option.name.language[0]["#text"],
                pulbic_name : option.public_name.language[0]["#text"],
            };
        }
    });
    return optionsWithId;
}

// options values 
async function getOptionValues(file, options){
    const optionValues = await createOptionValues(file, options);
    await saveOptionValues(optionValues);
    const optionValuesWithId = await setOptionValueIds(optionValues);
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
    for (const optionValue of optionValues) {
        try {
            await saveProductOptionValue(optionValue);
        } catch (e) {
            throw e;
            console.log(`Error saving option value ${optionValue.name.language["#text"]}:`, e);
        }
    }
}

async function setOptionValueIds(optionValues){
    const optionValueMap = await getProductOptionValueNameAndId();
    // console.log("Option Value Map:", optionValueMap);
    const optionValuesWithId = optionValues.map(optionValue => {
        // console.log("Processing option value:", optionValue);
        const foundOptionValue = optionValueMap.find(p => p.name === optionValue.name.language[0]["#text"] 
            && p.id_attribute_group["#text"] == optionValue.id_attribute_group
        );
        // console.log("Found option value:", foundOptionValue);
        if (foundOptionValue) {
            return {
                name : optionValue.name.language[0]["#text"],
                id_attribute_group : optionValue.id_attribute_group,
                id: foundOptionValue.id
            }
        } else {
            return {
                name : optionValue.name.language[0]["#text"],
                id_attribute_group : optionValue.id_attribute_group
            }
        }
    });
    return optionValuesWithId;
}

// Combinations 
async function getCombinations(file , products ,options, optionValues){
    const combinations = await createCombinations(file , products ,options, optionValues);
    await saveCombinations(combinations);
    const combinationsWithId = await setCombinationIds(combinations);
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
    for (const combination of combinations) {
        try {            
            await saveCombination({
                id_product : combination.id_product,
                minimal_quantity : 1,
                price : combination.price,
                wholesale_price : combination.wholesale_price ,
                available_date : combination.available_date,
                associations : combination.associations
            });
        } catch (e) {
            console.log(`Error saving combination for product ${combination.id_product}:`, e);
            throw e;
        }
    }
}
async function setCombinationIds(combinations){
    const combinationMap = await getCombinationIdAndProduct();
    // console.log("Combination Map:", combinationMap );
    const combinationsWithId = combinations.map(combination => {
        // console.log("Processing combination:", combination);    
        const foundCombination = combinationMap.find(c => 
            c.id_product["#text"] === combination.id_product 
            && (c.associations.product_option_values.product_option_value.id === combination.id_option_value)
        );
        // console.log("Found combination:", foundCombination);
        return foundCombination ? {...combination, id: foundCombination.id} : combination;
    });
    return combinationsWithId;
}

export { 
    getOptions ,
    getOptionValues,
    getCombinations,
};  