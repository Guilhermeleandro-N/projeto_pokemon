import { useNavigate } from "react-router-dom";
import "./LogoutButton.css"
function LogoutButton() {

    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("treinador");
        navigate("/login");
    }

    return (
        <button className="logout-btn"  onClick={handleLogout}>
            Logout
        </button>
    );
}

export default LogoutButton;