import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Landing from "./Landing";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated and redirect to dashboard
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // Show landing page for non-authenticated users
  return <Landing />;
};

export default Index;
