import {saveTax } from "../tax/TaxApi";
import {saveTaxRuleGroup } from "../tax/TaxRuleGroupApi";
import {saveTaxRule} from "../tax/TaxRuleApi";

const id_country = 8;
const colonne = 'taxe';
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
    const taxesWithId = await saveTaxes(taxes);
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
    const savedTaxes = [];
    for (const tax of taxes) {
        try {
            const savedTax = await saveTax(tax);
            savedTaxes.push({
                ...tax,
                id: savedTax.id,
                name: tax.name.language[0]["#text"]
            });
        } catch (e) {
            console.log(`Error saving tax ${tax.name.language["#text"]}:`, e);
        }
    }
    return savedTaxes;
}

// TAXE RULE GROUPS
async function getTaxRuleGroups(taxes){
    const taxRuleGroups = await createTaxRuleGroups(taxes);
    const taxRuleGroupsWithId = await saveTaxRuleGroups(taxRuleGroups);
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
    const savedTaxRuleGroups = [];
    for (const taxRuleGroup of taxRuleGroups) {
        try {
            const savedTaxRuleGroup = await saveTaxRuleGroup(taxRuleGroup);
            savedTaxRuleGroups.push({ ...taxRuleGroup, id: savedTaxRuleGroup.id });
        } catch (e) {
            console.log(`Error saving tax rule group ${taxRuleGroup.name}:`, e);
        }
    }
    return savedTaxRuleGroups;
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
    const savedTaxRules = [];
    for (const taxRule of taxRules) {
        try {
            const savedTaxRule = await saveTaxRule(taxRule);
            savedTaxRules.push({ ...taxRule, id: savedTaxRule.id });
        } catch (e) {
            console.log(`Error saving tax rule for tax ${taxRule.description}:`, e);
        }
    }
    return savedTaxRules;
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