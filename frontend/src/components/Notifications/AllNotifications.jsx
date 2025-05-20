import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const url = 'http://localhost:8000/api/notifications/';

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      setNotifications(response.data);
    } catch (error) {
      console.error('Erreur récupération notifications :', error);
    } finally {
      setIsLoading(false);
    }
  };

const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: 'Cette action supprimera définitivement la notification.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler'
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`${url}${id}/`);
      setNotifications((prev) => prev.filter((n) => n.id !== id));

      Swal.fire(
        'Supprimé !',
        'La notification a été supprimée avec succès.',
        'success'
      );
    } catch (error) {
      console.error('Erreur suppression notification :', error);
      Swal.fire(
        'Erreur',
        'Impossible de supprimer la notification.',
        'error'
      );
    }
  }
};


  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h1>Gestion des Notifications</h1>
        <p>Liste complète des notifications système</p>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Chargement des notifications...</p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-bell-slash"></i>
          <p>Aucune notification disponible</p>
        </div>
      ) : (
        <div className="notifications-table">
          <div className="table-header">
            <div className="header-cell">ID</div>
            <div className="header-cell message-cell">Message</div>
            <div className="header-cell">Date</div>
            <div className="header-cell">Actions</div>
          </div>
          
          {notifications.map((n) => (
            <div key={n.id} className="table-row">
              <div className="table-cell">{n.id}</div>
              <div className="table-cell message-cell">{n.message}</div>
              <div className="table-cell">{new Date(n.date).toLocaleString()}</div>
              <div className="table-cell">
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(n.id)}
                >
                  <i className="fas fa-trash-alt"></i> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .notifications-container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 1rem;
        }
        
        .notifications-header {
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .notifications-header h1 {
          color: #2d3748;
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
        }
        
        .notifications-header p {
          color: #718096;
          margin: 0;
          font-size: 1rem;
        }
        
        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          color: #4a5568;
        }
        
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e2e8f0;
          border-top-color: #4f46e5;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        
        .empty-state {
          text-align: center;
          padding: 3rem;
          background: #f8fafc;
          border-radius: 10px;
          color: #a0aec0;
        }
        
        .empty-state i {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .empty-state p {
          font-size: 1.2rem;
          margin: 0;
        }
        
        .notifications-table {
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        
        .table-header {
          display: grid;
          grid-template-columns: 80px 1fr 180px 120px;
          background: #4f46e5;
          color: white;
          font-weight: 600;
          padding: 1rem;
        }
        
        .header-cell {
          padding: 0.5rem;
        }
        
        .message-cell {
          padding-left: 1.5rem;
        }
        
        .table-row {
          display: grid;
          grid-template-columns: 80px 1fr 180px 120px;
          background: white;
          border-bottom: 1px solid #edf2f7;
          transition: all 0.2s ease;
        }
        
        .table-row:last-child {
          border-bottom: none;
        }
        
        .table-row:hover {
          background: #f8fafc;
        }
        
        .table-cell {
          padding: 1rem 0.5rem;
          display: flex;
          align-items: center;
          word-break: break-word;
        }
        
        .delete-btn {
          background: #fed7d7;
          color: #e53e3e;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
        }
        
        .delete-btn:hover {
          background: #feb2b2;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .table-header {
            grid-template-columns: 60px 1fr 150px 100px;
            font-size: 0.9rem;
            padding: 0.75rem;
          }
          
          .table-row {
            grid-template-columns: 60px 1fr 150px 100px;
          }
          
          .table-cell {
            padding: 0.75rem 0.5rem;
            font-size: 0.9rem;
          }
          
          .delete-btn {
            padding: 0.4rem 0.8rem;
            font-size: 0.85rem;
          }
        }
        
        @media (max-width: 576px) {
          .table-header {
            display: none;
          }
          
          .table-row {
            grid-template-columns: 1fr;
            padding: 1rem;
            gap: 0.5rem;
            border-bottom: 1px solid #e2e8f0;
          }
          
          .table-cell {
            padding: 0.25rem 0;
          }
          
          .table-cell::before {
            content: attr(data-label);
            font-weight: 600;
            color: #4a5568;
            margin-right: 0.5rem;
          }
          
          .delete-btn {
            margin-top: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}