// src/components/AlerteList.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAlertes, deleteAlerte } from '../../api/api';

export default function AlerteList() {
  const { id: eleveId } = useParams();
  const [alertes, setAlertes] = useState([]);

  const fetchAlertes = () => {
    getAlertes(eleveId)
      .then(res => setAlertes(res.data))
      .catch(err => console.error('Erreur récupération alertes :', err));
  };

  useEffect(fetchAlertes, [eleveId]);

  const handleDelete = async (alerteId) => {
    if (!window.confirm('Supprimer cette alerte ?')) return;
    try {
      await deleteAlerte(alerteId);
      fetchAlertes();
    } catch (err) {
      console.error('Erreur suppression alerte :', err);
      alert('Impossible de supprimer l’alerte.');
    }
  };

  return (
    <div>
      <h2>Alertes d'Absence</h2>
      {alertes.length === 0 && <p>Aucune alerte pour cet élève.</p>}
      <ul>
        {alertes.map(a => (
          <li key={a.id} style={{ marginBottom: '0.5rem' }}>
            <strong>{a.date}</strong> – {a.nbr_absences} absences
            <button
              onClick={() => handleDelete(a.id)}
              style={{
                marginLeft: '1rem',
                color: 'white',
                background: 'red',
                border: 'none',
                padding: '0.2rem 0.5rem',
                borderRadius: '4px'
              }}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
