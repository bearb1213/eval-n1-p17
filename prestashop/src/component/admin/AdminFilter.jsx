import { testLogin, logoutAdmin } from "../../service/login/LoginTest";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdminFilter() {
    const [admin, setAdmin] = useState(null);
    const [openMenu, setOpenMenu] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdmin = async () => {
            const adminData = await testLogin();
            setAdmin(adminData);

            if (!adminData) {
                navigate("/loginAdmin");
                return;
            }

            const url = window.location.pathname;
            if (url === "/admin" || url === "/admin/") {
                navigate("/admin/dashboard");
            }
        };

        fetchAdmin();
    }, []);

    const handleLogout = () => {
        logoutAdmin();
        setAdmin(null);
        navigate("/customers");
    };

    const links = [
        { name: "Dashboard", path: "/admin/dashboard", isOpenable: false },
        {   
            name: "Data" ,
            isOpenable:true ,
            children : [
                { name : "Cleaning data" , path:"/admin/data/clean"},
                { name : "Upload data" , path:"/admin/data/upload"},
                { name : "Listing" , path:"/admin/data/listing"},
            ]
        },
        {
            name: "Orders",
            path: "/admin/orders",
            isOpenable: false,
        },
        { 
            name : "Stock" , 
            path:"/admin/stock" ,
            isOpenable: false,
        }

    ];

    return (
        <div className="flex h-screen bg-gray-100">

            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-5">
                <h1 className="text-xl font-bold mb-6 text-gray-800">
                    Admin Panel
                </h1>

                <ul className="space-y-2">
                    {links.map((link) => (
                        <li key={link.name}>

                            {/* MAIN LINK + TOGGLE */}
                            <div className="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-200 text-gray-700 font-medium">

                                {/* NAVIGATION */}
                                { link.path && 
                                (

                                    <NavLink
                                    to={link.path}
                                    className="flex-1"
                                    >
                                        {link.name}
                                    </NavLink>
                                ) } { !link.path && (
                                    <span className="flex-1">{link.name}</span>
                                ) }

                                {/* CHEVRON */}
                                {link.children && (
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setOpenMenu(
                                                openMenu === link.name ? null : link.name
                                            );
                                        }}
                                        className="ml-2 text-gray-500 hover:text-gray-800"
                                    >
                                        {openMenu === link.name ? "˅" : ">"}
                                    </button>
                                )}
                            </div>

                            {/* CHILDREN */}
                            {link.children && openMenu === link.name && (
                                <ul className="ml-4 mt-2 space-y-1">
                                    {link.children.map((child) => (
                                        <li key={child.name}>
                                            <NavLink
                                                to={child.path}
                                                className={({ isActive }) =>
                                                    `block px-3 py-1 rounded-md text-sm ${
                                                        isActive
                                                            ? "bg-blue-500 text-white"
                                                            : "text-gray-600 hover:bg-gray-100"
                                                    }`
                                                }
                                            >
                                                {child.name}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            )}

                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col">

                <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-700">
                        Admin Dashboard
                    </h2>

                    <h2>
                        Bienvenu {admin && admin.nom} {admin && admin.prenom}
                    </h2>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    >
                        Logout
                    </button>
                </header>

                <main className="p-6 flex-1 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}