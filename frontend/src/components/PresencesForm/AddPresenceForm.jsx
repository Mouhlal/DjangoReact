import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEleveDetail, getMatieres, addPresence } from '../../api/api';

export default function AddPresenceForm({ onPresenceAdded = () => {} }) {
  const { id: eleveId } = useParams();
  const navigate = useNavigate();

  const [matieres, setMatieres] = useState([]);
  const [matiereId, setMatiereId] = useState('');
  const [sceance, setSceance]   = useState('');
  const [date, setDate]         = useState('');
  const [present, setPresent]   = useState(false);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    let filiereId;
    getEleveDetail(eleveId)
      .then(res => {
        filiereId = res.data.filiere;
        return getMatieres(filiereId);
      })
      .then(res => setMatieres(res.data))
      .catch(err => console.error('Erreur matières :', err))
      .finally(() => setLoading(false));
  }, [eleveId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      eleve:    parseInt(eleveId, 10),
      matiere_id: parseInt(matiereId, 10),  // clé write-only
      sceance,
      date,
      present
    };

    try {
      await addPresence(payload);
      onPresenceAdded();
      navigate(`/eleve/${eleveId}/presences`);
      alert('Présence ajoutée avec succès !');
    } catch (err) {
      console.error('Erreur ajout présence :', err.response?.data || err.message);
      alert('Impossible d’ajouter la présence.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Chargement des matières…</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter une Présence</h2>

      <label>Matière :</label>
      <select
        value={matiereId}
        onChange={e => setMatiereId(e.target.value)}
        required
      >
        <option value="">-- Sélectionner --</option>
        {matieres.map(m => (
          <option key={m.id} value={m.id}>{m.nom}</option>
        ))}
      </select>

      <label>Séance :</label>
      <input
        type="text"
        value={sceance}
        onChange={e => setSceance(e.target.value.toUpperCase())}
        required
      />

      <label>Date :</label>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
      />

      <label>Présent :</label>
      <input
        type="checkbox"
        checked={present}
        onChange={() => setPresent(p => !p)}
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Enregistrement...' : 'Enregistrer'}
      </button>
    </form>
  );
}
