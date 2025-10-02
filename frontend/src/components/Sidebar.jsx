import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  User,
  LogOut,
  Notebook,
} from "lucide-react";
import { useUserStore } from "../store/useUserStore";

const navItems = [
  { label: "Notes", path: "/notes", icon: LayoutDashboard },
  { label: "Create Note", path: "/create", icon: PlusCircle },
  { label: "Profile", path: "/profile", icon: User },
  { label: "Logout", path: "/logout", icon: LogOut },
];

const Sidebar = () => {
  const { logout } = useUserStore();
  return (
    <aside className="bg-primary text-white h-screen w-12 md:w-64 py-3 px-2 md:p-4 flex flex-col fixed top-0 left-0 overflow-y-auto transition-all duration-300">
      <div className="mb-6 flex items-center justify-center md:justify-start text-xl font-bold gap-2">
        <Notebook className="size-6 md:size-8" />
        <p className="hidden md:block">Quick Notes</p>
      </div>
      <nav className="flex flex-col gap-3 items-center md:items-start">
        {navItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            onClick={label === "Logout" ? () => logout() : undefined}
            className={({ isActive }) =>
              `flex items-center justify-center md:justify-start gap-2 px-2 py-2 rounded-lg w-full ${
                isActive
                  ? "bg-secondary text-secondary-foreground"
                  : "hover:bg-muted-foreground"
              }`
            }
          >
            <Icon className="size-5" />
            <span className="hidden md:inline">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
