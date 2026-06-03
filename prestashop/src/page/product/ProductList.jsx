import { getProducts } from "../../service/product/ProductService";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "../../component/product/ProductCard";
import { useLocation } from "react-router-dom";
export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Pour une meilleure UX
  const [searchName, setSearchName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const location = useLocation();
  const reload = new URLSearchParams(location.search).get("reload");

  useEffect(() => {
    async function fetchProducts() {
      try {
        // const productLocal = localStorage.getItem("products");
        // if(!productLocal){
          if (reload) {
            setLoading(true);
            const productsData = await getProducts();
            setProducts(productsData);
            localStorage.setItem("products", JSON.stringify(productsData));
          } else {
            setProducts(JSON.parse(localStorage.getItem("products") || "[]"));
          }



        // } else {
            // setProducts(JSON.parse(productLocal));
        // }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    const reloading = sessionStorage.getItem("reload");
    if (reloading === "reload"){
        sessionStorage.removeItem("reload");
        window.location.reload();
    }
    fetchProducts();
  }, []);

  
  const categories = useMemo(() => {
    const names = products
      .map((product) => product.category?.name)
      .filter(Boolean);
    return Array.from(new Set(names)).sort((a, b) => a.localeCompare(b));
  }, [products]);

  const filteredProducts = useMemo(() => {
    const nameQuery = searchName.trim().toLowerCase();
    const min = minPrice === "" ? null : Number(minPrice);
    const max = maxPrice === "" ? null : Number(maxPrice);

    return products.filter((product) => {
      const matchName = nameQuery
        ? product.name?.toLowerCase().includes(nameQuery)
        : true;
      const matchCategory =
        selectedCategories.length === 0
          ? true
          : selectedCategories.includes(product.category?.name || "");
      const priceValue = Number(product.price);
      const matchMin = min === null ? true : priceValue >= min;
      const matchMax = max === null ? true : priceValue <= max;

      return matchName && matchCategory && matchMin && matchMax;
    });
  }, [products, searchName, selectedCategories, minPrice, maxPrice]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-500">Chargement des produits...</span>
      </div>
    );
  }

  return (
    <section className="px-4 py-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold text-gray-900">Produits</h1>
        <p className="mt-1 text-gray-500">Parcourez votre catalogue</p>
      </div>

      <div className="mb-6 grid gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Nom du produit
          </label>
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Rechercher par nom"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Prix min
          </label>
          <input
            type="number"
            min="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="0"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Prix max
          </label>
          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="100000"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Categories
          </label>
          <div className="max-h-40 space-y-2 overflow-auto rounded-md border border-gray-200 p-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategories((prev) => [...prev, category]);
                    } else {
                      setSelectedCategories((prev) => prev.filter((item) => item !== category));
                    }
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                {category}
              </label>
            ))}
            {categories.length === 0 && (
              <p className="text-xs text-gray-400">Aucune categorie.</p>
            )}
          </div>
        </div>
      </div>

      {/* Grille */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-400 text-lg">Aucun produit pour le moment.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
