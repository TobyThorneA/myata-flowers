// components/NavBar/NavItem.tsx
import { NavLink } from "react-router-dom";
import type { ComponentType } from "react";

interface NavItemProps {
  to: string;
  label: string;
  Icon: ComponentType<React.SVGProps<SVGSVGElement>>;
  badgeLength?: number | string;
}

const NavItem = ({ to, label, Icon, badgeLength }: NavItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `relative flex flex-col items-center transition-all duration-300 ${
        isActive ? 'text-color-text scale-125 translate-y-[-1px]' : 'text-color-text'
      }`
    }
  >
    {({ isActive }) => (
      <>
        <Icon
          className={`w-10 h-10 transition-all duration-300 ${
            isActive ? 'drop-shadow-md brightness-125' : ''
          }`}
        />
        {badgeLength && (
          <div className="
            absolute -top-1 right-4 bg-red-500 text-white text-xs rounded-full
            w-4 h-4 flex items-center justify-center shadow
          ">
            {badgeLength}
          </div>
        )}
        <span
          className={`text-sm transition-all duration-300 ${
            isActive ? 'font-bold -translate-y-[1px]' : ''
          }`}
        >
          {label}
        </span>
      </>
    )}
  </NavLink>
);

export default NavItem;
