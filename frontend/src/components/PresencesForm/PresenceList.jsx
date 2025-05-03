import React, { useEffect, useState } from 'react';
import { getAllPresences } from '../../api/api';
import { Link } from 'react-router-dom';

export default function PresenceList() {
  const [presences, setPresences] = useState([]);

  useEffect(() => {
    getAllPresences()
      .then(res => setPresences(res.data))
      .catch(err => console.error('Erreur présences :', err));
  }, []);

  return (
    <div>
      <h2>Toutes les présences</h2>
      {presences.length === 0 ? (
        <p>Aucune présence enregistrée.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Élève</th>
              <th>Matière</th>
              <th>Date</th>
              <th>Séance</th>
              <th>Présent</th>
            </tr>
          </thead>
          <tbody>
            {presences.map(p => (
              <tr key={p.id}>
                <td>{p.eleve.nom} {p.eleve.prenom}</td>
                <td>{p.matiere.nom}</td>
                <td>{p.date}</td>
                <td>{p.sceance}</td>
                <td>{p.present ? 'Oui' : 'Non'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link to="/">← Retour</Link>
    </div>
  );
}
