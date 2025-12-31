'use client';

import { useState, useRef, useEffect } from 'react';


export default function Navbar() {
  const [showNotification, setShowNotification] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [unreadCount, setUnreadCount] = useState(5);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setShowNotification(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Notification sound
  const playSound = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = 800;
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  };

  const toggleNotification = (e) => {
    e.stopPropagation();
    setShowNotification(!showNotification);
    setShowProfile(false);
    playSound();
  };

  const toggleProfile = (e) => {
    e.stopPropagation();
    setShowProfile(!showProfile);
    setShowNotification(false);
  };

  const markAllRead = () => {
    setUnreadCount(0);
  };

  return (
    <header className="top-header">
      <div className="header-left">
        <h1 className="header-title">Dashboard</h1>
      </div>

      <div className="header-right">
        {/* Notification */}
        <div className="notification-wrapper" ref={notificationRef}>
          <div className="notification-icon" onClick={toggleNotification}>
            <i className="fas fa-bell"></i>
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </div>

          <div className={`notification-dropdown ${showNotification ? 'show' : ''}`}>
            <div className="notification-header">
              <h3>Notifications</h3>
              <span className="mark-all-read" onClick={markAllRead}>
                Mark all as read
              </span>
            </div>

            <div className="notification-list">
              {/* Example item */}
              <div className={`notification-item ${unreadCount ? 'unread' : ''}`}>
                <div className="notification-content">
                  <div className="notification-icon-small warning">
                    <i className="fas fa-exclamation-triangle"></i>
                  </div>
                  <div className="notification-details">
                    <div className="notification-title">Low Balance Alert</div>
                    <div className="notification-message">
                      Your GP balance is below 1000 TK
                    </div>
                    <div className="notification-time">2 minutes ago</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="notification-footer">
              <a href="#">View all notifications</a>
            </div>
          </div>
        </div>

        {/* Profile */}
        <div className="profile-wrapper" ref={profileRef}>
          <div className="profile-trigger" onClick={toggleProfile}>
            <img
              src="https://picsum.photos/seed/admin123/100/100.jpg"
              className="profile-avatar"
              alt="Admin"
            />
            <div className="profile-info">
              <div className="profile-name">Admin</div>
              <div className="profile-role">Administrator</div>
            </div>
            <i className="fas fa-chevron-down"></i>
          </div>

          <div className={`profile-dropdown ${showProfile ? 'show' : ''}`}>
            <div className="profile-dropdown-header">
              <img
                src="https://picsum.photos/seed/admin123/100/100.jpg"
                className="profile-dropdown-avatar"
                alt=""
              />
              <div className="profile-dropdown-name">Admin User</div>
              <div className="profile-dropdown-email">
                admin@dashboard.com
              </div>
            </div>

            <div className="profile-dropdown-menu">
              <a className="profile-dropdown-item">
                <i className="fas fa-user"></i> Profile
              </a>
              <a className="profile-dropdown-item">
                <i className="fas fa-cog"></i> Settings
              </a>
              <div className="profile-dropdown-divider"></div>
              <a className="profile-dropdown-item logout">

               
                <i className="fas fa-sign-out-alt"></i> Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
