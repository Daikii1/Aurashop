import { useUserContext } from "@/context/AuthContext";
import { LOGIN_ROUTE } from "@/router";
import AdminApi from "@/services/Api/Admin/AdminApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { Button } from "../../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

function AdminNavbar() {
    const navigate = useNavigate();
    const { setUser, authenticated, user, logout: contextLogout } = useUserContext();



    useEffect(() => {
        // Fetch user data only if authenticated and not already fetched
        if (authenticated && !user) {

            AdminApi.getAdmin()
                .then(({ data }) => {
                    setUser(data);
                })
                .catch(() => {
                    contextLogout();
                    navigate(LOGIN_ROUTE);
                });
        }
    }, [authenticated, user, setUser, contextLogout, navigate]);

    return (
        <nav className="flex items-center justify-between p-4 ">
            <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold">Dashboard</span>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center space-x-1">
                        <span>{user.name}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                        <User />
                        <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={contextLogout}>
                        <LogOut />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    );
}

export default AdminNavbar;
