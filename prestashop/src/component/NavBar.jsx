import { use, useEffect ,useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar({ 
                                userName, 
                                isLoggedIn, 
                                onToggleCart, 
                                onToggleLogin , 
                                onRefresh , 
    }) {
    return (
    <nav className="w-full bg-white shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-xl font-semibold text-gray-800">Prestashop</span>
          <span className="text-sm text-gray-500">{isLoggedIn && (<span>Bienvenue, {userName}</span>)}</span>
        </div>

        {isLoggedIn && (
        <div className="flex items-center gap-3">
            <button
            type="button"
            onClick={onToggleCart}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
            Voir panier
          </button>
          <button
          type="button"
          onClick={onToggleLogin}
          className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
          <a
            // type="button"
            // onClick={onRefresh}
            href="/products?reload=2"
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Actualiser
          </a>
        </div>
        )} {!isLoggedIn && (
        <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleLogin}
          className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
          <button
            type="button"
            onClick={onRefresh}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Actualiser
          </button>
        </div>
        )}
      </div>
    </nav>
  );
}
