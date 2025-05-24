import React, { useEffect, useState } from 'react';
import { getGroupes , getFilieres } from '../../api/api';
import { Link } from 'react-router-dom';
import { FaUsers, FaArrowRight } from 'react-icons/fa';

export default function Groupes() {
  const [groupes, setGroupes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filiere, setFiliere] = useState(null);
  const [selectedFiliere, setSelectedFiliere] = useState('');

 useEffect(() => {
  setIsLoading(true);
  getGroupes(selectedFiliere)
    .then((res) => {
      setGroupes(res.data);
      setIsLoading(false);
    })
    .catch((err) => {
      console.error("Erreur de chargement des groupes", err);
      setIsLoading(false);
    });
}, [selectedFiliere]);


  useEffect(() => {
  getFilieres()
    .then((res) => {
      setFiliere(res.data);
      console.log(res.data);
    })
    .catch((err) => console.error("Erreur de chargement des filières", err));
}, []);


  return (
    <div className="groupes-container">
      <div className="groupes-header">
        <div className="header-content">
          <h1>Gestion des Groupes</h1>
          <p>Explorez et gérez tous les groupes d'étudiants</p>
        </div>
        <div className="filiere-filter">
  <select
    className="simple-select"
    value={selectedFiliere}
    onChange={(e) => setSelectedFiliere(e.target.value)}
  >
    <option value="">Toutes les filières</option>
    {filiere && filiere.map((filiere) => (
      <option key={filiere.id} value={filiere.id}>{filiere.filiere}</option>
    ))}
  </select>
</div>

<style jsx>{`
  .simple-select {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }
`}</style>

      </div>

      {isLoading ? (
        <div className="loading-state">
        </div>
      ) : groupes.length === 0 ? (
        <div className="empty-state">
          <FaUsers className="empty-icon" />
          <h3>Aucun groupe disponible</h3>
          <p>Créez votre premier groupe pour commencer</p>
        </div>
      ) : (
        <div className="groupes-grid">
          {groupes.map((groupe) => (
            <Link 
            to={`/groupes/${groupe.id}/eleves`}
            key={groupe.id} 
              className="groupe-card"
            >
              <div className="groupe-icon">
                <FaUsers />
              </div>
              <h3>{groupe.groupeName}</h3>
              <div className="groupe-link">
                <span>Voir détails</span>
                <FaArrowRight />
              </div>
            </Link>
          ))}
        </div>
      )}

      <style jsx>{`
        .groupes-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }
        
        .groupes-header {
          text-align: center;
          margin-bottom: 3rem;
          position: relative;
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
        
        .header-decoration {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 1rem;
        }
        
        .decoration-circle {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
        }
        
        .decoration-line {
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
        
        .empty-icon {
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
        
        .groupes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        
        .groupe-card {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          text-decoration: none;
          color: inherit;
        }
        
        .groupe-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .groupe-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          color: #4f46e5;
          font-size: 1.5rem;
        }
        
        .groupe-card h3 {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #1e293b;
        }
        
        .groupe-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #4f46e5;
          font-weight: 500;
          margin-top: auto;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .groupes-grid {
            grid-template-columns: 1fr;
          }
          
          .header-content h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}