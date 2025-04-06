import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Use Link for client-side routing
import {
  DashboardOutlined,
  BookOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons'; // Icons for a professional look

const Sidebar = () => {
  const location = useLocation(); // Get the current route location
  const [activeItem, setActiveItem] = useState(location.pathname); // Track the active item

  // Sidebar menu items
  const menuItems = [
    { path: '/dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
    { path: '/books', icon: <BookOutlined />, label: 'Books' },
    { path: '/profile', icon: <UserOutlined />, label: 'Profile' },
  ];

  return (
    <aside
      style={{
        width: '250px',
        backgroundColor: '#2c3e50',
        color: '#fff',
        height: '100vh', // Full height of the viewport
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
        overflowY: 'auto', // Enable scrolling if content exceeds viewport height
      }}
    >
      {/* Sidebar Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>Admin Panel</h3>
      </div>

      {/* Sidebar Menu */}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
        {menuItems.map((item) => (
          <li key={item.path} style={{ margin: '10px 0' }}>
            <Link
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 15px',
                textDecoration: 'none',
                color: '#fff',
                borderRadius: '5px',
                backgroundColor: activeItem === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                border: activeItem === item.path ? '2px solid #3498db' : '2px solid transparent',
                transition: 'background-color 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                if (activeItem !== item.path) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeItem !== item.path) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
              onClick={() => setActiveItem(item.path)}
            >
              <span style={{ fontSize: '1.2rem', marginRight: '10px' }}>{item.icon}</span>
              <span style={{ fontSize: '1rem' }}>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Sidebar Footer */}
      <div style={{ marginTop: 'auto' }}>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '10px 15px',
            backgroundColor: '#e74c3c',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#c0392b')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#e74c3c')}
        >
          <LogoutOutlined style={{ fontSize: '1.2rem', marginRight: '10px' }} />
          <span style={{ fontSize: '1rem' }}>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;