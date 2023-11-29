import React from "react";
import "./header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="left-side">
        <div className="menu">Recco</div>
        <div className="menu">Menu2</div>
        <div className="menu">Menu3</div>
        <div className="menu">Menu4</div>
      </div>
      <div className="right-side">
        <div className="cart-icon">🛒</div>
        <div className="user-name">John Doe</div>
      </div>
    </header>
  );
};

export default Header;
