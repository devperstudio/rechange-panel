'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/Sidebar.css';

export default function Sidebar() {
  const sidebarRef = useRef(null);
  const toggleRef = useRef(null);
  const router = useRouter();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);


  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem('admin_login');
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('email');

    document.cookie =
      'admin_login=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

    router.push('/login');
  };

  /* =============================
     MOBILE TOGGLE
  ============================= */
  const toggleSidebar = () => {
    setIsMobileOpen(prev => !prev);
  };


  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        window.innerWidth <= 768 &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        !toggleRef.current.contains(e.target)
      ) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () =>
      document.removeEventListener('mousedown', handleOutsideClick);
  }, []);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () =>
      window.removeEventListener('resize', handleResize);
  }, []);


  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
     
      <button
        ref={toggleRef}
        className="menu-toggle"
        onClick={toggleSidebar}
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* sidebar */}
      <aside
        ref={sidebarRef}
        className={`sidebar ${isMobileOpen ? 'active' : ''}`}
      >
        <div className="sidebar-header">Admin Panel</div>

        <nav className="sidebar-nav">
          <ul>
         
            <li>
              <a href="#" className="nav-item active">
                <i className="fas fa-home"></i> Dashboard
              </a>
            </li>

           
            <li className={`has-submenu ${openIndex === 0 ? 'open active' : ''}`}>
              <a
                href="#"
                className="nav-item has-dropdown"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown(0);
                }}
              >
                <i className="fas fa-users"></i> Manage Users
                <span className="dropdown-arrow">{openIndex === 0 ? '⌃' : '⌵'}</span>
              </a>
              <ul className="submenu">
                <li><a href="/users">All Users</a></li>
                <li><a href="/users/active">Active Users</a></li>
                <li><a href="/users/inactive">Inactive Users</a></li>
              </ul>
            </li>

          
            <li className={`has-submenu ${openIndex === 1 ? 'open active' : ''}`}>
              <a
                href="#"
                className="nav-item has-dropdown"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown(1);
                }}
              >
                <i className="fas fa-chart-line"></i> Analytics
                <span className="dropdown-arrow">{openIndex === 1 ? '⌃' : '⌵'}</span>
              </a>
              <ul className="submenu">
                <li><a href="/analytics/reports">Reports</a></li>
                <li><a href="/analytics/statistics">Statistics</a></li>
                <li><a href="/analytics/charts">Charts</a></li>
              </ul>
            </li>

            
            <li className={`has-submenu ${openIndex === 2 ? 'open active' : ''}`}>
              <a
                href="#"
                className="nav-item has-dropdown"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown(2);
                }}
              >
                <i className="fas fa-shopping-cart"></i> Orders
                <span className="dropdown-arrow">{openIndex === 2 ? '⌃' : '⌵'}</span>
              </a>
              <ul className="submenu">
                <li><a href="/orders">All Orders</a></li>
                <li><a href="/orders/pending">Pending Orders</a></li>
                <li><a href="/orders/completed">Completed Orders</a></li>
              </ul>
            </li>

          
            <li className={`has-submenu ${openIndex === 3 ? 'open active' : ''}`}>
              <a
                href="#"
                className="nav-item has-dropdown"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown(3);
                }}
              >
                <i className="fas fa-envelope"></i> Messages
                <span className="dropdown-arrow">{openIndex === 3 ? '⌃' : '⌵'}</span>
              </a>
              <ul className="submenu">
                <li><a href="/messages/inbox">Inbox</a></li>
                <li><a href="/messages/sent">Sent</a></li>
                <li><a href="/messages/drafts">Drafts</a></li>
              </ul>
            </li>

        
            <li className={`has-submenu ${openIndex === 4 ? 'open active' : ''}`}>
              <a
                href="#"
                className="nav-item has-dropdown"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown(4);
                }}
              >
                <i className="fas fa-cog"></i> Settings
                <span className="dropdown-arrow">{openIndex === 4 ? '⌃' : '⌵'}</span>
              </a>
              <ul className="submenu">
                <li><a href="/settings/general">General</a></li>
                <li><a href="/settings/security">Security</a></li>
                <li><a href="/settings/notifications">Notifications</a></li>
              </ul>
            </li>

            <li>
              <a
                href="#"
                className="nav-item"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt"></i> Logout
              </a>
            </li>

          </ul>
        </nav>
      </aside>
    </>
  );
}
