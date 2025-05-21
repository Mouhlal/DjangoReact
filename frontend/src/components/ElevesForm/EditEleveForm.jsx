import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEleves, updateEleve, getFilieres, getGroupes, getEleve } from '../../api/api';

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
  const [image, setImage] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFilieres()
      .then(res => setFilieres(res.data))
      .catch(err => console.error('Erreur chargement filières :', err));
  }, []);

  useEffect(() => {
    if (!filieres.length) return;
    getEleve(id)
      .then(res => {
        const e = res.data;
        console.log("Données élève reçues :", res.data);
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
      await updateEleve(id, formData);  
      onEdit?.();
      navigate('/eleves');
    } catch (err) {
      console.error('Erreur modification :', err.response?.data || err.message);
      alert('Échec de la modification');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement des données...</p>
      </div>
    );
  }

  return (
    <div className="edit-eleve-container">
      <div className="edit-eleve-card">
        <div className="edit-eleve-header">
          <h2>Modifier l'élève</h2>
          <p>Mettez à jour les informations de l'élève</p>
        </div>
        
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="edit-eleve-form">
          <div className="form-group">
            <label>Nom</label>
            <input
              type="text"
              value={nom}
              onChange={e => setNom(e.target.value)}
              required
              placeholder="Nom de famille"
            />
          </div>
          
          <div className="form-group">
            <label>Prénom</label>
            <input
              type="text"
              value={prenom}
              onChange={e => setPrenom(e.target.value)}
              required
              placeholder="Prénom"
            />
          </div>
          
          <div className="form-group">
            <label>Email du parent</label>
            <input
              type="email"
              value={emailParent}
              onChange={e => setEmailParent(e.target.value)}
              required
              placeholder="email@parent.com"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Filière</label>
              <select
                value={filiereId}
                onChange={e => setFiliereId(e.target.value)}
                required
              >
                <option value="">Sélectionnez une filière</option>
                {filieres.map(f => (
                  <option key={f.id} value={f.id}>{f.filiere}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Groupe</label>
              <select
                value={groupeId}
                onChange={e => setGroupeId(e.target.value)}
                required
                disabled={!groupes.length}
              >
                <option value="">Sélectionnez un groupe</option>
                {groupes.map(g => (
                  <option key={g.id} value={g.id}>{g.groupeName}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Photo de l'élève</label>
            <div className="file-upload">
              <label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setImage(e.target.files[0])}
                />
                {image ? image.name : 'Choisir une nouvelle image (optionnel)'}
              </label>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn-save">Enregistrer</button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate('/eleves')}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .edit-eleve-container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 0 1rem;
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 200px;
        }
        
        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid #f3f3f3;
          border-top: 5px solid #4f46e5;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .edit-eleve-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }
        
        .edit-eleve-header {
          background: linear-gradient(135deg, #4f46e5,rgb(185, 58, 185));
          color: black;
          padding: 1.5rem 2rem;
          text-align: center;
        }
        
        .edit-eleve-header h2 {
          margin: 0;
          color: white;
          font-size: 1.5rem;
          font-weight: 600;
        }
        
        .edit-eleve-header p {
          margin: 0.5rem 0 0;
          opacity: 0.9;
          font-size: 0.9rem;
        }
        
        .edit-eleve-form {
          padding: 2rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #374151;
          font-size: 0.9rem;
        }
        
        input, select {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          background-color: #f9fafb;
        }
        
        input:focus, select:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
          background-color: white;
        }
        
        .file-upload {
          margin-top: 0.5rem;
        }
        
        .file-upload label {
          display: block;
          padding: 0.75rem 1rem;
          border: 1px dashed #d1d5db;
          border-radius: 8px;
          background-color: #f9fafb;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .file-upload label:hover {
          border-color: #4f46e5;
          background-color: #f0f1ff;
        }
        
        .file-upload input[type="file"] {
          display: none;
        }
        
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 2rem;
        }
        
        .btn-save, .btn-cancel {
          padding: 0.8rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .btn-save {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: white;
          box-shadow: 0 2px 5px rgba(79, 70, 229, 0.3);
        }
        
        .btn-save:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(79, 70, 229, 0.4);
        }
        
        .btn-cancel {
          background: #f1f5f9;
          color: #64748b;
        }
        
        .btn-cancel:hover {
          background: #e2e8f0;
          transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .form-actions {
            flex-direction: column;
          }
          
          .btn-save, .btn-cancel {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}