import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Navigate, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import "./pages/header/results"
import Network from "./pages/network/network";
import Menu from "./pages/menu/menu";
import Login from "./pages/login";
import PageNotFound from "./pages/pageNotFound/pageNotFound";
import Header from "./pages/header/header";
import Profile from "./pages/profile/profile";
import Register from "./pages/register/Register";
import eventbus from './pages/eventbus/eventbus'
import SearchResults from "./pages/header/results";

function App() {

    const [loggedIn, setLoggedIn] = useState(false)
    return (
        <div className="App">
            <Header/>

            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" Component={Login} />
                <Route path="/register" Component={Register}/>
                <Route path="/profil/:id" Component={Profile} />
                <Route path="/network" Component={Network} />
                <Route path="/:path" Component={PageNotFound} />
            </Routes>
            {/* <Menu /> */}
        </div>
    );
}

export default App;
