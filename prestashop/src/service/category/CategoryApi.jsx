import {ApiAction} from "../util/ApiAction.js";
import {XMLParser , XMLBuilder} from "fast-xml-parser";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const jsonToXml = new XMLBuilder({ignoreAttributes: false,
                                format: true,
                                cdataPropName: "#text"});
const apiUrl = "/categories"
const singular = "category";
const plural = "categories";

async function getAllCategories() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"full"})
        const json = xmlToJson.parse(result);
        const categories = json.prestashop.categories.category;
        // console.log(categories);

        return Array.isArray(categories) ? categories : [categories];
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteCategory(id) {
    id = parseInt(id);
    if(id == 1 || id==2 || id=="1" || id=="2"){
        throw new Error("Can't delete category with id "+id);
    }
    try {
        const result = await ApiAction(
            apiUrl+"/"+id ,
            "DELETE"
        );
        const json = xmlToJson.parse(result);
        return json.prestashop;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function getAllIdCategories() {
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[id]"}
        );
        const json = xmlToJson.parse(result);
        const categories = json.prestashop.categories;
        console.log(categories);

        return categories;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function deleteAllCategories() {
    try {
        const categories = await getAllIdCategories();
        const ids = Array.isArray(categories.category)
            ? categories.category.map(c => c.id)
            : categories.category && Object.keys(categories.category).length > 0
            ? [categories.category.id]
            : [];
        console.log("IDs to delete:", ids);
        for (const id of ids) {
            if(id == 1 || id==2 || id=="1" || id=="2"){
                console.log("Skipping deletion of category with id "+id);
                continue;
            }
            try {
                const rep = await deleteCategory(id);
                console.log(`Deleted category with id ${id}:`, rep);
            } catch (e) {
                console.log(`Error deleting category with id ${id}:`, e);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function saveCategory(category) {
    try {
        const categoryXml = await jsonToXml.build({
            prestashop: {
                "@_xmlns:xlink": "http://www.w3.org/1999/xlink",
                category: category
            }
        });
        const result = await ApiAction(
            apiUrl ,
            "POST" ,
            {},
            categoryXml,
        );
        const json = xmlToJson.parse(result);
        return json.prestashop.category;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function getCategoryNameAndId() {
    try {
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"display":"[name,id]"}
        );
        const json = xmlToJson.parse(result);
        const categories = json.prestashop.categories.category;
        return categories.map(c => ({
            id: c.id,
            name: c.name.language["#text"],
        }));
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export {
    getAllCategories , 
    deleteCategory, 
    getAllIdCategories, 
    deleteAllCategories,
    saveCategory ,
    getCategoryNameAndId ,
};

/*
<prestashop>
    <@_xmlns:xlink>http://www.w3.org/1999/xlink</@_xmlns:xlink>
    <category>
        <name>
            <language>
                <@_id>1</@_id>
                Akanjo
            </language>
        </name>
        <link_rewrite>
            <language>
                <@_id>1</@_id>
                Akanjo
            </language>
        </link_rewrite>
        <active>1</active>
    </category>
</prestashop>
*/