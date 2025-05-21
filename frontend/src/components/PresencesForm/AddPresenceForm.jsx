import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEleveDetail, getMatieres, addPresence } from '../../api/api';
import Swal from 'sweetalert2';

export default function AddPresenceForm({ onPresenceAdded = () => {} }) {
  const { id: eleveId } = useParams();
  const navigate = useNavigate();

  const [matieres, setMatieres] = useState([]);
  const [matiereId, setMatiereId] = useState('');
  const [sceance, setSceance] = useState('');
  const [date, setDate] = useState('');
  const [present, setPresent] = useState(false);
  const [loading, setLoading] = useState(true);

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
      eleve_id: parseInt(eleveId, 10),  
      matiere_id: parseInt(matiereId, 10),
      sceance,
      date,
      present
    };
    

    try {
      await addPresence(payload);
      onPresenceAdded();
      navigate(`/eleve/${eleveId}/presences`);
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Présence ajoutée avec succès !',
        confirmButtonColor: '#4f46e5'
      });
    } catch (err) {
      console.error('Erreur ajout présence :', err.response?.data || err.message);
     
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement des matières...</p>
      </div>
    );
  }

  return (
    <div className="presence-form-container">
      <div className="presence-form-card">
        <div className="presence-form-header">
          <h2>Ajouter une Présence</h2>
          <p>Enregistrez la présence d'un élève</p>
        </div>

        <form onSubmit={handleSubmit} className="presence-form">
          <div className="form-group">
            <label>Matière</label>
            <select
              value={matiereId}
              onChange={e => setMatiereId(e.target.value)}
              required
            >
              <option value="">Sélectionnez une matière</option>
              {matieres.map(m => (
                <option key={m.id} value={m.id}>{m.nom}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Séance</label>
            <input
              type="text"
              value={sceance}
              onChange={e => setSceance(e.target.value.toUpperCase())}
              required
              placeholder="Ex: S1, S2, etc."
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              id="present-checkbox"
              checked={present}
              onChange={() => setPresent(p => !p)}
            />
            <label htmlFor="present-checkbox">Présent</label>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-btn"></span>
                Enregistrement...
              </>
            ) : 'Enregistrer'}
          </button>
        </form>
      </div>

      <style jsx>{`
        .presence-form-container {
          max-width: 600px;
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
        
        .presence-form-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }
        
        .presence-form-header {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: white;
          padding: 1.5rem 2rem;
          text-align: center;
        }
        
        .presence-form-header h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 600;
        }
        
        .presence-form-header p {
          margin: 0.5rem 0 0;
          opacity: 0.9;
          font-size: 0.9rem;
        }
        
        .presence-form {
          padding: 2rem;
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
        
        .form-checkbox {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .form-checkbox input {
          width: auto;
          margin-right: 0.5rem;
        }
        
        .form-checkbox label {
          margin-bottom: 0;
          cursor: pointer;
        }
        
        .submit-btn {
          width: 100%;
          padding: 0.8rem 1.5rem;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(79, 70, 229, 0.4);
        }
        
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .spinner-btn {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}