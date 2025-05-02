import React, { useEffect, useState } from 'react';
import { getEleves, deleteEleve } from '../api/api';
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
      console.error('Erreur suppression élève :', err.response?.data || err.message);
      alert('Impossible de supprimer cet élève.');
    }
  };

  return (
    <div>
      <h2>Liste des élèves</h2>
      
      <Link to="/ajouter-eleve">
        <button>Ajouter un élève</button>
      </Link>

      <ul>
        {eleves.map(e => (
          <li key={e.id} style={{ marginBottom: '0.5rem' }}>
            {e.nom} {e.prenom}
            <button
              onClick={() => handleDelete(e.id)}
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
