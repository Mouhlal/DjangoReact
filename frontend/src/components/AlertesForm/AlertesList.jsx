import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAlertes, deleteAlerte } from '../../api/api';

export default function AlerteList() {
  const { id: eleveId } = useParams();
  const [alertes, setAlertes] = useState([]);

  // Fonction pour récupérer les alertes
  const fetchAlertes = () => {
    getAlertes(eleveId)
      .then(res => setAlertes(res.data))
      .catch(err => console.error('Erreur récupération alertes :', err));
  };

  // Charger les alertes au montage du composant
  useEffect(fetchAlertes, [eleveId]);

  // Fonction de suppression d'une alerte
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
    <div className="container mt-5">
      <h2 className="mb-4">Alertes d'Absence</h2>

      {alertes.length === 0 ? (
        <p>Aucune alerte pour cet élève.</p>
      ) : (
        <div className="list-group">
          {alertes.map(a => (
            <div key={a.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{a.date}</strong> – {a.nbr_absences} absences
              </div>
              <button
                onClick={() => handleDelete(a.id)}
                className="btn btn-danger btn-sm"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
