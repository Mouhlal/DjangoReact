import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EleveList from './components/ElevesForm/EleveList';
import AddEleveForm from './components/ElevesForm/AddEleveForm';
import EditEleveForm from './components/ElevesForm/EditEleveForm';
import EleveDetails from './components/ElevesForm/EleveDetails';
import PresenceList from './components/PresencesForm/PresenceList';
import AddPresenceForm from './components/PresencesForm/AddPresenceForm';
import AlerteList from './components/AlertesForm/AlertesList';
import AllAlerts from './components/AlertesForm/AllAlerts';
import AllNotifications from './components/Notifications/AllNotifications';
import NotificationList from './components/Notifications/Notification';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Home from './layouts/Home';
import NotFound from './layouts/NotFound';
import Groupes from './components/ElevesForm/Groupes';
import ElevebyGroupe from './components/ElevesForm/ElevebyGroupe';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Loading from './layouts/Loading';

export default function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `${process.env.PUBLIC_URL}/assets/js/main.js`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérifier si un utilisateur est déjà connecté au chargement
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    setUser(user);
  };

  const handleRegister = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    setUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const hasRole = (requiredRole) => {
    if (!user) return false;
    if (user.role === 'admin') return true; // Les admins ont accès à tout
    return user.role === requiredRole;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Header user={user} onLogout={handleLogout} />
      
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register onRegister={handleRegister} />} />

        <Route path="/" element={<Home />} />

        {user ? (
          <>
            {/* Routes pour les admins et users normaux */}
            {(hasRole('admin') || hasRole('user')) && (
              <>
                <Route path="/groupes" element={<Groupes />} />
                <Route path="/groupes/:groupeId/eleves" element={<ElevebyGroupe />} />
                <Route path="/eleves" element={<EleveList />} />
                <Route path="/presences" element={<PresenceList />} />
                <Route path="/alertes" element={<AllAlerts />} />
                <Route path="/notifications" element={<AllNotifications />} />

              </>
            )}

            {/* Routes réservées aux admins */}
            {hasRole('admin') && (
              <>
                <Route path="/ajouter-eleve" element={<AddEleveForm />} />
                <Route path="/modifier-eleve/:id" element={<EditEleveForm />} />
                <Route path="/eleve/:id/ajouter-presence" element={<AddPresenceForm />} />
              </>
            )}

            {/* Routes pour les élèves */}
            {hasRole('eleve') && (
              <>
                <Route path="/eleve/:id" element={<EleveDetails />} />
                <Route path="/eleve/:id/presences" element={<PresenceList />} />
                <Route path="/eleve/:id/alertes" element={<AlerteList />} />
                <Route path="/eleve/:id/notifications" element={<NotificationList />} />
              </>
            )}
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}