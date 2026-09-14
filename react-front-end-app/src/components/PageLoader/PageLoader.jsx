import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../common.css";

function PageLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!loading) return null;

  return (
    <div className="page-loader">
      <div className="page-loader-bar" />
    </div>
  );
}

export default PageLoader;
