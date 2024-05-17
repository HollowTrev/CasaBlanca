import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AuthRoute from "./components/navigation-components/AuthRoute";
import DashboardRoute from "./components/navigation-components/DashboardRoute";
import SplashScreen from "./components/SplashScreen";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";



function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cookies] = useCookies(["xyz"]);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const checkTokenValidity = () => {
      if (cookies.xyz) {
        try {
          const decodedToken = jwtDecode(cookies.xyz);
          const isTokenExpired = decodedToken.exp < Date.now() / 1000;

          setIsTokenValid(!isTokenExpired);
        } catch (error) {
          setIsTokenValid(false);
        }
      } else {
        setIsTokenValid(false);
      }
      setIsLoading(false);
    };

    const intervalId = setInterval(checkTokenValidity, 1200);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [cookies.xyz]);

  return (
  
    <div className="overflow-x-hidden">
      {isLoading ? (
        <SplashScreen />
      ) : (
        <BrowserRouter>
          {isTokenValid ? <DashboardRoute /> : <AuthRoute />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
