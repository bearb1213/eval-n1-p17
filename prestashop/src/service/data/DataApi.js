import { deleteAllOrderSlips } from "../order/OrderSlipApi";
import { deleteAllOrderHistories } from "../order/OrderHistoryApi";
import { deleteAllOrderPayments } from "../order/OrderPayementApi";
import { deleteAllOrderCartRules } from "../order/OrderCartRuleApi";
import { deleteAllOrderCarriers } from "../order/OrderCarrierApi";
import { deleteAllOrderDetails } from "../order/OrderDetailApi";
import { deleteAllOrderInvoices } from "../order/OrderInvoiceApi";
import { deleteAllCustomerThreads } from "../customer/CustomerThreadApi";
import { deleteAllCustomerMessages } from "../customer/CustomerMessageApi"; 
import { deleteAllMessages } from "../message/MessageApi";
import { deleteAllSpecificPrices } from "../price/SpecificPriceApi";
import { deleteAllCustomizations } from "../custom/CustomizationApi";
import { deleteAllOrders } from "../order/OrderApi";
import { deleteAllCarts } from "../cart/CartApi";
import { deleteAllCartRules } from "../cart/CartRuleApi";
import { deleteAllGuests } from "../customer/GuestApi";
import { deleteAllCustomers } from "../customer/CustomerApi";
import { deleteAllProductSuppliers } from "../product/ProductSupplierApi";
import { deleteAllCombinations } from "../combination/CombinationApi";
import { deleteAllProducts } from "../product/ProductApi";
import { deleteAllTags } from "../combination/TagApi";
import { deleteAllProductFeatureValues } from "../product/ProductFeatureValueApi";
import { deleteAllProductFeatures } from "../product/ProductFeatureApi";
import { deleteAllProductOptionValues } from "../product/ProductOptionValueApi";
import { deleteAllProductOptions } from "../product/ProductOptionApi";
import { deleteAllManufacturers } from "../manufacturer/ManufacturerApi";
import { deleteAllSuppliers } from "../supplier/SupplierApi";
import { deleteAllAttachments } from "../combination/AttachmentApi";
import { deleteAllCategories } from "../category/CategoryApi";
import { deleteAllTaxRuleGroups } from "../tax/TaxRuleGroupApi";
import { deleteAllTaxRules } from "../tax/TaxRuleApi";
import { deleteAllTaxes } from "../tax/TaxApi";
import { deleteAllPriceRanges } from "../price/PriceRangeApi";
import { deleteAllWeightRanges } from "../product/WeightRangeApi";
import { deleteAllDeliveries } from "../supplier/DeliverieApi.js";
import { deleteAllCarriers } from "../order/CarrierApi";
import { deleteAllAddresses } from "../customer/AddressApi";
import { deleteAllStockMovements } from "../stock/StockMouvementApi.js";

// import { saveCategory , getCategoryNameAndId } from "../category/CategoryApi";
import { getCategories } from "./DataCategory";
import { getTaxes } from "./DataTaxes";
import { getProducts } from "./DataProducts";
import { 
    getCombinations ,
    getOptions ,
    getOptionValues, 
} from "./DataCombination";
import { getStock, } from "./DataStock";
import { getCustomers } from "./DataCustomer";
import { getAddresses } from "./DataAddress.js";
import { getCarts } from "./DataCart.js";
import { getOrders } from "./DataOrder.js";
import { createImageFromZip } from "./DataImage.js";

async function deleteAllData(setFonctionCalled) {
    const fonctionCalled = [];
    try {
        const fonctions = [
            {name : "Delete All Customer Threads", func : deleteAllCustomerThreads},
            {name : "Delete All Customer Messages", func : deleteAllCustomerMessages},
            {name : "Delete All Messages", func : deleteAllMessages},
            {name : "Delete All Specific Prices", func : deleteAllSpecificPrices},
            {name : "Delete All Customizations", func : deleteAllCustomizations},
            {name : "Delete All Order Histories", func : deleteAllOrderHistories},
            {name : "Delete All Order Slips", func : deleteAllOrderSlips} , 
            {name : "Delete All Order Payments", func : deleteAllOrderPayments},
            {name : "Delete All Order Cart Rules", func : deleteAllOrderCartRules},
            {name : "Delete All Order Carriers", func : deleteAllOrderCarriers},
            {name : "Delete All Order Details", func : deleteAllOrderDetails},
            {name : "Delete All Order Invoices", func : deleteAllOrderInvoices},
            {name : "Delete All Orders", func : deleteAllOrders},
            {name : "Delete All Carts", func : deleteAllCarts},
            {name : "Delete All Cart Rules", func : deleteAllCartRules},
            {name : "Delete All Guests", func : deleteAllGuests},
            {name : "Delete All Customers", func : deleteAllCustomers},
            {name : "Delete All Tags", func : deleteAllTags},
            {name : "Delete All Product Suppliers", func : deleteAllProductSuppliers},
            {name : "Delete All Product Feature Values", func : deleteAllProductFeatureValues},
            {name : "Delete All Product Features", func : deleteAllProductFeatures},
            {name : "Delete All Combinations", func : deleteAllCombinations},
            {name : "Delete All Product Option Values", func : deleteAllProductOptionValues},
            {name : "Delete All Product Options", func : deleteAllProductOptions},
            {name : "Delete All Products", func : deleteAllProducts},
            {name : "Delete All Manufacturers", func : deleteAllManufacturers},
            {name : "Delete All Suppliers", func : deleteAllSuppliers},
            {name : "Delete All Attachments", func : deleteAllAttachments},
            {name : "Delete All Categories", func : deleteAllCategories},
            {name : "Delete All Carriers", func : deleteAllCarriers},
            {name : "Delete All Tax Rule Groups", func : deleteAllTaxRuleGroups},
            {name : "Delete All Tax Rules", func : deleteAllTaxRules},
            {name : "Delete All Taxes", func : deleteAllTaxes},
            {name : "Delete All Price Ranges", func : deleteAllPriceRanges},
            {name : "Delete All Weight Ranges", func : deleteAllWeightRanges},
            {name : "Delete All Deliveries", func : deleteAllDeliveries},
            {name : "Delete All Carriers", func : deleteAllCarriers},
            {name : "Delete All Stock Movements", func : deleteAllStockMovements},
            {name : "Delete All Addresses", func : deleteAllAddresses},
        ]
        for (const f of fonctions) {
            await f.func();
            fonctionCalled.push(f.name);
            setFonctionCalled([...fonctionCalled]);
        }
        
    } catch (e) {
        console.log(e);
        
    }
    return fonctionCalled;
}



async function UploadFile(file) { 
    try {
        
        const file1 = file.fichier1;
        const file2 = file.fichier2;
        const file3 = file.fichier3;
        const file4 = file.fichier4;

        const header1 = file.headerfichier1;
        const header2 = file.headerfichier2;
        const header3 = file.headerfichier3;

        await test(file1, file2, file3 , file4, header1, header2, header3);
        // console.log("File 1:", file1);
        // console.log("File 2:", file2);
        // console.log("File 3:", file3);
    // FILE 1 : categories and taxes and products
        // categories check
        const categorie = await getCategories(file1);
        console.log("categories with id :", categorie);
        // taxes
        const taxes = await getTaxes(file1);
        console.log("taxes with id :", taxes);
        // products 
        const products = await getProducts(file1 , categorie , taxes);
        console.log("products with id :", products);

    // FILE 4 : images
        await createImageFromZip(file.fichier4, products, console.log, console.log);
        
    // FILE 2 : combinations
        // options 
        const options = await getOptions(file2);
        console.log("Options with ID:", options);
        // options values
        const optionValues = await getOptionValues(file2, options);
        console.log("Option Values with ID:", optionValues);
        // combinations
        const combinations = await getCombinations(file2 , products ,options, optionValues );
        console.log("Combinations with ID:", combinations);
        // stock
        const stock = await getStock(file2, products , optionValues , combinations);
        console.log("Stock with ID:", stock);

    

    // FILE 3 : orders 
        // customers
        const customers = await getCustomers(file3);
        console.log("Customers with ID:", customers);
        // addresses
        const addresses = await getAddresses(file3);
        console.log("Addresses with ID:", addresses);
        // cart 
        const cart = await getCarts(
                                    file3,products,optionValues
                                    ,combinations,customers
                                );
        console.log("carts with ID:",cart);
        // orders
        const orders = await getOrders(file3 , products , cart , customers , addresses , combinations , stock);
        console.log("orders with ID:", orders);
    return true;
    } catch (error) {
        console.log(error);
        throw error;
        return false;
    }   
    
}


async function test(file1, file2, file3 , file4 ,header1, header2, header3) {
    if(!file1 ) throw new Error("File 1 is required");
    if(!file2 ) throw new Error("File 2 is required");
    if(!file3 ) throw new Error("File 3 is required");
    if(!file4 ) throw new Error("File 4 is required");
    if(!header1 ) throw new Error("Header 1 is required");
    if(!header2 ) throw new Error("Header 2 is required");
    if(!header3 ) throw new Error("Header 3 is required");
    const header1Expected = ["date_availability_produit", "nom", "reference", "prix_ttc", "taxe", "categorie" , "prix_achat"];
    const header2Expected = ["reference", "specificité", "karazany", "stock_initial", "prix_vente_ttc"];
    const header3Expected = ["date", "nom", "email", "pwd", "adresse" , "achat" , "etat"];
    
    for(const header of header1) {
        if(!header1Expected.includes(header.trim().toLowerCase())) {
            throw new Error(`Header in file 1 is not valid. Given: ${header}, Expected headers: ${header1Expected.join(", ")}`);
        }
    }
    for(const header of header2) {
        if(!header2Expected.includes(header.trim().toLowerCase())) {
            throw new Error(`Header in file 2 is not valid. Given: ${header}, Expected headers: ${header2Expected.join(", ")}`);
        }
    }
    for(const header of header3) {
        if(!header3Expected.includes(header.trim().toLowerCase())) {
            throw new Error(`Header in file 3 is not valid. Given: ${header}, Expected headers: ${header3Expected.join(", ")}`);
        }
    } 
    for(const item of file1) {
        if(!(isValidDate(item.date_availability_produit) )){
            throw new Error(`Invalid date format for product ${item.nom}. Expected format: DD/MM/YYYY. Given: ${item.date_availability_produit}`);
        }
        if(Number((item.prix_ttc.replace(/,/g, '.'))) < 0) {
            throw new Error(`Invalid price for product ${item.nom}. Price cannot be negative. Given: ${item.prix_ttc}`);
        }
        if(Number((item.prix_achat.replace(/,/g, '.'))) < 0) {
            throw new Error(`Invalid purchase price for product ${item.nom}. Price cannot be negative. Given: ${item.prix_achat}`);
        }
        // if(Number(item.taxe) < 0) {
        //     throw new Error(`Invalid tax for product ${item.nom}. Tax cannot be negative. Given: ${item.taxe}`);
        // }
    }
    for(const item of file2) {
        // if(Number(item.stock_initial) < 0) {
        //     throw new Error(`Invalid stock quantity for combination ${item.reference} - ${item.specificité}. Stock cannot be negative. Given: ${item.stock_initial}`);
        // }
        if(Number((item.prix_vente_ttc.replace(/,/g, '.'))) < 0) {
            throw new Error(`Invalid sale price for combination ${item.reference} - ${item.specificité}. Price cannot be negative. Given: ${item.prix_vente_ttc}`);
        }
    }
    for(const item of file3) {
        if(!(isValidDate(item.date) )){
            throw new Error(`Invalid date format for order of customer ${item.nom}. Expected format: DD/MM/YYYY. Given: ${item.date}`);
        }
    }
}

function isValidDate(dateString) {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  
  if (!dateString.match(regex)) {
    return false; 
  }

  const parts = dateString.split("/");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; 
  const year = parseInt(parts[2], 10);

  const date = new Date(year, month, day);

  return date.getFullYear() === year && 
         date.getMonth() === month && 
         date.getDate() === day;
}




export { deleteAllData, UploadFile };