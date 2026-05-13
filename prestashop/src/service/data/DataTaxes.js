import {saveTax , getTaxNameAndId } from "../tax/TaxApi";
import {saveTaxRuleGroup , getTaxRuleGroupNameAndId} from "../tax/TaxRuleGroupApi";
import {saveTaxRule} from "../tax/TaxRuleApi";

const id_country = 8;
const colonne = 'Taxe';
// -- Taxes , fonction principale
async function getTaxes(file){
    const taxes = await getTaxesInit(file);
    // console.log("Taxes with IDs:", taxes);
    const taxRuleGroups = await getTaxRuleGroups(taxes);
    await getTaxRules(taxes , taxRuleGroups);
    return await joinTaxesWithTaxRuleGroups(taxes , taxRuleGroups);

}
// TAXES
async function getTaxesInit(file) {
    const taxes = await createTaxes(file);
    // console.log("Created taxes:", taxes);
    await saveTaxes(taxes);
    const taxesWithId = await setTaxIds(taxes);
    return taxesWithId;
}

async function createTaxes(file){
    const taxes = file.map(item => (item[colonne]));
    const uniqueTaxes = [...new Set(taxes)];
    const retour = uniqueTaxes.map(tax => {
        const taxValue = parseFloat(tax.replace('%', '').replace(',', '.'));
        return {
            name: {
                language :[
                    {
                    "@_id": 1,
                    "#text": tax
                    }
                ]
            }, 
            rate: taxValue ,
            active : 1
        };
    });
    return retour;
}

async function saveTaxes(taxes) {
    for (const tax of taxes) {
        try {
            await saveTax(tax);
        } catch (e) {
            console.log(`Error saving tax ${tax.name.language["#text"]}:`, e);
        }
    }
}

async function setTaxIds(taxes){
    const taxMap = await getTaxNameAndId();

    const taxesWithId = taxes.map(tax => { 
        const foundTax = taxMap.find(t => t.name === tax.name.language[0]["#text"]);
        if (foundTax) {
            return { ...tax, 
                id: foundTax.id , 
                name: foundTax.name , 
            };
        } else {
            console.log(`Tax not found for name: ${tax.name.language[0]["#text"]}`);
            return tax;
        }
        return tax;
    });

    return taxesWithId;

}

// TAXE RULE GROUPS
async function getTaxRuleGroups(taxes){
    const taxRuleGroups = await createTaxRuleGroups(taxes);
    await saveTaxRuleGroups(taxRuleGroups);
    const taxRuleGroupsWithId = await setTaxRuleGroupIds(taxRuleGroups);
    return taxRuleGroupsWithId;
}

async function createTaxRuleGroups(taxes){
    const retour = taxes.map(tax => {
        return {
            name: tax.name,
            active : 1
        }
    });
    return retour;
}
async function saveTaxRuleGroups(taxRuleGroups) {
    for (const taxRuleGroup of taxRuleGroups) {
        try {
            await saveTaxRuleGroup(taxRuleGroup);
        } catch (e) {
            console.log(`Error saving tax rule group ${taxRuleGroup.name}:`, e);
        }
    }
}
async function setTaxRuleGroupIds(taxRuleGroups){
    const taxRuleGroupMap = await getTaxRuleGroupNameAndId();
    const taxRuleGroupsWithId = taxRuleGroups.map(trg => {
        const foundTrg = taxRuleGroupMap.find(t => t.name === trg.name);
        if (foundTrg) {
            return { ...trg, 
                id: foundTrg.id , 
                name: foundTrg.name , 
            };
        } else {
            console.log(`Tax rule group not found for name: ${trg.name}`);
            return trg;
        }
    });
    return taxRuleGroupsWithId;
}

// TAX RULES 
async function getTaxRules(taxes , taxRuleGroups){
    const taxRules = await createTaxRules(taxes, taxRuleGroups);
    await saveTaxRules(taxRules);
}
async function createTaxRules(taxes, taxRuleGroups){
    const taxRules = taxes.map(tax => {
        const taxRuleGroup = taxRuleGroups.find(trg => trg.name === tax.name);
        if (taxRuleGroup) {
            return {
                id_tax_rules_group : taxRuleGroup.id,
                id_tax : tax.id,
                description : tax.name,
                id_country : id_country,
            }
        }
    });
    return taxRules;
} 
async function saveTaxRules(taxRules) {
    for (const taxRule of taxRules) {
        try {
            await saveTaxRule(taxRule);
        } catch (e) {
            console.log(`Error saving tax rule for tax ${taxRule.description}:`, e);
        }
    }
}

// join les ids

async function joinTaxesWithTaxRuleGroups(taxes , taxRuleGroups){
    const taxRules = taxes.map(tax => {
        const taxRuleGroup = taxRuleGroups.find(trg => trg.name === tax.name);
        if (taxRuleGroup) {
            return {
                id_tax_rules_group : taxRuleGroup.id,
                id_tax : tax.id,
                description : tax.name,
                id_country : id_country,
                rate : tax.rate,
                name : tax.name
            }
        }
    });
    return taxRules;
}

export {getTaxes};