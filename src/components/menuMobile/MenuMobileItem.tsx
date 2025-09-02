import { NavLink } from "react-router-dom"

interface MobileItemProps {
  name: string;
  path: string;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuMobileItem = ({name, path, setMenuOpen}: MobileItemProps) => {
  return (
    <NavLink
      to={path}
      className="py-3 border-b border-color-icons hover:text-color-action transition-colors text-lg font-semibold"
      onClick={() => setMenuOpen(false)}
    >
      {name}
    </NavLink>
  )
}

export default MenuMobileItem