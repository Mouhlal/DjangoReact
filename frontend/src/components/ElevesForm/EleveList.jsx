import React, { useEffect, useState } from 'react';
import { getEleves, deleteEleve } from '../../api/api';
import { Link } from 'react-router-dom';

export default function EleveList() {
  const [eleves, setEleves] = useState([]);

  const fetchEleves = () => {
    getEleves()
      .then(res => setEleves(res.data))
      .catch(err => console.error('Erreur chargement élèves :', err));
  };

  useEffect(fetchEleves, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cet élève ?')) return;
    try {
      await deleteEleve(id);
      fetchEleves();
    } catch (err) {
      console.error('Erreur suppression élève :', err);
      alert('Impossible de supprimer cet élève.');
    }
  };

  return (
    <div>
      <h2>Liste des élèves</h2>
      <Link to="/ajouter-eleve">
        <button>Ajouter un élève</button>
      </Link>

      <Link to="/presences">
        <button>Toutes les Presences</button>
      </Link>
      <Link to="/notifications">
        <button>Toutes les notifications</button>
      </Link>

      <Link to="/alertes">
        <button>Toutes les alertes</button>
      </Link>

      <ul>
        {eleves.map(e => (
          <li key={e.id} style={{ marginBottom: '0.5rem' }}>
            {e.nom} {e.prenom} —  
            Groupe : {e.groupe_name} —  
            Filière : {e.filiere_name}

            <Link to={`/eleve/${e.id}/alertes`}>
              <button style={{ marginLeft: '1rem' }}>Alertes</button>
            </Link>

            <Link to={`/eleve/${e.id}/notifications`}>
              <button>Notifications</button>
            </Link>

            <Link to={`/eleve/${e.id}`}>
              <button style={{ marginLeft: '0.5rem' }}>Détails</button>
            </Link>

            <Link to={`/modifier-eleve/${e.id}`}>
              <button style={{ marginLeft: '0.5rem' }}>Modifier</button>
            </Link>

            <button
              onClick={() => handleDelete(e.id)}
              style={{
                marginLeft: '0.5rem',
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
