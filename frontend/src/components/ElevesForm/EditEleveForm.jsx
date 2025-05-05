import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEleves, updateEleve, getFilieres, getGroupes } from '../../api/api';

export default function EditEleveForm({ onEdit }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [emailParent, setEmailParent] = useState('');
  const [filiereId, setFiliereId] = useState('');
  const [groupeId, setGroupeId] = useState('');
  const [filieres, setFilieres] = useState([]);
  const [groupes, setGroupes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFilieres()
      .then(res => setFilieres(res.data))
      .catch(err => console.error('Erreur chargement filières :', err));
  }, []);

  useEffect(() => {
    if (!filieres.length) return;
    getEleves(id)
      .then(res => {
        const e = res.data;
        setNom(e.nom);
        setPrenom(e.prenom);
        setEmailParent(e.email_parent);
        setFiliereId(String(e.filiere));
        setGroupeId(String(e.groupe));
      })
      .catch(err => console.error('Erreur chargement élève :', err))
      .finally(() => setLoading(false));
  }, [id, filieres]);

  useEffect(() => {
    if (!filiereId) {
      setGroupes([]);
      return;
    }
    getGroupes(filiereId)
      .then(res => setGroupes(res.data))
      .catch(err => console.error('Erreur chargement groupes :', err));
  }, [filiereId]);

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
      groupe: parseInt(groupeId, 10),
    };

    try {
      await updateEleve(id, payload);
      onEdit?.();
      navigate('/');
    } catch (err) {
      console.error('Erreur modification :', err.response?.data || err.message);
      alert('Échec de la modification');
    }
  };

  if (loading) return <p className="text-center mt-4">Chargement des données…</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0 text-white text-center">Modifier un élève</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nom :</label>
              <input
                type="text"
                className="form-control"
                value={nom}
                onChange={e => setNom(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Prénom :</label>
              <input
                type="text"
                className="form-control"
                value={prenom}
                onChange={e => setPrenom(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email du parent :</label>
              <input
                type="email"
                className="form-control"
                value={emailParent}
                onChange={e => setEmailParent(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Filière :</label>
              <select
                className="form-select"
                value={filiereId}
                onChange={e => setFiliereId(e.target.value)}
                required
              >
                <option value="">-- Sélectionner une filière --</option>
                {filieres.map(f => (
                  <option key={f.id} value={f.id}>{f.filiere}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Groupe :</label>
              <select
                className="form-select"
                value={groupeId}
                onChange={e => setGroupeId(e.target.value)}
                required
                disabled={!groupes.length}
              >
                <option value="">-- Sélectionner un groupe --</option>
                {groupes.map(g => (
                  <option key={g.id} value={g.id}>{g.groupeName}</option>
                ))}
              </select>
            </div>

            <div className="text-end">
              <button type="submit" className="btn btn-success">Enregistrer</button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => navigate('/eleves')}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
