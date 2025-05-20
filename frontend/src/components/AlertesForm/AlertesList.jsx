import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAlertes, deleteAlerte } from '../../api/api';
 import Swal from 'sweetalert2';

export default function AlerteList() {
  const { id: eleveId } = useParams();
  const [alertes, setAlertes] = useState([]);

  // Fonction pour récupérer les alertes
  const fetchAlertes = () => {
    getAlertes(eleveId)
      .then(res => setAlertes(res.data))
      .catch(err => console.error('Erreur récupération alertes :', err));
  };

  useEffect(fetchAlertes, [eleveId]);


const handleDelete = async (alerteId) => {
  const result = await Swal.fire({
    title: 'Supprimer cette alerte ?',
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
      await deleteAlerte(alerteId);
      fetchAlertes();

      Swal.fire({
        title: 'Supprimée !',
        text: 'L\'alerte a été supprimée avec succès.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (err) {
      console.error('Erreur suppression alerte :', err);
      Swal.fire({
        title: 'Erreur',
        text: 'Impossible de supprimer l’alerte.',
        icon: 'error'
      });
    }
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
