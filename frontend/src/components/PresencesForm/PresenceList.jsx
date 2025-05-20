import React, { useEffect, useState } from 'react';
import { deletePresence, getAllPresences } from '../../api/api';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


export default function PresenceList() {
  const [presences, setPresences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPresences();
  }, []);

  const fetchPresences = () => {
    setIsLoading(true);
    getAllPresences()
      .then(res => {
        setPresences(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Erreur présences :', err);
        setIsLoading(false);
        showErrorAlert('Erreur lors du chargement des présences');
      });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Confirmer la suppression',
      text: "Voulez-vous vraiment supprimer cette présence ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    });

    if (result.isConfirmed) {
      try {
        await deletePresence(id);
        setPresences(presences.filter(p => p.id !== id));
        showSuccessAlert('Présence supprimée avec succès');
      } catch (err) {
        console.error('Erreur suppression :', err);
        showErrorAlert('Impossible de supprimer cette présence');
      }
    }
  };

  const showSuccessAlert = (message) => {
    Swal.fire({
      title: 'Succès',
      text: message,
      icon: 'success',
      confirmButtonColor: '#4f46e5',
      timer: 2000
    });
  };

  const showErrorAlert = (message) => {
    Swal.fire({
      title: 'Erreur',
      text: message,
      icon: 'error',
      confirmButtonColor: '#4f46e5'
    });
  };

  return (
    <div className="presence-container">
      <div className="presence-header">
        <h2>Gestion des Présences</h2>
        <p>Liste complète des enregistrements de présence</p>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Chargement des présences...</p>
        </div>
      ) : presences.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-calendar-times"></i>
          <p>Aucune présence enregistrée</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="presence-table">
            <thead>
              <tr>
                <th>Élève</th>
                <th>Matière</th>
                <th>Date</th>
                <th>Séance</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {presences.map(p => (
                <tr key={p.id}>
                  <td>{p.eleve.nom} {p.eleve.prenom}</td>
                  <td>{p.matiere.nom}</td>
                  <td>{new Date(p.date).toLocaleDateString()}</td>
                  <td>{p.sceance}</td>
                  <td>
                    <span className={`status-badge ${p.present ? 'present' : 'absent'}`}>
                      {p.present ? 'Présent' : 'Absent'}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="delete-btn"
                    >
                      <i className="fas fa-trash-alt"></i> Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="footer-actions">
        <Link to="/eleves" className="back-btn">
          <i className="fas fa-arrow-left"></i> Retour
        </Link>
      </div>

      <style jsx>{`
        .presence-container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 1rem;
        }
        
        .presence-header {
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .presence-header h2 {
          color: #2d3748;
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
        }
        
        .presence-header p {
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
        
        .presence-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        
        .presence-table th {
          padding: 1rem;
          background: #4f46e5;
          color: white;
          text-align: left;
          font-weight: 500;
        }
        
        .presence-table td {
          padding: 1rem;
          border-bottom: 1px solid #edf2f7;
        }
        
        .presence-table tr:last-child td {
          border-bottom: none;
        }
        
        .presence-table tr:hover {
          background-color: #f8fafc;
        }
        
        .status-badge {
          padding: 0.35rem 0.75rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }
        
        .status-badge.present {
          background-color: #dcfce7;
          color: #166534;
        }
        
        .status-badge.absent {
          background-color: #fee2e2;
          color: #991b1b;
        }
        
        .delete-btn {
          background: #fed7d7;
          color: #e53e3e;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
        }
        
        .delete-btn:hover {
          background: #feb2b2;
        }
        
        .footer-actions {
          margin-top: 2rem;
          display: flex;
          justify-content: flex-start;
        }
        
        .back-btn {
          background: #e2e8f0;
          color: #4a5568;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
        }
        
        .back-btn:hover {
          background: #cbd5e0;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .presence-table {
            display: block;
            overflow-x: auto;
          }
          
          .presence-table th,
          .presence-table td {
            padding: 0.75rem;
          }
          
          .delete-btn {
            padding: 0.4rem 0.8rem;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
}