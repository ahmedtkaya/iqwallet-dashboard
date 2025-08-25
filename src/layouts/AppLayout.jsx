import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';

export const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#eae9e4]">
      <Topbar />
      <main className="p-6 flex ">
        <Sidebar />
        <Outlet />
      </main>
    </div>
  );
};
