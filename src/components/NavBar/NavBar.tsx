// components/NavBar/NavBar.tsx
import { useEffect, useState, useRef } from "react";
import NavItem from "./NavItem";

import HomeIcon from "@assets/navMenuSvg/Home.svg?react";
import CatalogIcon from "@assets/navMenuSvg/Catalog.svg?react";
import DiscountIcon from "@assets/navMenuSvg/HeartDiscount.svg?react";
import HeartIcon from "@assets/navMenuSvg/Heart.svg?react";
import MenuIcon from "@assets/navMenuSvg/Menu.svg?react";
import { useAppSelector } from "@store/app/hook";
import MenuMobile from "@components/menuMobile/MenuMobile";

const NavBar = () => {
  const favoriteCount = useAppSelector(state => state.favoriets.favoriteIds.length);
  const [hideText, setHideText] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Закрытие меню при клике вне и по кнопке
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const menuNode = menuRef.current;
      const buttonNode = buttonRef.current;

      if (
        menuNode &&
        !menuNode.contains(event.target as Node) &&
        buttonNode &&
        !buttonNode.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setHideText(window.scrollY !== 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`
          fixed bottom-0 left-0 w-full h-[70px] z-50 md:hidden
          flex justify-center items-center
          transition-all duration-300 shadow-md
          ${hideText ? "bg-colorPrimary/50 backdrop-blur-sm" : "bg-colorPrimary"}
        `}
      >
        <nav className="flex justify-between gap-4 px-4 text-xs relative w-full max-w-lg">
          <NavItem to="/" label="Главная" Icon={HomeIcon} />
          <NavItem to="/catalog" label="Каталог" Icon={CatalogIcon} />

          {/* Кнопка меню */}
          <button
            ref={buttonRef}
            onClick={() => setMenuOpen(prev => !prev)}
            className="relative flex flex-col items-center text-color-text"
            aria-expanded={menuOpen}
            aria-controls="custom-menu"
            type="button"
          >
            <MenuIcon className={`w-10 h-10 transition-all duration-300 ${menuOpen ? 'drop-shadow-md brightness-125' : ''}`} />
            <span className={`text-sm transition-all duration-300 ${menuOpen ? 'font-bold -translate-y-[1px]' : ''}`}>
              Меню
            </span>
          </button>

          <NavItem to="/promo" label="Акции" Icon={DiscountIcon} />
          <NavItem 
            to="/favorites" 
            label="Избранное" 
            Icon={HeartIcon} 
            badgeLength={favoriteCount > 0 ? favoriteCount : undefined}
          />
        </nav>
      </div>

      {/* Затемняющая подложка */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" />
      )}

      {/* Меню сверху */}
      <MenuMobile 
        menuRef={menuRef}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
    </>
  );
};

export default NavBar;

