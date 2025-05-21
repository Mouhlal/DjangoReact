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
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <h2>Ajouter un Nouvel Élève</h2>
          <p>Remplissez les informations de l'élève</p>
        </div>
        
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="form-body">
          <div className="form-row">
            <div className="form-group">
              <label>Nom</label>
              <input
                type="text"
                value={nom}
                onChange={e => setNom(e.target.value)}
                required
                placeholder="Entrez le nom de famille"
              />
            </div>
            
            <div className="form-group">
              <label>Prénom</label>
              <input
                type="text"
                value={prenom}
                onChange={e => setPrenom(e.target.value)}
                required
                placeholder="Entrez le prénom"
              />
            </div>
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
                {image ? image.name : 'Choisir une image'}
              </label>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit">Ajouter l'élève</button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .form-container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 0 1rem;
        }
        
        .form-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }
        
        .form-header {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: white;
          padding: 1.5rem 2rem;
          text-align: center;
        }
        
        .form-header h2 {
          margin: 0;
          color: white;
          font-size: 1.5rem;
          font-weight: 600;
        }
        
        .form-header p {
          margin: 0.5rem 0 0;
          opacity: 0.9;
          font-size: 0.9rem;
        }
        
        .form-body {
          padding: 2rem;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .form-group {
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
          margin-top: 2rem;
          text-align: right;
        }
        
        .form-actions button {
          padding: 0.8rem 1.5rem;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 5px rgba(79, 70, 229, 0.3);
        }
        
        .form-actions button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(79, 70, 229, 0.4);
        }
        
        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
}