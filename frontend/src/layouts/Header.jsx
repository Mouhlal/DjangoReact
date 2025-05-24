import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaHome, FaUsers, FaChalkboardTeacher, FaBell, FaExclamationTriangle } from 'react-icons/fa';

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header className="artistic-header-white">
      <div className="header-container">
        {/* Logo Absencia artistique à gauche */}
        <Link to="/" className="logo-artistic-minimal">
          <span className="logo-a">A</span>
          <span className="logo-rest">bsencia</span>
        </Link>

        {/* Navigation horizontale à droite */}
        <div className="right-section">
          <nav className="horizontal-nav">
            <ul className="nav-list-horizontal">
              <li>
                <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
                  <FaHome className="nav-icon" /> <span>Accueil</span>
                </NavLink>
              </li>
              
              {user && (
                <>
                  <li>
                    <NavLink to="/groupes" className={({ isActive }) => isActive ? 'active' : ''}>
                      <FaUsers className="nav-icon" /> <span>Groupes</span>
                    </NavLink>
                  </li>
                  
                  {(user.role === 'admin' || user.role === 'user') && (
                    <li>
                      <NavLink to="/eleves" className={({ isActive }) => isActive ? 'active' : ''}>
                        <FaChalkboardTeacher className="nav-icon" /> <span>Élèves</span>
                      </NavLink>
                    </li>
                  )}
                  
                  <li className="dropdown-horizontal">
                    <a href="#" className="dropdown-toggle">
                      <FaExclamationTriangle className="nav-icon" /> <span>Gestion</span>
                    </a>
                    <div className="dropdown-menu-horizontal">
                      <div className="dropdown-column">
                        {user.role === 'admin' && (
                          <>
                            <NavLink to="/admin/eleves" className="dropdown-item">
                              Gestion Élèves
                            </NavLink>
                            <a href="http://127.0.0.1:8000/admin/core/matiere/" target="_blank" rel="noopener noreferrer" className="dropdown-item">
                              Matières
                            </a>
                          </>
                        )}
                        <NavLink to="/alertes" className="dropdown-item">
                          <FaExclamationTriangle className="dropdown-icon" /> Alertes
                        </NavLink>
                      </div>
                      <div className="dropdown-column">
                        <NavLink to="/notifications" className="dropdown-item">
                          <FaBell className="dropdown-icon" /> Notifications
                        </NavLink>
                      </div>
                    </div>
                  </li>
                </>
              )}
            </ul>
          </nav>

          {/* Section utilisateur */}
          <div className="user-section-minimal">
            {user ? (
              <div className="user-dropdown-horizontal">
                <button className="user-btn-minimal">
                  <FaUser className="user-icon" /> <span>{user.username}</span>
                </button>
                <div className="user-dropdown-menu-horizontal">
                  <NavLink to="/profile" className="dropdown-item">
                    Mon Profil
                  </NavLink>
                  <button onClick={handleLogout} className="dropdown-item logout">
                    <FaSignOutAlt /> Déconnexion
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="login-btn-minimal">
                Connexion
              </Link>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .artistic-header-white {
          background: white;
          border-bottom: 1px solid #eaeaea;
          padding: 1rem 2rem;
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        
        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        /* Logo artistique minimal */
        .logo-artistic-minimal {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.8rem;
          font-weight: 700;
          text-decoration: none;
          display: flex;
          align-items: center;
          color: #4f46e5;
        }
        
        .logo-a {
          font-size: 2.2rem;
          font-weight: 800;
          margin-right: 2px;
          background: linear-gradient(90deg, #4f46e5, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .logo-rest {
          letter-spacing: 1px;
          color: #1e293b;
        }
        
        /* Section droite */
        .right-section {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        
        /* Navigation horizontale */
        .horizontal-nav ul {
          display: flex;
          gap: 1rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        .horizontal-nav a {
          color: #4b5563;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1rem;
          border-radius: 8px;
          transition: all 0.2s ease;
          font-weight: 500;
        }
        
        .horizontal-nav a:hover {
          background: #f3f4f6;
          color: #1e293b;
        }
        
        .horizontal-nav a.active {
          color: #4f46e5;
          background: #eef2ff;
          font-weight: 600;
        }
        
        .nav-icon {
          font-size: 1rem;
          color: currentColor;
        }
        
        /* Dropdown horizontal */
        .dropdown-horizontal {
          position: relative;
        }
        
        .dropdown-menu-horizontal {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          padding: 1rem;
          display: flex;
          gap: 2rem;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s ease;
          z-index: 100;
          border: 1px solid #e5e7eb;
        }
        
        .dropdown-horizontal:hover .dropdown-menu-horizontal {
          opacity: 1;
          visibility: visible;
          transform: translateY(5px);
        }
        
        .dropdown-column {
          display: flex;
          flex-direction: column;
          min-width: 180px;
        }
        
        .dropdown-item {
          padding: 0.5rem 1rem;
          color: #4b5563;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border-radius: 6px;
          transition: all 0.2s;
        }
        
        .dropdown-item:hover {
          background: #f3f4f6;
          color: #4f46e5;
        }
        
        .dropdown-item.logout {
          color: #ef4444;
        }
        
        .dropdown-item.logout:hover {
          background: #fee2e2;
        }
        
        .dropdown-icon {
          font-size: 0.9rem;
          color: currentColor;
        }
        
        /* Section utilisateur */
        .user-section-minimal {
          position: relative;
        }
        
        .user-btn-minimal {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1rem;
          background: #f3f4f6;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 500;
          color: #1e293b;
        }
        
        .user-btn-minimal:hover {
          background: #e5e7eb;
        }
        
        .user-icon {
          color: #4f46e5;
        }
        
        .user-dropdown-menu-horizontal {
          position: absolute;
          right: 0;
          top: 100%;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          padding: 0.5rem;
          min-width: 200px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s ease;
          z-index: 100;
          border: 1px solid #e5e7eb;
        }
        
        .user-dropdown-horizontal:hover .user-dropdown-menu-horizontal {
          opacity: 1;
          visibility: visible;
          transform: translateY(5px);
        }
        
        .login-btn-minimal {
          padding: 0.7rem 1.5rem;
          background: #4f46e5;
          color: white;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s;
        }
        
        .login-btn-minimal:hover {
          background: #4338ca;
        }
      `}</style>
    </header>
  );
};

export default Header;



/* 

import React from 'react';

const Header = () => {
  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container-fluid container-xl position-relative d-flex align-items-center">
        <a href="/" className="logo d-flex align-items-center me-auto">
          <h1 className="sitename">Absencia</h1>
        </a>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li><a href="#hero" className="active">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="/eleves">Eleves</a></li>
            <li className="dropdown">
              <a href="#"><span>Gestion</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
              <ul>
                <li><a href="/eleves">Eleves</a></li>
                <li className="dropdown">
                  <a href="http://127.0.0.1:8000/admin"><span>Admin</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                  <ul>
                    <li><a href="http://127.0.0.1:8000/admin/core/matiere/">Matieres</a></li>
                    <li><a href="http://127.0.0.1:8000/admin/core/etude/">Nv Scolaires</a></li>
                    <li><a href="http://127.0.0.1:8000/admin/core/groupe/">Groupes</a></li>
                    <li><a href="http://127.0.0.1:8000/admin/core/presence/">Presences</a></li>
                    <li><a href="http://127.0.0.1:8000/admin/core/rapportabsence/">Rapport</a></li>
                  </ul>
                </li>
                <li><a href="/presences">Absences</a></li>
                <li><a href="/notifications">Notifications </a></li>
                <li><a href="/alertes">Alertes</a></li>
              </ul>
            </li>
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

        <a className="btn-getstarted" href="http://localhost:3000/#about">Get Started</a>
      </div>
    </header>
  );
};

export default Header;
*/