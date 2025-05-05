import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function NotificationList() {
  const { id: eleveId } = useParams();
  const [notifs, setNotifs] = useState([]);

  const url = 'http://localhost:8000/api/notifications/';

  useEffect(() => {
    axios.get(`${url}?eleve=${eleveId}`)
      .then(res => setNotifs(res.data))
      .catch(err => console.error('Erreur récupération notifications :', err));
  }, [eleveId]);

  const handleDelete = async (notifId) => {
    if (!window.confirm('Supprimer cette notification ?')) return;

    try {
      await axios.delete(`${url}${notifId}/`);
      setNotifs(prev => prev.filter(n => n.id !== notifId));
    } catch (err) {
      console.error('Erreur suppression notification :', err);
      alert('Impossible de supprimer la notification.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Notifications de l’élève</h2>
      
      {notifs.length === 0 ? (
        <p>Aucune notification pour cet élève.</p>
      ) : (
        <div className="list-group">
          {notifs.map(n => (
            <div key={n.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{new Date(n.date).toLocaleString()}</strong> — {n.message}
              </div>
              <button
                onClick={() => handleDelete(n.id)}
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
