import { saveCategory , getCategoryNameAndId } from "../category/CategoryApi";
const colonne = 'categorie';
// -- Categories
async function getCategories(file) {
    const categories = await createCategories(file);

    await saveCategories(categories);
    
    const categoriesWithId = await setCategoryIds(categories);

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
    for (const category of categories) {
        try {
            await saveCategory(category);
        } catch (e) {
            console.log(`Error saving category ${category.name.language["#text"]}:`, e);
        }
    }
}

async function setCategoryIds(categories) {
    const categoryMap = await getCategoryNameAndId();
    
    const categoriesWithId = categories.map(category => {
        const foundCategory = categoryMap.find(c => c.name === category.name.language[0]["#text"]);
        if (foundCategory) {
            return { ...category, 
                id: foundCategory.id , 
                name: foundCategory.name , 
                link_rewrite: category.link_rewrite.language[0]["#text"] 
            };
        }
        return category;
    });

    return categoriesWithId;
}

export {getCategories}