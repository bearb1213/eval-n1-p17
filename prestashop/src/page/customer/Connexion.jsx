import { useEffect, useState } from "react";
import { getOrdersByCustomerId } from "../../service/order/OrderService";
import { 
  getAllCustomersService , 
  createGuestForCustomer ,
  verifyPassword
} from "../../service/customer/CustomerService";
import { useNavigate } from "react-router-dom";


export default function Connexion() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCustomerId, setActiveCustomerId] = useState(null);
  const [password, setPassword] = useState("");

  const handleViewInput = (customer) => {
    // localStorage.setItem("customer", JSON.stringify(customer));
    if (activeCustomerId === customer.id) {
      setActiveCustomerId(null);
      setPassword("");
      return;
    }
    setActiveCustomerId(customer.id);
    setPassword("");
  };
  const handleClose= ()=>{
    setActiveCustomerId(null);
    setPassword("");
  }
  const handleConnectAnonymous = async () => {
    localStorage.setItem("customer", JSON.stringify({ 
          isAnnonymous: true ,
          id : null ,
          lastname : "Anonyme",
          firstName : "Anonyme",
    }));
    const guests = await createGuestForCustomer();
    // console.log("Guest créé : ", guests);
    localStorage.setItem("guest", JSON.stringify(guests));
    navigate("/products");
  };
  const handleConnectCustomer = async (customer) => {
    try {
      console.log("Customer sélectionné : ", customer);
      const isValid = await verifyPassword(password, customer.passwd);
      if (isValid) {
        localStorage.setItem("customer", JSON.stringify(customer));
        setActiveCustomerId(null);
        setPassword("");
        const orders = await getOrdersByCustomerId(customer.id);
        localStorage.setItem("orders", JSON.stringify(orders));
        sessionStorage.setItem("reload", "reload");
        navigate("/products");
        // window.location.reload();
        // alert("Connexion réussie !");
      } else {
        setError("Mot de passe incorrect.");
        // alert("Mot de passe incorrect.");
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    let active = true;

    const fetchCustomers = async () => {
      try {
        const data = await getAllCustomersService();
        if (active) {
          setCustomers(data);
        }
      } catch (err) {
        if (active) {
          setError("Erreur lors du chargement des clients.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchCustomers();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <div className="p-6">Chargement...</div>;
  }


  return (
    <div className="min-h-screen flex justify-center bg-gray-50 px-4">
      <div className="w-full max-w-6xl pt-4 pb-6 px-6">
        <h1 className="mb-6 text-2xl font-semibold text-gray-800 text-center">
          Connexion
        </h1>
        <div className="p-6 flex justify-center mb-6">
          <p className="p-6 text-red-600">{error}</p>
        </div>
        <div className="flex justify-center mb-6">
          <button
            type="button"
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            onClick={handleConnectAnonymous}
          >
            Se connecter en tant qu'anonyme
          </button>
        </div>
        {customers.length === 0 ? (
          <p className="text-center text-gray-500">Aucun client.</p>
        ) : (
          <div className="flex flex-wrap gap-4 justify-center">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:w-[48%] md:w-[38%] lg:w-[28%] xl:w-[22%]"
              >
                <h2 className="text-lg font-medium text-gray-800">
                  {customer.firstName} {customer.lastname}
                </h2>
                <p className="text-sm text-gray-600">{customer.email}</p>
                {activeCustomerId !== customer.id && (
                <button
                  type="button"
                  onClick={() => handleViewInput(customer)}
                  className="mt-3 w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Se connecter
                </button> )}
                {activeCustomerId === customer.id && (
                  <div className="mt-3">
                    <label className="mb-1 block text-xs font-medium text-gray-600">
                      Entrez le mot de passe
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Votre mot de passe"
                    />
                    <div>

                      <button
                        type="button"
                        onClick={() => handleConnectCustomer(customer)}
                        className="mt-3 w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                      >
                        valider
                      </button>
                      <button
                        type="button"
                        onClick={handleClose}
                        className="mt-3 w-full rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                      >
                        fermer
                      </button>
                      
                    </div>
                  </div>                  
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
