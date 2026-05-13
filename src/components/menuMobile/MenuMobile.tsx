import MenuMobileItem from "./MenuMobileItem";

const MENU_LIST = [
  { name: "Каталог", path: "/catalog" },
  { name: "Способы доставки", path: "/delivery" },
  { name: "Оплата", path: "/payment" },
  { name: "Гарантии", path: "/warranty" },
  { name: "Контакты", path: "/contacts" },
  { name: "О нас", path: "/about" },
];

interface MenuMibileProps {
  menuRef: React.RefObject<HTMLDivElement | null>;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuMobile = ({ menuRef, menuOpen, setMenuOpen }: MenuMibileProps) => {
  return (
    <div
      ref={menuRef}
      className={`fixed left-0 top-0 z-50 max-h-[70vh] w-full transform overflow-y-auto rounded-b-xl bg-colorPrimary px-6 pb-10 pt-8 shadow-xl transition-transform duration-300 ${menuOpen ? "translate-y-0" : "-translate-y-full"} flex flex-col text-color-text md:hidden`}
      aria-hidden={!menuOpen}
    >
      {/* Крестик */}
      <button
        onClick={() => setMenuOpen(false)}
        aria-label="Закрыть меню"
        className="mb-4 self-end text-color-text transition-colors hover:text-color-action"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      {/* {меню выползашка} */}
      {MENU_LIST.map((it) => (
        <MenuMobileItem key={it.path} name={it.name} path={it.path} setMenuOpen={setMenuOpen} />
      ))}
    </div>
  );
};

export default MenuMobile;
