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
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
       <Link to="/ajouter-eleve" className="btn btn-primary">Ajouter un élève</Link>
      </div>

      <div className="mb-3">
        <Link to="/presences" className="btn btn-secondary me-2">Toutes les Présences</Link>
        <Link to="/notifications" className="btn btn-secondary me-2">Toutes les Notifications</Link>
        <Link to="/alertes" className="btn btn-secondary">Toutes les Alertes</Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle table-hover">
        <thead className="table-dark">
  <tr>
    <th>#</th>
    <th>Photo</th> 
    <th>Nom</th>
    <th>Prénom</th>
    <th>Groupe</th>
    <th>Filière</th>
    <th className="text-center">Actions</th>
  </tr>
</thead>
<tbody>
  {eleves.map(e => (
    <tr key={e.id}>
      <td>{e.id}</td>
     <td>
  {e.image ? (
    <img src={e.image} alt={`${e.nom} ${e.prenom}`} style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px'}} />
  ) : '—'}
</td>
      <td>{e.nom}</td>
      <td>{e.prenom}</td>
      <td>{e.groupe_name}</td>
      <td>{e.filiere_name}</td>
      <td className="text-center">
        <Link to={`/eleve/${e.id}/alertes`} className="btn btn-warning btn-sm me-1">Alertes</Link>
        <Link to={`/eleve/${e.id}/notifications`} className="btn btn-info btn-sm me-1 text-white">Notifications</Link>
        <Link to={`/eleve/${e.id}`} className="btn btn-primary btn-sm me-1">Détails</Link>
        <Link to={`/modifier-eleve/${e.id}`} className="btn btn-success btn-sm me-1">Modifier</Link>
        <button onClick={() => handleDelete(e.id)} className="btn btn-danger btn-sm">
          Supprimer
        </button>
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </div>
  );
}
