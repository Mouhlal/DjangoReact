import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPresences, getAlertes } from '../../api/api';

export default function PresenceList() {
  const { id: eleveId } = useParams();
  const [presences, setPresences] = useState([]);
  const [alertes, setAlertes]     = useState([]);

  useEffect(() => {
    getPresences(eleveId)
      .then(res => setPresences(res.data))
      .catch(err => console.error('Erreur présences :', err));

    getAlertes(eleveId)
      .then(res => setAlertes(res.data))
      .catch(err => console.error('Erreur alertes :', err));
  }, [eleveId]);

  return (
    <div>
      <h2>Alertes d'Absence</h2>
      {alertes.length
        ? <ul>
            {alertes.map(a => (
              <li key={a.id}>
                {a.date} – {a.nbr_absences} absences
              </li>
            ))}
          </ul>
        : <p>Aucune alerte.</p>
      }

      <h2>Présences</h2>
      <table>
        <thead>
          <tr>
            <th>Matière</th><th>Date</th><th>Séance</th><th>Présent</th>
          </tr>
        </thead>
        <tbody>
          {presences.map(p => (
            <tr key={p.id}>
              <td>{p.matiere.nom}</td>
              <td>{p.date}</td>
              <td>{p.sceance}</td>
              <td>{p.present ? 'Oui' : 'Non'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
