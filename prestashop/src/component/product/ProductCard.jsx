import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  return (
    <article className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div className="h-44 w-full overflow-hidden rounded-t-xl bg-gray-100">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-gray-400">
            Image indisponible
          </div>
        )}
      </div>
      <div className="p-5 flex-1">
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
              {product.category?.name || "Sans categorie"}
            </span>
            {isHot(product.available_date) && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-red-50 text-red-700 border border-red-200">
                HOT
              </span>
            )}
            {isNew(product.available_date) && !isHot(product.available_date) && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-200">
                NEW
              </span>
            )}
          </div>
        </div>

        <h2 className="text-lg font-semibold text-gray-900 mb-4 line-clamp-2">
          {product.name}
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Prix de vente</p>
            <p className="text-lg font-bold text-gray-800">
              {formatPrice(product.price * (1 + (product.tax?.rate || 0) / 100))}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-4 mb-4">
          
          <div>
            <span className="text-gray-500">Dispo. :</span>{" "}
            <span className="font-medium text-gray-700">
              {product.available_date
                ? new Date(product.available_date).toLocaleDateString()
                : "-"}
            </span>
          </div>
        </div>

        {product.option_values?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {product.option_values.map((option) => (
              <span
                key={`${product.id}-${option.id}`}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"
              >
                {option.name}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="px-5 py-3 bg-gray-50 rounded-b-xl border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Stock total</span>
          <span className="text-sm font-semibold text-gray-800">
            {sumProductStock(product)}
          </span>
        </div>
        <div className="mt-3">
          <Link
            to={`/products/${product.id}`}
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Voir la fiche produit
          </Link>
        </div>
      </div>
    </article>
  );
}

function sumProductStock(product) {
  if (!Array.isArray(product?.stock)) return 0;
  const stock = product.stock.find(
    (entry) => !entry.id_product_attribute || entry.id_product_attribute === "0"
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
