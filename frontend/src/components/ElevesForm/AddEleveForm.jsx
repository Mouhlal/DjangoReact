import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFilieres, getGroupes, addEleve } from '../../api/api';

export default function AddEleveForm({ onAdd }) {
  const navigate = useNavigate();
  const [nom, setNom]               = useState('');
  const [prenom, setPrenom]         = useState('');
  const [emailParent, setEmailParent] = useState('');
  const [filiereId, setFiliereId]   = useState('');
  const [groupeId, setGroupeId]     = useState('');
  const [filieres, setFilieres]     = useState([]);
  const [groupes, setGroupes]       = useState([]);

  // 1) Charger les filières au montage
  useEffect(() => {
    getFilieres()
      .then(res => setFilieres(res.data))
      .catch(err => console.error('Erreur filières :', err));
  }, []);

  // 2) À chaque changement de filière, recharger les groupes associés
  useEffect(() => {
    if (filiereId) {
      getGroupes(filiereId)
        .then(res => setGroupes(res.data))
        .catch(err => console.error('Erreur groupes filtrés :', err));
    } else {
      setGroupes([]);
    }
  }, [filiereId]);

  // 3) Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!filiereId || !groupeId) {
      return alert('Veuillez choisir une filière et un groupe.');
    }

    const payload = {
      nom,
      prenom,
      email_parent: emailParent,
      filiere: parseInt(filiereId, 10),
      groupe:  parseInt(groupeId, 10),
    };

    try {
      await addEleve(payload);
      onAdd();       
      navigate('/'); 
    } catch (err) {
      console.error('Erreur ajout élève :', err.response?.data || err.message);
      navigate('/'); 

    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter un Élève</h2>

      <label>Nom :</label>
      <input
        type="text" value={nom}
        onChange={e => setNom(e.target.value)}
        required
      />

      <label>Prénom :</label>
      <input
        type="text" value={prenom}
        onChange={e => setPrenom(e.target.value)}
        required
      />

      <label>Email du parent :</label>
      <input
        type="email" value={emailParent}
        onChange={e => setEmailParent(e.target.value)}
        required
      />

      <label>Filière :</label>
      <select
        value={filiereId}
        onChange={e => setFiliereId(e.target.value)}
        required
      >
        <option value="">-- Sélectionner --</option>
        {filieres.map(f => (
          <option key={f.id} value={f.id}>{f.filiere}</option>
        ))}
      </select>

      <label>Groupe :</label>
      <select
        value={groupeId}
        onChange={e => setGroupeId(e.target.value)}
        required
        disabled={!groupes.length}
      >
        <option value="">-- Sélectionner --</option>
        {groupes.map(g => (
          <option key={g.id} value={g.id}>{g.groupeName}</option>
        ))}
      </select>

      <button type="submit">Ajouter</button>
    </form>
  );
}
