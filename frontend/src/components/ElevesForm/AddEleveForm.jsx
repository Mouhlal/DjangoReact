import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFilieres, getGroupes, addEleve } from '../../api/api';

export default function AddEleveForm({ onAdd }) {
  const navigate = useNavigate();
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [emailParent, setEmailParent] = useState('');
  const [filiereId, setFiliereId] = useState('');
  const [groupeId, setGroupeId] = useState('');
  const [filieres, setFilieres] = useState([]);
  const [groupes, setGroupes] = useState([]);
  const [image, setImage] = useState(null); 

  useEffect(() => {
    getFilieres()
      .then(res => setFilieres(res.data))
      .catch(err => console.error('Erreur filières :', err));
  }, []);

  useEffect(() => {
    if (filiereId) {
      getGroupes(filiereId)
        .then(res => setGroupes(res.data))
        .catch(err => console.error('Erreur groupes :', err));
    } else {
      setGroupes([]);
      setGroupeId(''); 
    }
  }, [filiereId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!filiereId || !groupeId) {
      return alert('Veuillez choisir une filière et un groupe.');
    }

    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('prenom', prenom);
    formData.append('email_parent', emailParent);
    formData.append('filiere', filiereId);
    formData.append('groupe', groupeId);
    if (image) {
      formData.append('image', image);
    }

    try {
      await addEleve(formData);  
      onAdd();
      navigate('/eleves');
    } catch (err) {
      alert(`Eleve ajouté avec succès !`);
      navigate('/eleves');

    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header text-center bg-success">
          <h4 className="mb-0 text-white p-2">Ajouter un Élève</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  value={nom}
                  onChange={e => setNom(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Prénom</label>
                <input
                  type="text"
                  className="form-control"
                  value={prenom}
                  onChange={e => setPrenom(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Email du parent</label>
              <input
                type="email"
                className="form-control"
                value={emailParent}
                onChange={e => setEmailParent(e.target.value)}
                required
              />
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Filière</label>
                <select
                  className="form-select"
                  value={filiereId}
                  onChange={e => setFiliereId(e.target.value)}
                  required
                >
                  <option value="">-- Sélectionner --</option>
                  {filieres.map(f => (
                    <option key={f.id} value={f.id}>{f.filiere}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Groupe</label>
                <select
                  className="form-select"
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
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Photo de l'élève</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={e => setImage(e.target.files[0])}
              />
            </div>

            <div className="text-end">
              <button type="submit" className="btn btn-success">Ajouter l'élève</button>
            </div>
          </form>
          <br />
        </div>
      </div>
    </div>
  );
}
