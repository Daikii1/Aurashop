import { useUserContext } from "@/context/AuthContext";
import { LOGIN_ROUTE } from "@/router";
import AdminApi from "@/services/Api/Admin/AdminApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";


export default function AdminDashboard() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true); // Set loading to true initially
    const { setUser, authenticated, setAuthenticated, logout: contextLogout } = useUserContext();

    useEffect(() => {
        if (authenticated === true) {
            AdminApi.getAdmin().then(({ data }) => {
                setUser(data);
                setAuthenticated(true);
                setIsLoading(false); // Set to false when data is fetched
            }).catch(() => {
                contextLogout();
                navigate(LOGIN_ROUTE);
            });
        } else {
            navigate(LOGIN_ROUTE);
        }
    }, [authenticated]);

    if (isLoading) return null;

    return (
        <>
            <AdminLayout />
        </>
    );
}
