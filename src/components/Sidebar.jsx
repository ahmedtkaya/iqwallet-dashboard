import {
  LayoutGrid,
  BarChart3,
  FileText,
  Users,
  CalendarDays,
  Settings,
  LogOut,
  UserRound,
  CreditCardIcon,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const btnBase = 'flex items-center justify-center w-10 h-10 transition-colors';
const inactive = 'text-neutral-700 hover:bg-neutral-200/70';
const active = 'bg-[#ff6b00] text-white ring-1 ring-black/10';

export const Sidebar = () => {
  return (
    <div className="min-h-[82vh]">
      <div className="h-full w-14 rounded-full bg-neutral-100 border border-neutral-200 flex flex-col items-center justify-between py-3">
        <nav className="flex flex-col items-center gap-4">
          {/* Dashboard */}
          <NavLink
            to="/dashboard"
            aria-label="Dashboard"
            className={({ isActive }) =>
              `${btnBase} rounded-full grid place-items-center ${isActive ? active : inactive}`
            }
          >
            <LayoutGrid className="w-5 h-5" />
          </NavLink>

          {/* Card */}
          <NavLink
            to="/card"
            aria-label="Card"
            className={({ isActive }) => `${btnBase} rounded-xl ${isActive ? active : inactive}`}
          >
            <CreditCardIcon className="w-5 h-5" />
          </NavLink>

          {/* Diğerleri – route ekleyince çalışır */}
          <NavLink
            to="/users-table"
            className={({ isActive }) => `${btnBase} rounded-xl ${isActive ? active : inactive}`}
          >
            <BarChart3 className="w-5 h-5" />
          </NavLink>

          <NavLink
            to="/documents"
            className={({ isActive }) => `${btnBase} rounded-xl ${isActive ? active : inactive}`}
          >
            <FileText className="w-5 h-5" />
          </NavLink>

          <NavLink
            to="/users"
            className={({ isActive }) => `${btnBase} rounded-xl ${isActive ? active : inactive}`}
          >
            <Users className="w-5 h-5" />
          </NavLink>

          <NavLink
            to="/calendar"
            className={({ isActive }) => `${btnBase} rounded-xl ${isActive ? active : inactive}`}
          >
            <CalendarDays className="w-5 h-5" />
          </NavLink>
        </nav>

        <div>
          <NavLink
            to="/settings"
            className={({ isActive }) => `${btnBase} rounded-xl ${isActive ? active : inactive}`}
          >
            <Settings className="w-5 h-5" />
          </NavLink>

          {/* logout genelde route değil; şimdilik link gibi dursun */}
          <a href="/logout" className={`${btnBase} rounded-xl ${inactive}`}>
            <LogOut className="w-5 h-5" />
          </a>

          <div className="h-10" />

          <NavLink
            to="/profile"
            aria-label="Profile"
            className={({ isActive }) =>
              `${btnBase} rounded-full grid place-items-center ${isActive ? active : inactive}`
            }
          >
            <UserRound className="w-5 h-5" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};
