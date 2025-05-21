import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaBell, FaTrash, FaRegBellSlash } from 'react-icons/fa';

export default function NotificationList() {
  const { id: eleveId } = useParams();
  const [notifs, setNotifs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const url = 'http://localhost:8000/api/notifications/';

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${url}?eleve=${eleveId}`);
        setNotifs(response.data);
      } catch (err) {
        console.error('Erreur récupération notifications :', err);
        Swal.fire({
          title: 'Erreur',
          text: 'Impossible de charger les notifications',
          icon: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, [eleveId]);

  const handleDelete = async (notifId) => {
    const result = await Swal.fire({
      title: 'Supprimer cette notification ?',
      text: 'Cette action est irréversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      backdrop: `
        rgba(0,0,0,0.4)
        url("/images/notification-delete.gif")
        left top
        no-repeat
      `
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${url}${notifId}/`);
        setNotifs(prev => prev.filter(n => n.id !== notifId));
        Swal.fire({
          title: 'Supprimée !',
          text: 'La notification a été supprimée avec succès.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      } catch (err) {
        console.error('Erreur suppression notification :', err);
        Swal.fire({
          title: 'Erreur',
          text: 'Impossible de supprimer la notification.',
          icon: 'error'
        });
      }
    }
  };

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h1><FaBell className="header-icon" /> Notifications</h1>
        <p>Historique des notifications pour cet élève</p>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Chargement des notifications...</p>
        </div>
      ) : notifs.length === 0 ? (
        <div className="empty-state">
          <FaRegBellSlash className="empty-icon" />
          <h3>Aucune notification</h3>
          <p>Cet élève n'a reçu aucune notification.</p>
        </div>
      ) : (
        <div className="notifications-list">
          {notifs.map(n => (
            <div key={n.id} className="notification-card">
              <div className="notification-content">
                <div className="notification-date">
                  {new Date(n.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                <div className="notification-message">
                  {n.message}
                </div>
              </div>
              <button
                onClick={() => handleDelete(n.id)}
                className="delete-btn"
              >
                <FaTrash /> Supprimer
              </button>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .notifications-container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 0 1rem;
        }
        
        .notifications-header {
          margin-bottom: 2rem;
          text-align: center;
        }
        
        .notifications-header h1 {
          color: #2d3748;
          font-size: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        
        .notifications-header p {
          color: #64748b;
          margin: 0;
        }
        
        .header-icon {
          color: #3b82f6;
        }
        
        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
        }
        
        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid #f3f3f3;
          border-top: 5px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        
        .empty-state {
          text-align: center;
          padding: 2rem;
          background: #f8fafc;
          border-radius: 10px;
          color: #64748b;
        }
        
        .empty-icon {
          font-size: 3rem;
          color: #d1d5db;
          margin-bottom: 1rem;
        }
        
        .empty-state h3 {
          color: #4b5563;
          margin-bottom: 0.5rem;
        }
        
        .empty-state p {
          margin: 0;
        }
        
        .notifications-list {
          display: grid;
          gap: 1rem;
        }
        
        .notification-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          transition: all 0.2s ease;
        }
        
        .notification-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        .notification-content {
          flex: 1;
        }
        
        .notification-date {
          font-weight: 600;
          color: #3b82f6;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }
        
        .notification-message {
          color: #1e293b;
        }
        
        .delete-btn {
          background: #fee2e2;
          color: #b91c1c;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
        }
        
        .delete-btn:hover {
          background: #fecaca;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .notification-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .delete-btn {
            align-self: flex-end;
          }
        }
      `}</style>
    </div>
  );
}