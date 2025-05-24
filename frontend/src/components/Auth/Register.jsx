import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaUserTie, FaUserGraduate } from "react-icons/fa";

const fakeDBKey = "schoolUsersDB";

function getUsersFromStorage() {
  const users = localStorage.getItem(fakeDBKey);
  return users ? JSON.parse(users) : [];
}

function saveUsersToStorage(users) {
  localStorage.setItem(fakeDBKey, JSON.stringify(users));
}

export default function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "eleve"
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const users = getUsersFromStorage();
      
      if (users.find(u => u.username === formData.username)) {
        setError("Ce nom d'utilisateur est déjà pris");
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        username: formData.username,
        password: formData.password,
        role: formData.role,
        createdAt: new Date().toISOString()
      };

      saveUsersToStorage([...users, newUser]);
      onRegister(newUser);
      navigate("/");
    } catch (err) {
      setError("Une erreur est survenue lors de l'inscription");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Inscription</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="username"
              placeholder="Nom d'utilisateur"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmer le mot de passe"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="role-selection">
            <label>
              <input
                type="radio"
                name="role"
                value="eleve"
                checked={formData.role === "eleve"}
                onChange={handleChange}
              />
              <FaUserGraduate /> Élève
            </label>
            
            <label>
              <input
                type="radio"
                name="role"
                value="user"
                checked={formData.role === "user"}
                onChange={handleChange}
              />
              <FaUserTie /> Enseignant
            </label>
            
            {/* Option admin cachée ou réservée à une inscription spéciale */}
            {process.env.NODE_ENV === 'development' && (
              <label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={formData.role === "admin"}
                  onChange={handleChange}
                />
                <FaUserTie /> Admin (dev only)
              </label>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={isLoading} className="auth-button">
            {isLoading ? "Inscription en cours..." : "S'inscrire"}
          </button>
        </form>

        <div className="auth-footer">
          <p>Déjà un compte ? <span onClick={() => navigate("/login")} className="auth-link">Se connecter</span></p>
        </div>
      </div>
    </div>
  );
}