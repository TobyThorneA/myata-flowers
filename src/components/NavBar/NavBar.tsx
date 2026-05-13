// components/NavBar/NavBar.tsx
import CatalogIcon from "@assets/navMenuSvg/Catalog.svg?react";
import HeartIcon from "@assets/navMenuSvg/Heart.svg?react";
import DiscountIcon from "@assets/navMenuSvg/HeartDiscount.svg?react";
import HomeIcon from "@assets/navMenuSvg/Home.svg?react";
import MenuIcon from "@assets/navMenuSvg/Menu.svg?react";
import MenuMobile from "@components/menuMobile/MenuMobile";
import { useAppSelector } from "@store/app/hook";
import { useEffect, useRef, useState } from "react";

import NavItem from "./NavItem";

const NavBar = () => {
  const favoriteCount = useAppSelector((state) => state.favoriets.favoriteIds.length);
  const [hideText, setHideText] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Закрытие меню при клике вне и по кнопке
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
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
        className={`fixed bottom-0 left-0 z-50 flex h-[70px] w-full items-center justify-center border-t-[0.1px] border-color-icons shadow-md transition-all duration-300 md:hidden ${hideText ? "bg-colorPrimary/50 backdrop-blur-sm" : "bg-colorPrimary"} `}
      >
        <nav className="relative flex w-full max-w-lg justify-between gap-4 px-4 text-xs">
          <NavItem to="/" label="Главная" Icon={HomeIcon} />
          <NavItem to="/catalog" label="Каталог" Icon={CatalogIcon} />

          {/* Кнопка меню */}
          <button
            ref={buttonRef}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="relative flex flex-col items-center text-color-text"
            aria-expanded={menuOpen}
            aria-controls="custom-menu"
            type="button"
          >
            <MenuIcon
              className={`h-10 w-10 transition-all duration-300 ${menuOpen ? "brightness-125 drop-shadow-md" : ""}`}
            />
            <span
              className={`text-sm transition-all duration-300 ${menuOpen ? "-translate-y-[1px] font-bold" : ""}`}
            >
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
      {menuOpen && <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm" />}

      {/* Меню сверху */}
      <MenuMobile menuRef={menuRef} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
};

export default NavBar;
