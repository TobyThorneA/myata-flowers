// // Header.tsx

import Contacts from "@components/Contacts/Contacts";
import NavBar from "@components/NavBar/NavBar";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";
import DesctopMenu from "./DesctopMenu";

const Header = () => {
  const [hideText, setHideText] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHideText(window.scrollY !== 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ===== 📱 Мобильный хедер ===== */}
      <header
        className={clsx(
          "fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-colorPrimary px-2 py-1 shadow-md transition-all duration-300 md:hidden",
          hideText && "bg-colorPrimary/50 backdrop-blur-md",
        )}
      >
        <Link to={"/"}>
          <img src={logo} className="h-10 w-10 rounded-full" alt="Логотип" />
        </Link>

        <div className="flex flex-col items-center justify-center">
          <h1
            className={clsx(
              "text-base font-medium transition-transform duration-300",
              hideText ? "translate-y-1 scale-90" : "scale-100",
            )}
          >
            Мята цветочный
          </h1>
          <p
            className={clsx(
              "min-w-max font-sansSerif text-[10px] font-semibold text-color-icons transition-opacity duration-300",
              hideText ? "pointer-events-none h-0 opacity-0" : "opacity-100",
            )}
          >
            Качественно, быстро, с душой
          </p>
        </div>

        <Contacts hideText={hideText} />
      </header>

      {/* нижняя мобильная навигация */}
      <NavBar />

      {/* ===== 💻 Десктопный хедер ===== */}
      <header className="relative z-50 hidden w-full bg-colorPrimary px-14 pb-6 pt-0 shadow-sm md:block">
        {/* Лого + слоган */}
        <div className="flex w-full items-center justify-between gap-6">
          <Link to={"/"} className="md:mt-5">
            <img
              src={logo}
              className="h-24 w-24 rounded-full object-cover md:h-32 md:w-32"
              alt="Логотип"
            />
          </Link>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-medium text-color-text">МЯТА цветочная студия</h1>
            <p className="mt-3 font-sansSerif text-xl text-color-icons">
              Качественно, быстро, с душой
            </p>
          </div>
          {/* Контакты */}
          <Contacts hideText={false} />
        </div>
      </header>

      {/* Меню десктоп */}
      <DesctopMenu />
    </>
  );
};

export default Header;
