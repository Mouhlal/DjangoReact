import React, { useEffect, useState } from 'react';
import { getEleves, deleteEleve } from '../../api/api';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function EleveList() {
  const [eleves, setEleves] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchEleves = () => {
    setIsLoading(true);
    getEleves()
      .then(res => {
        setEleves(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Erreur chargement élèves :', err);
        setIsLoading(false);
      });
  };

  useEffect(fetchEleves, []);
  
  const filteredEleves = eleves.filter(e =>
    `${e.nom} ${e.prenom}`.toLowerCase().includes(search.toLowerCase())
  );


const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: 'Voulez-vous vraiment supprimer cet élève ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler',
  });

  if (result.isConfirmed) {
    try {
      await deleteEleve(id);
      fetchEleves();
      Swal.fire({
        title: 'Supprimé !',
        text: "L'élève a été supprimé avec succès.",
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error('Erreur suppression élève :', err);
      Swal.fire({
        title: 'Erreur',
        text: "Impossible de supprimer cet élève.",
        icon: 'error',
      });
    }
  }
};

  return (
    <div className="eleve-list-container">
      <div className="header-section">
        <h1 className="page-title">Gestion des Élèves</h1>
        <p className="page-subtitle">Liste complète des élèves enregistrés</p>
      </div>

      <div className="search-and-actions">
        <div className="search-container">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Rechercher un élève..."
            className="search-input"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="search-border"></div>
        </div>

        <div className="actions-container">
          <Link to="/ajouter-eleve" className="btn btn-primary">
            <i className="fas fa-plus-circle"></i> Nouvel Élève
          </Link>
        </div>
      </div>

      <div className="quick-actions">
        <Link to="/presences" className="quick-action-btn">
          <div className="icon-wrapper">
            <i className="fas fa-calendar-check"></i>
          </div>
          <span>Présences</span>
        </Link>
        <Link to="/notifications" className="quick-action-btn">
          <div className="icon-wrapper">
            <i className="fas fa-bell"></i>
          </div>
          <span>Notifications</span>
        </Link>
        <Link to="/alertes" className="quick-action-btn">
          <div className="icon-wrapper">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <span>Alertes</span>
        </Link>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement des élèves...</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="eleve-table">
            <thead>
              <tr>
                <th className="id-column">ID</th>
                <th className="photo-column">Photo</th> 
                <th className="name-column">Nom</th>
                <th className="name-column">Prénom</th>
                <th className="group-column">Groupe</th>
                <th className="filiere-column">Filière</th>
                <th className="actions-column">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEleves.length > 0 ? (
                filteredEleves.map(e => (
                  <tr key={e.id}>
                    <td className="id-cell">{e.id}</td>
                    <td className="photo-cell">
                       <Link 
                          to={`/eleve/${e.id}`} 
                          className=" btn-sm me-1"
                        >
                      <div className="avatar-container">
                        {e.image ? (
                          <img 
                            src={e.image} 
                            alt={`${e.nom} ${e.prenom}`} 
                            className="eleve-avatar"
                          />
                        ) : (
                          <div className="avatar-placeholder">
                            <i className="fas fa-user-graduate"></i>
                          </div>
                        )}
                      </div>
                    </Link>
                    </td>
                    <td className="name-cell">{e.nom}</td>
                    <td className="name-cell">{e.prenom}</td>
                    <td className="group-cell">
                      <span className="group-badge">{e.groupe_name}</span>
                    </td>
                    <td className="filiere-cell">
                      <span className="filiere-badge">{e.filiere_name}</span>
                    </td>
                    <td className="actions-cell">
                     <div className="action-buttons">
  <Link 
    to={`/eleve/${e.id}`} 
    className="btn btn-primary btn-sm me-1"
  >
    <i className="fas fa-eye me-1"></i> Détails
  </Link>
  <Link 
    to={`/modifier-eleve/${e.id}`} 
    className="btn btn-success btn-sm me-1"
  >
    <i className="fas fa-edit me-1"></i> Modifier
  </Link>
  <Link 
    to={`/eleve/${e.id}/notifications`} 
    className="btn btn-info btn-sm me-1 text-white"
  >
    <i className="fas fa-bell me-1"></i> Notifs
  </Link>
  <Link 
    to={`/eleve/${e.id}/alertes`} 
    className="btn btn-warning btn-sm me-1"
  >
    <i className="fas fa-exclamation-triangle me-1"></i> Alertes
  </Link>
  <button 
    onClick={() => handleDelete(e.id)} 
    className="btn btn-danger btn-sm"
  >
    <i className="fas fa-trash-alt me-1"></i> Supprimer
  </button>
</div>

<style jsx>{`
  .action-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    justify-content: center;
  }
  .btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
    display: inline-flex;
    align-items: center;
  }
  @media (max-width: 768px) {
    .btn-sm {
      padding: 0.2rem 0.4rem;
      font-size: 0.75rem;
    }
    .btn-sm i {
      margin-right: 0.2rem !important;
    }
  }
`}</style>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="no-results-row">
                  <td colSpan="7">
                    <div className="no-results-message">
                      <i className="fas fa-user-slash"></i>
                      <p>Aucun élève trouvé</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <style jsx>{`
        .eleve-list-container {
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #2d3748;
        }
        
        .header-section {
          margin-bottom: 2rem;
        }
        
        .page-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #1a365d;
          margin-bottom: 0.5rem;
        }
        
        .page-subtitle {
          font-size: 1rem;
          color: #718096;
          margin-bottom: 0;
        }
        
        .search-and-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          gap: 1.5rem;
        }
        
        .search-container {
          flex: 1;
          position: relative;
          max-width: 500px;
        }
        
        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #a0aec0;
          z-index: 2;
        }
        
        .search-input {
          width: 100%;
          padding: 0.8rem 1rem 0.8rem 2.5rem;
          border: none;
          border-radius: 8px;
          font-size: 0.95rem;
          background-color: #f7fafc;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }
        
        .search-input:focus {
          outline: none;
          background-color: white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        
        .search-border {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #4f46e5, #10b981);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
          z-index: 2;
        }
        
        .search-input:focus ~ .search-border {
          transform: scaleX(1);
        }
        
        .actions-container {
          display: flex;
          gap: 1rem;
        }
        
        .btn {
          padding: 0.7rem 1.5rem;
          border-radius: 8px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
          text-decoration: none;
          border: none;
          cursor: pointer;
          font-size: 0.95rem;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: white;
          box-shadow: 0 2px 5px rgba(79, 70, 229, 0.3);
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(79, 70, 229, 0.4);
        }
        
        .quick-actions {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .quick-action-btn {
          flex: 1;
          background: white;
          border-radius: 10px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          color: #4a5568;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          transition: all 0.2s ease;
          max-width: 140px;
        }
        
        .quick-action-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          color: #4f46e5;
        }
        
        .icon-wrapper {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #e0e7ff, #d1fae5);
          color: #4f46e5;
          font-size: 1.2rem;
        }
        
        .quick-action-btn span {
          font-size: 0.85rem;
          font-weight: 500;
          text-align: center;
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
        }
        
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #e2e8f0;
          border-top-color: #4f46e5;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .table-wrapper {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          background: white;
        }
        
        .eleve-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
        }
        
        .eleve-table th {
          padding: 1.2rem 1rem;
          text-align: left;
          font-weight: 600;
          color: #4a5568;
          background-color: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .eleve-table td {
          padding: 1rem;
          border-bottom: 1px solid #edf2f7;
          vertical-align: middle;
        }
        
        .eleve-table tr:last-child td {
          border-bottom: none;
        }
        
        .eleve-table tr:hover {
          background-color: #f8fafc;
        }
        
        .avatar-container {
          width: 40px;
          height: 40px;
        }
        
        .eleve-avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          border: 2px solid #e0e7ff;
        }
        
        .avatar-placeholder {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, #e0e7ff, #d1fae5);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4f46e5;
          font-size: 1.2rem;
        }
        
        .group-badge, .filiere-badge {
          display: inline-block;
          padding: 0.3rem 0.6rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        
        .group-badge {
          background-color: #e0f2fe;
          color: #0369a1;
        }
        
        .filiere-badge {
          background-color: #dcfce7;
          color: #166534;
        }
        
        .action-buttons {
          display: flex;
          gap: 0.5rem;
          justify-content: flex-end;
        }
        
        .action-btn {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          color: white;
          font-size: 0.9rem;
          position: relative;
          overflow: hidden;
        }
        
        .action-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255,255,255,0.2);
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        
        .action-btn:hover::after {
          opacity: 1;
        }
        
        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .view-btn {
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
        }
        
        .edit-btn {
          background: linear-gradient(135deg, #34d399, #10b981);
        }
        
        .notif-btn {
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
        }
        
        .alert-btn {
          background: linear-gradient(135deg, #f87171, #ef4444);
        }
        
        .delete-btn {
          background: linear-gradient(135deg, #f472b6, #ec4899);
        }
        
        .no-results-row td {
          padding: 3rem;
          text-align: center;
        }
        
        .no-results-message {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #a0aec0;
        }
        
        .no-results-message i {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        
        .no-results-message p {
          margin: 0;
          font-size: 1rem;
        }
        
        @media (max-width: 1024px) {
          .search-and-actions {
            flex-direction: column;
          }
          
          .search-container {
            max-width: 100%;
          }
          
          .actions-container {
            width: 100%;
            justify-content: flex-end;
          }
        }
        
        @media (max-width: 768px) {
          .quick-actions {
            flex-wrap: wrap;
          }
          
          .quick-action-btn {
            max-width: calc(33.333% - 0.666rem);
          }
          
          .eleve-table {
            display: block;
            overflow-x: auto;
          }
        }
        
        @media (max-width: 576px) {
          .eleve-list-container {
            padding: 1rem;
          }
          
          .quick-action-btn {
            max-width: calc(50% - 0.5rem);
          }
          
          .action-buttons {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}