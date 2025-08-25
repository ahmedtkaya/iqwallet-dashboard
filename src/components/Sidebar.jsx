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
export const Sidebar = () => {
  return (
    <div className="h-[85vh]">
      <div
        className="h-full w-14 rounded-full bg-neutral-100 border border-neutral-200
                      flex flex-col items-center justify-between py-3"
      >
        <nav className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-neutral-900 text-white grid place-items-center">
            <LayoutGrid className="w-5 h-5" />
          </div>
          <button className="flex items-center justify-center w-10 h-10 rounded-xl text-neutral-700 hover:bg-neutral-200/70">
            <CreditCardIcon className="w-5 h-5" />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-xl text-neutral-700 hover:bg-neutral-200/70">
            <BarChart3 className="w-5 h-5" />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-xl text-neutral-700 hover:bg-neutral-200/70">
            <FileText className="w-5 h-5" />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-xl text-neutral-700 hover:bg-neutral-200/70">
            <Users className="w-5 h-5" />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-xl text-neutral-700 hover:bg-neutral-200/70">
            <CalendarDays className="w-5 h-5" />
          </button>
        </nav>

        <div>
          <button className="flex items-center justify-center w-10 h-10 rounded-xl text-neutral-700 hover:bg-neutral-200/70">
            <Settings className="w-5 h-5" />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-xl text-neutral-700 hover:bg-neutral-200/70">
            <LogOut className="w-5 h-5" />
          </button>
          <div className="h-10" />

          <div className="w-10 h-10 rounded-full bg-neutral-900 text-white grid place-items-center">
            <UserRound className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};
