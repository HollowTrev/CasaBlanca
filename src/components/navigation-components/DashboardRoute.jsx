import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardScreen from "../../screens/dashboard/DashboardScreen";
import SideBar from "../dashboard-components/SideBar";
import PayrollScreen from "../../screens/dashboard/PayrollScreen";
import PointOfSaleScreen from "../../screens/dashboard/PointOfSaleScreen";
import { getUserDatafromToken } from "../../utils/Auth";
import EmployeeScreen from "../../screens/dashboard/EmployeeScreen";

const DashboardRoute = () => {
  const accessRole = getUserDatafromToken().decodedToken.user.user_access;

  return (
    <div className="flex  bg-ImageBg bg-no-repeat bg-cover min-h-[100vh]">
      <Routes>
        {accessRole === "admin" ? (
          <>
            <Route
              path="/"
              element={
                <>
                  <SideBar />
                  <DashboardScreen />
                </>
              }
            />
            <Route
              path="/payroll"
              element={
                <>
                  <SideBar />
                  <PayrollScreen />
                </>
              }
            />
            <Route
              path="/point-of-sale"
              element={
                <>
                  <SideBar />
                  <PointOfSaleScreen />
                </>
              }
            />
            <Route
              path="*"
              element={
                <>
                  <SideBar />
                  <DashboardScreen />
                </>
              }
            />
          </>
        ) : (
          accessRole === "employee" && (
            <>
              <Route path="/" element={<EmployeeScreen />} />

              <Route path="*" element={<EmployeeScreen />} />
            </>
          )
        )}
      </Routes>
    </div>
  );
};

export default DashboardRoute;
