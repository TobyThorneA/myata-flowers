import { NavLink } from "react-router-dom";

interface MobileItemProps {
  name: string;
  path: string;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuMobileItem = ({ name, path, setMenuOpen }: MobileItemProps) => {
  return (
    <NavLink
      to={path}
      className="border-b border-color-icons py-3 text-lg font-semibold transition-colors hover:text-color-action"
      onClick={() => setMenuOpen(false)}
    >
      {name}
    </NavLink>
  );
};

export default MenuMobileItem;
