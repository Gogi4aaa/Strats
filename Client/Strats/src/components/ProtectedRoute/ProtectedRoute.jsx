import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute(){
    const token = localStorage.getItem("token");
    if(token != null){
        return <Navigate to="/login" replace />
    }
    return <Outlet />
};