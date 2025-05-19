
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center bg-white p-12 rounded-lg shadow-md">
        <h1 className="text-6xl font-bold text-alif-green mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        <Link to="/" className="px-6 py-3 bg-alif-green text-white rounded-md hover:bg-green-700 transition-all">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
