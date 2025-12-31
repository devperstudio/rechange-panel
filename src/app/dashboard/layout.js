import Sidebar from '@/components/dashboard/Sidebar';
import Navbar from '@/components/dashboard/Navbar';

import '@/styles/Sidebar.css';
import '@/styles/navbar.css';
import '@/styles/dashboard.css';

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-root">
      <Sidebar />

      <div className="dashboard-main">
        <Navbar />
        <main className="dashboard-page">
          {children}
        </main>
      </div>
    </div>
  );
}
