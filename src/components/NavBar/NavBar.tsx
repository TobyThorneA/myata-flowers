// components/NavBar/NavBar.tsx
import "./NavBar.scss";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const close = () => setOpen(false);

  return (
    <>
      <header className="nav">
        <div className="nav__container">
          <div className="nav__logo">Мята Цветочная студия</div>

          <nav className={`nav__menu ${open ? "open" : ""}`}>
            <NavLink to="/" onClick={close} className={({ isActive }) => (isActive ? "active" : "")}>
              Главная
            </NavLink>
            <NavLink to="/catalog" onClick={close} className={({ isActive }) => (isActive ? "active" : "")}>
              Каталог
            </NavLink>
            <NavLink to="/promo" onClick={close} className={({ isActive }) => (isActive ? "active" : "")}>
              Промо
            </NavLink>
          </nav>

          <div className={`nav__burger ${open ? "open" : ""}`} onClick={toggle}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      {/* затемнение под мобильным меню */}
      <div className={`nav__overlay ${open ? "open" : ""}`} onClick={close}></div>
      <div className="nav__spacer" />
    </>
  );
};

export default NavBar;


