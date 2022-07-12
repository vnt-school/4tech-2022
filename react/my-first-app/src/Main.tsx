import { Link, Outlet } from "react-router-dom";

function Main() {
    return (
        <div className="main-page">
            <div>
                <Link to="/">Home</Link>
                <Link to="/products">Produtos</Link>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
}

export default Main;