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
                <li><a href="#">Eleves</a></li>
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

        <a className="btn-getstarted" href="#about">Get Started</a>
      </div>
    </header>
  );
};

export default Header;
