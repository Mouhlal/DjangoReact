import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAlertes, deleteAlerte } from '../../api/api';
import Swal from 'sweetalert2';
import { FaBell, FaTrash, FaExclamationTriangle } from 'react-icons/fa';

export default function AlerteList() {
  const { id: eleveId } = useParams();
  const [alertes, setAlertes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAlertes = () => {
    setIsLoading(true);
    getAlertes(eleveId)
      .then(res => {
        setAlertes(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Erreur récupération alertes :', err);
        setIsLoading(false);
      });
  };

  useEffect(fetchAlertes, [eleveId]);

  const handleDelete = async (alerteId) => {
    const result = await Swal.fire({
      title: 'Supprimer cette alerte ?',
      text: 'Cette action est irréversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      backdrop: `
        rgba(0,0,0,0.4)
        url("/images/alert-trash.gif")
        left top
        no-repeat
      `
    });

    if (result.isConfirmed) {
      try {
        await deleteAlerte(alerteId);
        fetchAlertes();
        Swal.fire({
          title: 'Supprimée !',
          text: 'L\'alerte a été supprimée avec succès.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      } catch (err) {
        console.error('Erreur suppression alerte :', err);
        Swal.fire({
          title: 'Erreur',
          text: 'Impossible de supprimer l\'alerte.',
          icon: 'error'
        });
      }
    }
  };

  return (
    <div className="alertes-container">
      <div className="alertes-header">
        <h1>
          <FaBell className="header-icon" /> Alertes d'Absence
        </h1>
        <p>Gestion des notifications d'absence pour l'élève</p>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Chargement des alertes...</p>
        </div>
      ) : alertes.length === 0 ? (
        <div className="empty-state">
          <FaExclamationTriangle className="empty-icon" />
          <h3>Aucune alerte enregistrée</h3>
          <p>Cet élève n'a aucune alerte d'absence.</p>
        </div>
      ) : (
        <div className="alertes-list">
          {alertes.map(a => (
            <div key={a.id} className="alerte-card">
              <div className="alerte-content">
                <div className="alerte-date">{new Date(a.date).toLocaleDateString()}</div>
                <div className="alerte-count">
                  <span className="badge">{a.nbr_absences} absence(s)</span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(a.id)}
                className="delete-btn"
              >
                <FaTrash /> Supprimer
              </button>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .alertes-container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 0 1rem;
        }
        
        .alertes-header {
          margin-bottom: 2rem;
          text-align: center;
        }
        
        .alertes-header h1 {
          color: #2d3748;
          font-size: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        
        .alertes-header p {
          color: #64748b;
          margin: 0;
        }
        
        .header-icon {
          color: #f59e0b;
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
          border-top: 5px solid #4f46e5;
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
        
        .alertes-list {
          display: grid;
          gap: 1rem;
        }
        
        .alerte-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          transition: all 0.2s ease;
        }
        
        .alerte-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        .alerte-content {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        
        .alerte-date {
          font-weight: 600;
          color: #1e293b;
          min-width: 120px;
        }
        
        .badge {
          background: #ffedd5;
          color: #9a3412;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }
        
        .badge::before {
          content: '⚠️';
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
          .alerte-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .alerte-content {
            width: 100%;
            justify-content: space-between;
          }
          
          .delete-btn {
            align-self: flex-end;
          }
        }
        
        @media (max-width: 480px) {
          .alerte-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}