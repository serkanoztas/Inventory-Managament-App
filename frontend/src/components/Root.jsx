import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Root = () => {

    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            //check role
            if (user.role === 'admin') {
                navigate('/admin-dashboard');
            }
            else if (user.role === 'customer') {
                navigate('/customer-dashboard');
            }
            else {
                navigate('/login');
            }
        }
        else {
            navigate('/login');
        }
    }, [user, navigate]);
    return null;
}

export default Root;    