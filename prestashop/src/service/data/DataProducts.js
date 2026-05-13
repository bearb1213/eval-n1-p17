import { saveProduct } from "../product/ProductApi";
// Product -- fonction principale

async function getProducts(file1  , categories , taxes){
    const products = await createProducts(file1, categories , taxes);
    const productsWithId = await saveProducts(products);
    return productsWithId;
}


async function createProducts(file1, categories , taxes) {
    // console.log("taxe in createProducts:", taxes);
    const produits = file1.map(item => {
        const category = categories.find(c => c.name === item['categorie']);
        const tax = taxes.find(t => t.name === item['Taxe']);
        const dateSplite = item['date_availability_produit'].split('/');
        const date = (`${dateSplite[2]}-${dateSplite[1]}-${dateSplite[0]} 00:00:00`);
        const price = parseFloat(item['prix_ttc'].replace(',', '.')) / (1 + (tax.rate / 100));


        return { 
            name: {
                language : 
                { 
                    "@_id": 1,
                    "#text": item['nom']
                }
            },
            tax : tax,
            reference: item['reference'],
            available_date : date,
            wholesale_price : parseFloat(item['prix_achat'].replace(',', '.')),
            price : price.toFixed(2), 
            id_tax_rules_group : tax.id_tax_rules_group ,
            state: 1,   
            on_sale: 1,
            active : 1,
            out_of_stock: 1,  
            id_category_default : category.id,
            associations : {
                categories : {
                    category : [
                        {
                            id : category.id
                        }
                    ]
                }
            }
            
        };
    });
    return produits;
}

async function saveProducts(products) {
    const savedProducts = [];
    for (const product of products) {
        try {
            const savedProduct = await saveProduct({
                name: product.name,
                reference: product.reference,
                available_date: product.available_date,
                wholesale_price: product.wholesale_price,
                price: product.price,
                id_tax_rules_group: product.id_tax_rules_group,
                state: product.state,
                on_sale: product.on_sale,
                active: product.active,
                out_of_stock: product.out_of_stock,
                id_category_default: product.id_category_default,
                associations: product.associations
            });
            savedProducts.push({ ...product, id: savedProduct.id });
        } catch (e) {
            console.log(`Error saving product ${product.name.language["#text"]}:`, e);
        }
    }
    return savedProducts;
}




export { getProducts };

/*
<prestashop xmlns:xlink="http://www.w3.org/1999/xlink">
  <product>
    <name>
      <language id="1">Montre</language>
    </name>
    <reference>M_02</reference>
    <available_date>Fri May 08 2026 00:00:00 GMT+0300 (East Africa Time)</available_date>
    <wholesale_price>40</wholesale_price>
    <price>53.03030303030303</price>
    <id_tax_rules_group>25</id_tax_rules_group>
    <active>1</active>
    <id_category_default>50</id_category_default>
    <associations>
      <categories>
        <category>
          <id>50</id>
        </category>
      </categories>
    </associations>
  </product>
</prestashop>
*/