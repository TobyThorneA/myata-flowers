import { useAppSelector } from "@store/app/hook";
import clsx from "clsx"
import { NavLink } from "react-router-dom"

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

function DesctopMenu() {
    const favorietsLenth = useAppSelector(state => state.favoriets.favoriteIds.length)
    const token = useAppSelector(state => state.auth.token);

    const menuItems = token
    ? [...BASE_MENU_ITEMS, { name: "Админка", path: "/admin/dashboard" }, {name: "Спец.предл", path: "/specialOffer"}]
    : BASE_MENU_ITEMS;

  return (
    <div className="hidden md:flex font-sansSerif sticky top-0 z-40 bg-colorPrimary shadow-md  bg-colorPrimary/70 backdrop-blur-md">
      <nav className="mx-auto w-full max-w-7xl px-4">
        <ul className="flex justify-center gap-10 text-lg text-color-text font-medium py-4">
          {menuItems.map((item) => (
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
  )
}

export default DesctopMenu