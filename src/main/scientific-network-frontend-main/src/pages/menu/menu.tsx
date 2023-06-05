
import { Link } from "react-router-dom"

export default function Menu() {
    return (
        <div style={{display: "flex", gap: "1rem"}}>


            <Link to="/network">Network</Link>
            <Link to="/profile">profile</Link>
            <Link to="/login">login</Link>
        </div>
    );
}
