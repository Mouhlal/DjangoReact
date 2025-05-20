import React, { useEffect, useState } from 'react';
import { getPresences, getAlertes } from '../../api/api';
import { useParams, Link } from 'react-router-dom';

export default function EleveDetails() {
  const { id: eleveId } = useParams();
  const [presences, setPresences] = useState([]);
  const [alertes, setAlertes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getPresences(eleveId), getAlertes(eleveId)])
      .then(([resPresences, resAlertes]) => {
        setPresences(resPresences.data);
        setAlertes(resAlertes.data);
      })
      .catch(err => console.error('Erreur de chargement des données :', err))
      .finally(() => setLoading(false));
  }, [eleveId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement des données...</p>
      </div>
    );
  }

  return (
    <div className="eleve-details-container">
      <div className="header-section">
        <h2>Détails de l'Élève</h2>
        <p>Historique des présences et alertes</p>
      </div>

      <div className="card alerts-section">
        <div className="card-header">
          <h3>Alertes d'Absence</h3>
        </div>
        <div className="card-body">
          {alertes.length ? (
            <div className="alerts-list">
              {alertes.map(a => (
                <div key={a.id} className="alert-item">
                  <div className="alert-date">{a.date}</div>
                  <div className="alert-count">
                    <span className="badge">{a.nbr_absences} absence(s)</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-alerts">
              <i className="fas fa-bell-slash"></i>
              <p>Aucune alerte d'absence</p>
            </div>
          )}
        </div>
      </div>

      <div className="card presences-section">
        <div className="card-header">
          <h3>Historique des Présences</h3>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="presence-table">
              <thead>
                <tr>
                  <th>Matière</th>
                  <th>Date</th>
                  <th>Séance</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {presences.map(p => (
                  <tr key={p.id}>
                    <td>{p.matiere.nom}</td>
                    <td>{new Date(p.date).toLocaleDateString()}</td>
                    <td>{p.sceance}</td>
                    <td>
                      <span className={`status ${p.present ? 'present' : 'absent'}`}>
                        {p.present ? 'Présent' : 'Absent'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="actions-section">
        <Link to={`/eleve/${eleveId}/ajouter-presence`} className="btn btn-primary">
          <i className="fas fa-plus-circle"></i> Ajouter une présence
        </Link>
        <Link to="/eleves" className="btn btn-secondary">
          <i className="fas fa-arrow-left"></i> Retour à la liste
        </Link>
      </div>

      <style jsx>{`
        .eleve-details-container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 1rem;
        }
        
        .header-section {
          margin-bottom: 2rem;
          text-align: center;
        }
        
        .header-section h2 {
          color: #2d3748;
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        
        .header-section p {
          color: #64748b;
          font-size: 1.1rem;
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 300px;
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
        
        .card {
          border-radius: 10px;
          border: none;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          margin-bottom: 2rem;
        }
        
        .card-header {
          background: #4f46e5;
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 10px 10px 0 0 !important;
        }
        
        .card-header h3 {
          margin: 0;
          font-size: 1.3rem;
        }
        
        .card-body {
          padding: 1.5rem;
        }
        
        .alerts-list {
          display: grid;
          gap: 0.75rem;
        }
        
        .alert-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: #f8fafc;
          border-radius: 8px;
        }
        
        .alert-date {
          font-weight: 500;
          color: #334155;
        }
        
        .badge {
          background: #fff7ed;
          color: #ea580c;
          padding: 0.35rem 0.75rem;
          border-radius: 20px;
          font-weight: 500;
          font-size: 0.9rem;
        }
        
        .no-alerts {
          text-align: center;
          padding: 2rem;
          color: #94a3b8;
        }
        
        .no-alerts i {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }
        
        .presence-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .presence-table th {
          background: #f1f5f9;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: #334155;
        }
        
        .presence-table td {
          padding: 1rem;
          border-bottom: 1px solid #f1f5f9;
        }
        
        .presence-table tr:last-child td {
          border-bottom: none;
        }
        
        .presence-table tr:hover {
          background: #f8fafc;
        }
        
        .status {
          padding: 0.35rem 0.75rem;
          border-radius: 20px;
          font-weight: 500;
          font-size: 0.9rem;
        }
        
        .status.present {
          background: #f0fdf4;
          color: #166534;
        }
        
        .status.absent {
          background: #fef2f2;
          color: #991b1b;
        }
        
        .actions-section {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }
        
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          font-weight: 500;
          border-radius: 8px;
          transition: all 0.2s;
        }
        
        .btn-primary {
          background: #4f46e5;
          border: none;
        }
        
        .btn-primary:hover {
          background: #4338ca;
          transform: translateY(-2px);
        }
        
        .btn-secondary {
          background: #f1f5f9;
          color: #334155;
          border: none;
        }
        
        .btn-secondary:hover {
          background: #e2e8f0;
          transform: translateY(-2px);
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .actions-section {
            flex-direction: column;
          }
          
          .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}