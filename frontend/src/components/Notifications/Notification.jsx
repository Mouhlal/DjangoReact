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
    <div>
      <h2>Notifications de l’élève</h2>
      {notifs.length === 0 ? (
        <p>Aucune notification pour cet élève.</p>
      ) : (
        <ul>
          {notifs.map(n => (
            <li key={n.id} style={{ marginBottom: '0.5rem' }}>
              <strong>{new Date(n.date).toLocaleString()}</strong> — {n.message}
              <button
                onClick={() => handleDelete(n.id)}
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
      )}
    </div>
  );
}
