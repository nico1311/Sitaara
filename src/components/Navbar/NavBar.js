import {React, useState} from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import CartWidget from "./CartWidget/CartWidget";
import "./NavBar.css";
import { PiHeartBold, PiHeartFill } from "react-icons/pi";

const Favs = () => {
  const location = useLocation();

  const isActive = location.pathname === "/favorites";

  return (
    <NavLink className={`Favs ${isActive ? 'active' : ''}`} activeClassName="active" to={'/favorites'}>
      {isActive ? <PiHeartFill /> : <PiHeartBold />}
    </NavLink>
  );
};

const NavBar = ({onSearch}) => {

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  }
  return (
    <nav>
      <div className="nav-container">
        <Link to="/">
          <img
            className="category"
            alt="logo"
            src="https://d2r9epyceweg5n.cloudfront.net/stores/002/691/752/themes/common/logo-327109795-1688737716-e3f20fa19792dbdf08d09bbc5620955a1688737716-480-0.png?0"
          ></img>
        </Link>
        <NavLink className="category" activeclassName="active" to={'/category/lecturas'}>
          Lecturas
        </NavLink>
        <NavLink className="category" activeclassName="active" to={'/category/cursos'}>
          Cursos
        </NavLink>
        <NavLink className="category" activeclassName="active" to={'/category/conectar'}>
          Conectar
        </NavLink>
        <Favs />
        <input
        className="search"
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <CartWidget className="Cart" activeclassName="active" />
      </div>
    </nav>
  );
};

export default NavBar;
