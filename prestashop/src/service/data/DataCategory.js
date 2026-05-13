import { act } from "react";
import { saveCategory , getCategoryNameAndId } from "../category/CategoryApi";
const colonne = 'categorie';
// -- Categories
async function getCategories(file) {
    const categories = await createCategories(file);
    // save et set id 
    const categoriesWithId = await saveCategories(categories);
    
    // const categoriesWithId = await setCategoryIds(categories);

    return categoriesWithId;
}

async function createCategories(file) {
    const categoryName = file.map(item => item[colonne]);
    const uniqueCategories = [...new Set(categoryName)];
    const categories = uniqueCategories.map(category => {
        return {
            name: {
                language : [
                    {
                        "@_id": 1,
                        "#text": category
                    }
                ]
            },
            link_rewrite : {
                language : [
                    { 
                        "@_id": 1,
                        "#text": category.replace("/[^_a-zA-Z0-9-]/g", "_")
                    }
                ]
            },
            active : 1
        };
    });
    return categories;
}

async function saveCategories(categories) {
    const savedCategories = [];
    for (const category of categories) {
        try {
            // save
            const savedCategory = await saveCategory(category);
            // set id
            savedCategories.push({
                id: savedCategory.id,
                name: category.name.language[0]["#text"],
                link_rewrite: category.link_rewrite.language[0]["#text"],
                active: category.active
            });
        } catch (e) {
            console.log(`Error saving category ${category.name.language["#text"]}:`, e);
        }
    }
    return savedCategories;
}


export {getCategories}