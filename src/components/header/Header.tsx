// // Header.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import logo from "../../assets/logo.jpg";
import Contacts from "@components/Contacts/Contacts";
import NavBar from "@components/NavBar/NavBar";
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
          "fixed top-0 left-0 w-full z-50 px-2 py-1 shadow-md flex justify-between items-center bg-colorPrimary transition-all duration-300 md:hidden",
          hideText && "bg-colorPrimary/50 backdrop-blur-md"
        )}
      >
        <Link to={"/"}>
          <img src={logo} className="w-10 h-10 rounded-full" alt="Логотип" />
        </Link>

        <div className="flex flex-col items-center justify-center" >
          <h1
            className={clsx(
              "text-base font-medium transition-transform duration-300",
              hideText ? "scale-90 translate-y-1" : "scale-100"
            )}
          >
            Мята Flowers
          </h1>
          <p
            className={clsx(
              "font-sansSerif font-semibold text-[10px] text-color-icons transition-opacity duration-300 min-w-max",
              hideText ? "opacity-0 h-0 pointer-events-none" : "opacity-100"
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
      <header className="hidden relative md:block w-full px-14 pt-0 pb-6 bg-colorPrimary shadow-sm z-50">
        {/* Лого + слоган */}
        <div className="flex w-full items-center gap-6 justify-between">
          <Link to={"/"} className="md:mt-5">
            <img
              src={logo}
              className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full"
              alt="Логотип"
            />
          </Link>
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-medium text-4xl  text-color-text">МЯТА Flowers</h1>
            <p className="font-sansSerif mt-3 text-xl text-color-icons">Качественно, быстро, с душой</p>
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

