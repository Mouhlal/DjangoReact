import React, { useEffect, useState } from 'react';
import { getElevesByGroupe, getGroupes } from '../../api/api';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaUserGraduate } from 'react-icons/fa';

export default function ElevebyGroupe() {
  const { groupeId } = useParams();
  const [eleves, setEleves] = useState([]);
  const [groupe, setGroupe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [elevesRes, groupesRes] = await Promise.all([
          getElevesByGroupe(groupeId),
          getGroupes()
        ]);

        setEleves(elevesRes.data);
        const foundGroupe = groupesRes.data.find(grp => grp.groupeId.toString() === groupeId);
        setGroupe(foundGroupe);
      } catch (err) {
        console.error("Erreur de chargement:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [groupeId]);

  return (
    <div className="eleves-container">
      <div className="header-section">
        <Link to="/" className="back-link">
          <FaArrowLeft /> Retour aux groupes
        </Link>
        <div className="header-content">
          <h1>
          </h1>
          <p>Liste des élèves du groupe</p>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Chargement des élèves...</p>
        </div>
      ) : eleves.length === 0 ? (
        <div className="empty-state">
          <FaUserGraduate className="icon" />
          <h3>Aucun élève dans ce groupe</h3>
          <p>Ce groupe ne contient actuellement aucun élève</p>
        </div>
      ) : (
        <div className="eleves-grid">
          {eleves.map((eleve) => (
            <div key={eleve.id} className="eleve-card">
              <div className="avatar-container">
                {eleve.image ? (
                  <Link to={`/eleve/${eleve.id}`}>
                    <img
                      src={eleve.image}
                      alt={`${eleve.prenom} ${eleve.nom}`}
                      className="avatar"
                    />
                  </Link>
                ) : (
                  <div className="avatar-placeholder">
                    <FaUserGraduate />
                  </div>
                )}
              </div>
              <div className="eleve-info">
                <h3>{eleve.prenom} {eleve.nom}</h3>
                <div className="meta">
                  <span className="filiere">{eleve.filiere_name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .eleves-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }
        
        .header-section {
          text-align: center;
          margin-bottom: 3rem;
          position: relative;
        }
        
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #4f46e5;
          margin-bottom: 1rem;
          text-decoration: none;
          font-weight: 500;
        }
        
        .back-link:hover {
          text-decoration: underline;
        }
        
        .header-content h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .header-content p {
          font-size: 1.1rem;
          color: #64748b;
          margin-top: 0.5rem;
        }
        
        .decoration {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 1rem;
        }
        
        .circle {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
        }
        
        .line {
          width: 50px;
          height: 2px;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
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
          padding: 3rem;
          background: #f8fafc;
          border-radius: 12px;
        }
        
        .empty-state .icon {
          font-size: 3rem;
          color: #cbd5e1;
          margin-bottom: 1rem;
        }
        
        .empty-state h3 {
          color: #334155;
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }
        
        .empty-state p {
          color: #64748b;
        }
        
        .eleves-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        
        .eleve-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        
        .eleve-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .avatar-container {
          flex-shrink: 0;
        }
        
        .avatar {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #e0e7ff;
        }
        
        .avatar-placeholder {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4f46e5;
          font-size: 1.8rem;
        }
        
        .eleve-info {
          flex: 1;
        }
        
        .eleve-info h3 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.3rem;
          color: #1e293b;
        }
        
        .meta {
          display: flex;
          gap: 0.5rem;
          font-size: 0.9rem;
        }
        
        .filiere {
          background: #e0f2fe;
          color: #0369a1;
          padding: 0.2rem 0.6rem;
          border-radius: 20px;
          font-size: 0.8rem;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .header-content h1 {
            font-size: 2rem;
          }
          
          .eleve-card {
            flex-direction: column;
            text-align: center;
          }
          
          .eleve-info {
            text-align: center;
          }
          
          .meta {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}