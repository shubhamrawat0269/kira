import { CircleUserRound, Orbit } from "lucide-react";
import { NavLink } from "react-router-dom";

type SidebarProps = {
  isOpen: boolean;
};

type SidebarItemProps = {
  icon: any;
  label: string;
  link: string;
  isOpen: boolean;
};

function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside
      className={`bg-background border-r h-full p-3 space-y-2 transition-all duration-300 ${
        isOpen ? "w-60" : "w-16"
      }`}
    >
      <SidebarItem
        icon={<CircleUserRound size={20} />}
        label="For You"
        link={"/dashboard"}
        isOpen={isOpen}
      />
      <SidebarItem
        icon={<Orbit size={20} />}
        label="Spaces"
        link={"/dashboard"}
        isOpen={isOpen}
      />
    </aside>
  );
}

function SidebarItem({ icon, label, isOpen, link }: SidebarItemProps) {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        isActive ? "text-gray-800 font-bold" : "text-gray-500"
      }
    >
      <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted cursor-pointer">
        <div className="">{icon}</div>
        {isOpen && <span className="text-sm">{label}</span>}
      </div>
    </NavLink>
  );
}

export default Sidebar;
