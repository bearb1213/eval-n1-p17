import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProducts } from "../../service/product/ProductService";
import { handleCart } from "../../service/cart/CartService";

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedComboId, setSelectedComboId] = useState("");
  const [number , setNumber] = useState(1);
  const [loadingAdd , setLoadingAdd] = useState(false);
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        let productsData = [];
        const productLocal = localStorage.getItem("products");
        if(!productLocal){

            setLoading(true);
            productsData = await getProducts();
            localStorage.setItem("products", JSON.stringify(productsData));
        } else {
            productsData = JSON.parse(productLocal);
        }
        const found = productsData.find(
          (item) => String(item.id) === String(productId)
        );
        setProduct(found || null);
        const firstComboId = found?.combinations?.[0]?.id;
        setSelectedComboId(firstComboId ? String(firstComboId) : "");
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  

  const selectedCombo = product?.combinations?.find(
    (combo) => String(combo.id) === String(selectedComboId)
  );
  const basePrice = (product?.price) * (1+ (product?.tax?.rate || 0) / 100) || 0;
  const comboPrice = selectedCombo ? selectedCombo.price : 0;
  const displayPrice = basePrice + (( comboPrice) * (1 + (product?.tax?.rate || 0) / 100));
  const selectedComboStock = selectedCombo
    ? getCombinationStock(product, selectedCombo.id)
    : sumProductStock(product);
  const quantityValue = Number(number) || 0;
  const isQuantityInvalid = quantityValue < 1;
  const isStockInsufficient = selectedComboStock !== 0 && quantityValue > selectedComboStock;

  const getComboLabel = (combo) => {
    if (!combo) return "";
    const names = (combo.option_values || [])
      .map((option) => option?.name)
      .filter(Boolean);
    return combo ? (names.length > 0 ? names.join(" / ") : `#${combo.id}` ): "";
  };

  const handleAddToCart = async () => {
    setLoadingAdd(true);
    try {

      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      
      const existingIndex = cart.findIndex(
        (item) =>
          String(item.productId) === String(product.id) && String(item.comboId) === String(selectedComboId)
      );
      if (existingIndex !== -1) {
        cart[existingIndex].qty += quantityValue;
        if (cart[existingIndex].qty > selectedComboStock) {
          alert("Quantite demandee depasse le stock disponible pour cette combinaison.");
          cart[existingIndex].qty = selectedComboStock;
        }
        cart[existingIndex].price = displayPrice;
        cart[existingIndex].productname = product.name;
        cart[existingIndex].optionsName = getComboLabel(selectedCombo);
      } else {
        cart.push({
          productId: product.id,
          productname : product.name,
          comboId: selectedComboId!== "" || selectedComboId !== undefined  ? selectedComboId : 0,
          optionsName: getComboLabel(selectedCombo),
          reference : product.reference,
          price_ht: product.price ,
          price_add : comboPrice,
          tax : product?.tax?.rate || 0,
          price: displayPrice,
          qty: quantityValue
        });
      }
      const idCustomer = JSON.parse(localStorage.getItem("customer"))?.id || null;
      const idGuest = localStorage.getItem("guestId") || null;
      const cartId = localStorage.getItem("cartId");

      const result = await handleCart(idCustomer, idGuest, cartId, cart);
      console.log("Cart updated/saved: ", result);
      
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error adding to cart: ", error);
      alert("Une erreur est survenue lors de l'ajout au panier. Veuillez réessayer.");
    }
    setLoadingAdd(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-500">Chargement du produit...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <section className="px-4 py-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-500">Produit introuvable.</p>
          <Link
            to="/products"
            className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-700"
          >
            Retour a la liste
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          to="/products"
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Retour a la liste
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                {product.category?.name || "Sans categorie"}
              </span>
              {isHot(product.available_date) && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide bg-red-50 text-red-700 border border-red-200">
                  HOT
                </span>
               )}
              {isNew(product.available_date) && !isHot(product.available_date) && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-200">
                  NEW
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-4">
              {product.name}
            </h1>
            <p className="text-sm text-gray-400">#{product.id}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Prix TTC</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatPrice(displayPrice)}
            </p>
            <p className="text-xs text-gray-500 mt-2">Prix d'achat</p>
            <p className="text-lg font-semibold text-gray-700">
              {formatPrice(product.wholesale_price)}
            </p>
          </div>
        </div>
        <div className="mt-6 flex gap-4">

        {product.combinations?.length > 0 && (
          <div className="mt-6">
            <label htmlFor="options" className="mb-2 block text-sm font-medium text-gray-700">
              Choisir une combinaison
            </label>
            <select
              id="options"
              value={selectedComboId}
              onChange={(e) => setSelectedComboId(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
              {product.combinations.map((combo) => (
                <option key={combo.id} value={combo.id}>
                  {getComboLabel(combo)}
                </option>
              ))}
            </select>
          </div>
        )}
          <div className="mt-6">
            <label htmlFor="quantity" className="mb-2 block text-sm font-medium text-gray-700">
              Quantite
            </label>
            <input
              id="quantity"
              className="w-20 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="number"
            min="1"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="mt-6 flex items-end">
            <button
              type="button"
              disabled={isQuantityInvalid || isStockInsufficient || loadingAdd}
              onClick={handleAddToCart}
              className={`rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 ${isQuantityInvalid || isStockInsufficient || loadingAdd ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loadingAdd ? "Ajout..." : "Ajouter au panier"}
            </button>
          </div>
          {isStockInsufficient && (
            <p className="mt-2 text-sm text-red-600">
              Stock insuffisant pour la combinaison selectionnee.
            </p>
          )}
          
        </div>

        <div className="grid gap-6 sm:grid-cols-2 mt-6">
          <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
            
            <p className="text-xs text-gray-500 mt-4">Disponibilite</p>
            <p className="text-sm font-semibold text-gray-800">
              {product.available_date
                ? new Date(product.available_date).toLocaleDateString()
                : "-"}
            </p>
            <p className="text-xs text-gray-500 mt-4">Stock total</p>
            <p className="text-sm font-semibold text-gray-800">
              {sumProductStock(product)}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-gray-500">Options</p>
            {product.option_values?.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {product.option_values.map((option) => (
                  <span
                    key={`${product.id}-${option.id}`}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-gray-700 border border-gray-200"
                  >
                    {option.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 mt-2">Aucune option</p>
            )}
          </div>
        </div>

        {product.combinations?.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Combinaisons
            </h2>
            <div className="grid gap-3">
              {product.combinations.map((combo) => (
                <div
                  key={combo.id}
                  className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3"
                >
                  <div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {combo.option_values?.map((option) => (
                        <span
                          key={`${combo.id}-${option.id}`}
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"
                        >
                          {option.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Prix TTC</p>
                    <p className="text-sm font-semibold text-gray-800"> 
                       {formatPrice(
                        (basePrice + (combo.price) * (1 + (product.tax?.rate || 0) / 100))
                      )} 
                    </p>
                    <p className="text-sm font-semibold text-gray-400">
                      {formatPrice(basePrice)} + {formatPrice(combo.price)}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Quantite</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {getCombinationStock(product, combo.id)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function sumProductStock(product) {
  if (!Array.isArray(product?.stock)) return 0;
  const stock = product.stock.find(
    (entry) => !entry.id_product_attribute || entry.id_product_attribute === "0"
  );
  return stock ? stock.quantity : 0;
}

function getCombinationStock(product, combinationId) {
  if (!Array.isArray(product?.stock)) return 0;
  const stock = product.stock.find(
    (entry) => String(entry.id_product_attribute) === String(combinationId)
  );
  return stock ? stock.quantity : 0;
}

function isHot(availableDate) {
  if (!availableDate) return false;
  const date = new Date(availableDate);
  if (Number.isNaN(date.getTime())) return false;
  const diffDays = (Date.now() - date.getTime()) / 86400000;
  return diffDays >= 0 && diffDays <= 1;
}

function isNew(availableDate) {
  if (!availableDate) return false;
  const date = new Date(availableDate);
  if (Number.isNaN(date.getTime())) return false;
  const diffDays = (Date.now() - date.getTime()) / 86400000;
  return diffDays > 1 && diffDays <= 7;
}
