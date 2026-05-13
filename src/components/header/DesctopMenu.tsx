import { useAppSelector } from "@store/app/hook";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

const BASE_MENU_ITEMS = [
  { name: "Главная", path: "/" },
  { name: "Каталог", path: "/catalog" },
  { name: "Акции", path: "/promo" },
  { name: "Избранное", path: "/favorites" },
  { name: "Оплата", path: "/payment" },
  { name: "Гарантии", path: "/warranty" },
  { name: "Контакты", path: "/contacts" },
  { name: "О нас", path: "/about" },
];

const DesctopMenu = () => {
  const favorietsLenth = useAppSelector((state) => state.favoriets.favoriteIds.length);
  const token = useAppSelector((state) => state.auth.token);

  const menuItems = token
    ? [
        ...BASE_MENU_ITEMS,
        { name: "Админка", path: "/admin/dashboard" },
        { name: "Спец.предл", path: "/specialOffer" },
      ]
    : BASE_MENU_ITEMS;

  return (
    <div className="sticky top-0 z-40 hidden bg-colorPrimary bg-colorPrimary/70 font-sansSerif shadow-md backdrop-blur-md md:flex">
      <nav className="mx-auto w-full max-w-7xl px-4">
        <ul className="flex justify-center gap-10 py-4 text-lg font-medium text-color-text">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  clsx(
                    "relative pb-1 transition-colors duration-200 hover:text-color-icons",
                    isActive && "font-semibold text-color-icons",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    {item.name === "Избранное" && !!favorietsLenth ? (
                      <div className="absolute -right-6 top-0 h-5 w-5 rounded-full bg-red-500 text-center text-sm text-white">
                        {favorietsLenth}
                      </div>
                    ) : (
                      ""
                    )}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-color-text"
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
  );
};

export default DesctopMenu;
