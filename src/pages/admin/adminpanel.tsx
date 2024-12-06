import React, { useState } from "react";
import AdminLogin from "@/pages/admin/adminlogin";
import AdminHome from "@/pages/admin/adminhome";  

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div>
      {!isAuthenticated ? (
        <AdminLogin onLogin={handleLogin} />
      ) : (
        <AdminHome /> 
      )}
    </div>
  );
};

export default AdminPanel;
