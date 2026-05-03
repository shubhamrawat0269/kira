import { useAppDispatch } from "@/store/hooks";
import { CircleUserRound, Orbit, Plus, MoreHorizontal } from "lucide-react";
import { NavLink } from "react-router-dom";

import { setOpenProjectCreationModal } from "@/store/slices/projectSlice";

type SidebarProps = {
  isOpen: boolean;
};

type SidebarItemProps = {
  icon: any;
  label: string;
  link: string;
  isOpen: boolean;
};

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

const SideMenu = ({ isOpen }: SidebarProps) => {
  const dispatch = useAppDispatch();

  return (
    <aside
      className={`hidden sm:block bg-background border-r p-3 space-y-2 transition-all duration-300 ${
        isOpen ? "w-60" : "w-16"
      }`}
    >
      <SidebarItem
        icon={<CircleUserRound size={20} />}
        label="For You"
        link={"/dashboard"}
        isOpen={isOpen}
      />

      <div className="mt-2">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2 text-gray-500">
            <Orbit size={20} />
            {isOpen && <span className="text-sm font-medium">Spaces</span>}
          </div>

          {isOpen && (
            <div className="flex items-center gap-2">
              <Plus
                size={16}
                className="cursor-pointer hover:text-black"
                onClick={() => dispatch(setOpenProjectCreationModal(true))}
              />
              <MoreHorizontal
                size={16}
                className="cursor-pointer hover:text-black"
              />
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
    </aside>
  );
};

export default SideMenu;
