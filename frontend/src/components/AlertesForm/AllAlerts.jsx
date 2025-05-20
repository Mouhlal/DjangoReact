import React, { useState, useEffect } from 'react';
import { getAllAlertes, deleteAlerte } from '../../api/api';
import Swal from 'sweetalert2';

export default function AllAlerts() {
  const [alertes, setAlertes] = useState([]);

  const fetchAlertes = () => {
    getAllAlertes()
      .then(res => setAlertes(res.data))
      .catch(err => console.error('Erreur récupération alertes :', err));
  };

  useEffect(fetchAlertes, []);


const handleDelete = async (alerteId) => {
  const result = await Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: 'Cette action supprimera définitivement l\'alerte.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler'
  });

  if (result.isConfirmed) {
    try {
      await deleteAlerte(alerteId);
      fetchAlertes();
      Swal.fire(
        'Supprimé !',
        'L\'alerte a été supprimée avec succès.',
        'success'
      );
    } catch (err) {
      console.error('Erreur suppression alerte :', err);
      Swal.fire(
        'Erreur',
        'Impossible de supprimer l\'alerte.',
        'error'
      );
    }
  }
};

  return (
    <div className="alerts-container">
      <div className="alerts-header">
        <h2>Toutes les alertes d'absence</h2>
        <p className="subtitle">Gestion des notifications d'absence des élèves</p>
      </div>

      {alertes.length === 0 ? (
        <div className="no-alerts">
          <i className="fas fa-bell-slash"></i>
          <p>Aucune alerte enregistrée</p>
        </div>
      ) : (
        <div className="alerts-list">
          {alertes.map(a => (
            <div key={a.id} className="alert-card">
              <div className="alert-content">
                <div className="alert-title">
                  <span className="student-name">{a.eleve_nom} {a.eleve_prenom}</span>
                  <span className="alert-date">{a.date}</span>
                </div>
                <div className="alert-details">
                  <span className="badge">{a.nbr_absences} absence(s)</span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(a.id)}
                className="delete-btn"
              >
                <i className="fas fa-trash-alt"></i> Supprimer
              </button>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .alerts-container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 0 1rem;
        }
        
        .alerts-header {
          margin-bottom: 2rem;
          text-align: center;
        }
        
        .alerts-header h2 {
          color: #2d3748;
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
        }
        
        .subtitle {
          color: #718096;
          font-size: 1rem;
          margin-top: 0;
        }
        
        .no-alerts {
          text-align: center;
          padding: 3rem;
          background: #f8fafc;
          border-radius: 10px;
          color: #a0aec0;
        }
        
        .no-alerts i {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .no-alerts p {
          font-size: 1.2rem;
          margin: 0;
        }
        
        .alerts-list {
          display: grid;
          gap: 1rem;
        }
        
        .alert-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2rem;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .alert-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        .alert-content {
          flex: 1;
        }
        
        .alert-title {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }
        
        .student-name {
          font-weight: 600;
          color: #2d3748;
          font-size: 1.1rem;
        }
        
        .alert-date {
          color: #718096;
          font-size: 0.9rem;
        }
        
        .alert-details {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .badge {
          background: #fffaf0;
          color: #dd6b20;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
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
        
        @media (max-width: 768px) {
          .alert-card {
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