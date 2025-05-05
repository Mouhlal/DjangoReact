import React, { useEffect, useState } from 'react';
import { getPresences, getAlertes } from '../../api/api';
import { useParams, Link } from 'react-router-dom';

export default function EleveDetails() {
  const { id: eleveId } = useParams();
  const [presences, setPresences] = useState([]);
  const [alertes, setAlertes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les données des présences et alertes
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
    return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Chargement...</span></div></div>;
  }

  return (
    <div className="container mt-5">
{/*       <h2 className="mb-4">Détails de l'élève</h2>
 */}
      <div className="mb-5">
        <h3>Alertes d'Absence</h3>
        {alertes.length ? (
          <ul className="list-group">
            {alertes.map(a => (
              <li key={a.id} className="list-group-item d-flex justify-content-between align-items-center">
                {a.date} – {a.nbr_absences} absences
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune alerte d'absence pour cet élève.</p>
        )}
      </div>

      {/* Présences */}
      <div>
        <h3>Présences</h3>
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Matière</th>
              <th>Date</th>
              <th>Séance</th>
              <th>Présent</th>
            </tr>
          </thead>
          <tbody>
            {presences.map(p => (
              <tr key={p.id}>
                <td>{p.matiere.nom}</td>
                <td>{p.date}</td>
                <td>{p.sceance}</td>
                <td>{p.present ? <span className="text-success">✔ Oui</span> : <span className="text-danger">✘ Non</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Boutons d'actions */}
      <div className="mt-4">
        <Link to={`/eleve/${eleveId}/ajouter-presence`} className="btn btn-primary me-2">
          Ajouter une présence
        </Link>
        <Link to="/eleves" className="btn btn-secondary">
          Retour à la liste
        </Link>
      </div>
    </div>
  );
}
