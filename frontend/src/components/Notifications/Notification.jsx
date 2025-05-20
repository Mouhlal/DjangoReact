import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

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
  const result = await Swal.fire({
    title: 'Supprimer cette notification ?',
    text: 'Cette action est irréversible.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler'
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`${url}${notifId}/`);
      setNotifs(prev => prev.filter(n => n.id !== notifId));

      Swal.fire({
        title: 'Supprimée !',
        text: 'La notification a été supprimée avec succès.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (err) {
      console.error('Erreur suppression notification :', err);
      Swal.fire({
        title: 'Erreur',
        text: 'Impossible de supprimer la notification.',
        icon: 'error'
      });
    }
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
