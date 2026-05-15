import { getAllTaxRuleGroups } from "./TaxRuleGroupApi";
import { getAllTaxRules } from "./TaxRuleApi";
import { getAllTaxes } from "./TaxApi";

async function getTax(){
    try {
        const taxRuleGroups = await getAllTaxRuleGroups();
        const taxRules = await getAllTaxRules();
        const taxes = await getAllTaxes();

        // console.log("taxRuleGroups", taxRuleGroups);
        // console.log("taxRules", taxRules);
        // console.log("taxes", taxes);

        const formated = taxRules.map(taxRule => {
            const trgFound = taxRuleGroups.find(trg => String(trg.id) === String(taxRule.id_tax_rules_group["#text"]));
            const taxFound = taxes.find(tax => String(tax.id) === String(taxRule.id_tax));
            if(!trgFound){
                return;
            }
            if(!taxFound){
                return;
            }
            return {
                id_tax_rules_group : trgFound.id ,
                id_tax : taxFound.id ,
                id_tax_rule : taxRule.id ,
                rate : taxFound.rate,
                tax_name : taxFound.name.language["#text"] || "",
                tax_rules_group_name : trgFound.name || "",
            }
        });
        const retour = formated.filter(item => item !== undefined);
        return retour; 
    } catch (error) {
        throw error;
    }
}
export {
    getTax,
}
