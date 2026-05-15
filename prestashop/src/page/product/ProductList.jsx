import { getProducts } from "../../service/product/ProductService";
import { useEffect, useState } from "react";
import ProductCard from "../../component/product/ProductCard";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Pour une meilleure UX

  useEffect(() => {
    async function fetchProducts() {
      try {
        // const productLocal = localStorage.getItem("products");
        // if(!productLocal){

            setLoading(true);
            const productsData = await getProducts();
            setProducts(productsData);
            localStorage.setItem("products", JSON.stringify(productsData));
        // } else {
            // setProducts(JSON.parse(productLocal));
        // }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

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

      {/* Grille */}
      {products.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-400 text-lg">Aucun produit pour le moment.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
