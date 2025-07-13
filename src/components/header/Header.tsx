// // Header.tsx

import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import logo from "../../assets/logo.jpg";
import Contacts from "@components/Contacts/Contacts";
import NavBar from "@components/NavBar/NavBar";
import { useAppSelector } from "@store/app/hook";

const MENU_ITEMS = [
  { name: "Главная", path: "/" },
  { name: "Каталог", path: "/catalog" },
  { name: "Акции", path: "/promo" },
  { name: "Избранное", path: "/favorites" },
  { name: "Оплата", path: "/payment" },
  { name: "Гарантии", path: "/warranty" },
  { name: "Контакты", path: "/contacts" },
  { name: "О нас", path: "/about" },
];

const Header = () => {
  const [hideText, setHideText] = useState(false);
  const favorietsLenth = useAppSelector(state => state.favoriets.favoriteIds.length)

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
              "text-base font-semibold transition-transform duration-300",
              hideText ? "scale-90 translate-y-1" : "scale-100"
            )}
          >
            Myata Flowers
          </h1>
          <p
            className={clsx(
              "text-[9px] text-color-icons transition-opacity duration-300 min-w-max",
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
            <h1 className="text-4xl font-bold text-color-text">МЯТА flowers</h1>
            <p className="text-xl text-color-icons mt-1">Качественно, быстро, с душой</p>
          </div>
          {/* Контакты */}
          <Contacts hideText={false} />
        </div>

      </header>
      
      {/* Меню десктоп */}
      <div className="hidden md:flex sticky top-0 z-40 bg-colorPrimary shadow-md  bg-colorPrimary/70 backdrop-blur-md">
  <nav className="mx-auto w-full max-w-7xl px-4">
    <ul className="flex justify-center gap-10 text-lg text-color-text font-medium py-4">
      {MENU_ITEMS.map((item) => (
        <li key={item.path}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              clsx(
                "relative pb-1 transition-colors duration-200 hover:text-color-icons",
                isActive && "text-color-icons font-semibold"
              )
            }
          >
            {({ isActive }) => (
              <>
                {item.name}
                {
                  item.name 
                  === 'Избранное' 
                  && !!favorietsLenth 
                  ? <div className="w-5 h-5 bg-red-500 absolute -right-6 top-0 rounded-full text-white text-sm text-center">
                      {favorietsLenth}
                    </div> 
                  : ''}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-color-text rounded-full"
                    aria-hidden="true"
                  />
                )}
              </>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
      </div>
    </>
  );
};

export default Header;

