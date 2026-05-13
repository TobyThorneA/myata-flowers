// components/NavBar/NavItem.tsx
import type { ComponentType } from "react";
import { NavLink } from "react-router-dom";

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
        isActive ? "translate-y-[-1px] scale-125 text-color-text" : "text-color-text"
      }`
    }
  >
    {({ isActive }) => (
      <>
        <Icon
          className={`h-10 w-10 transition-all duration-300 ${
            isActive ? "brightness-125 drop-shadow-md" : ""
          }`}
        />
        {badgeLength && (
          <div className="absolute -top-1 right-4 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white shadow">
            {badgeLength}
          </div>
        )}
        <span
          className={`transition-all duration-300 ${
            isActive ? "-translate-y-[1px] font-bold" : ""
          }`}
        >
          {label}
        </span>
      </>
    )}
  </NavLink>
);

export default NavItem;
