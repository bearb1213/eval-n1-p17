export default function OrderStateBadge({ stateName }) {
    
  const getStateStyle = (name) => {
    if (name === "Paiement à distance accepté") {
      return "bg-green-100 text-green-800 border-green-200";
    }
    if (name === "Annulé") {
      return "bg-red-100 text-red-800 border-red-200";
    } 
    if (name === "Livré") {
      return "bg-blue-100 text-blue-800 border-blue-200";
    }
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStateStyle(
        stateName
      )}`}
    >
      {stateName}
    </span>
  );
}
