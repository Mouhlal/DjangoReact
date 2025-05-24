import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaSpinner } from "react-icons/fa";

const fakeDBKey = "schoolUsersDB";

function getUsersFromStorage() {
  const users = localStorage.getItem(fakeDBKey);
  return users ? JSON.parse(users) : [];
}

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const users = getUsersFromStorage();
      const user = users.find(u => u.username === username && u.password === password);

      if (!user) {
        setError("Identifiants incorrects");
        return;
      }

      onLogin(user);
      navigate("/");
    } catch (err) {
      setError("Une erreur est survenue lors de la connexion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-art-container">
      <div className="login-art-card">
        <div className="login-art-header">
          <div className="login-art-logo">
            <span>A</span>bsencia
          </div>
          <h2>Connexion</h2>
          <div className="login-art-decoration">
            <div className="decoration-line"></div>
            <div className="decoration-dot"></div>
            <div className="decoration-line"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-art-form">
          <div className="input-art-group">
            <FaUser className="input-art-icon" />
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input-art-field"
            />
            <div className="input-art-underline"></div>
          </div>

          <div className="input-art-group">
            <FaLock className="input-art-icon" />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-art-field"
            />
            <div className="input-art-underline"></div>
          </div>

          {error && (
            <div className="login-art-error">
              <svg viewBox="0 0 24 24">
                <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
              </svg>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="login-art-button"
          >
            {isLoading ? (
              <>
                <FaSpinner className="spin-animation" />
                Connexion en cours...
              </>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>
{/* 
        <div className="login-art-footer">
          <p>
            Pas encore inscrit ?{" "}
            <span onClick={() => navigate("/register")} className="login-art-link">
              Créer un compte
            </span>
          </p>
        </div>
 */}
        <div className="login-art-particles">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="particle" style={{
              '--delay': `${i * 0.1}s`,
              '--size': `${Math.random() * 5 + 3}px`,
              '--opacity': Math.random() * 0.5 + 0.3,
              '--left': `${Math.random() * 100}%`,
              '--duration': `${Math.random() * 10 + 10}s`
            }}></div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .login-art-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
          overflow: hidden;
          position: relative;
        }

        .login-art-card {
          width: 380px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
          padding: 40px;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        .login-art-header {
          text-align: center;
          margin-bottom: 30px;
          position: relative;
        }

        .login-art-logo {
          font-size: 2.2rem;
          font-weight: 700;
          color: #4f46e5;
          margin-bottom: 5px;
          display: inline-block;
        }

        .login-art-logo span {
          font-size: 2.8rem;
          background: linear-gradient(90deg, #4f46e5, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
          transform: translateY(5px);
        }

        .login-art-header h2 {
          font-size: 1.5rem;
          color: #2d3748;
          margin: 10px 0;
        }

        .login-art-decoration {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 15px;
        }

        .decoration-line {
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #a0aec0, transparent);
        }

        .decoration-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4f46e5;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }

        .login-art-form {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .input-art-group {
          position: relative;
        }

        .input-art-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #a0aec0;
          transition: all 0.3s ease;
        }

        .input-art-field {
          width: 100%;
          padding: 15px 15px 15px 45px;
          font-size: 1rem;
          border: none;
          border-radius: 10px;
          background: #f8fafc;
          transition: all 0.3s ease;
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
        }

        .input-art-field:focus {
          outline: none;
          background: white;
          box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
        }

        .input-art-field:focus + .input-art-underline {
          transform: scaleX(1);
        }

        .input-art-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #4f46e5, #8b5cf6);
          transform: scaleX(0);
          transform-origin: bottom center;
          transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
        }

        .login-art-error {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #ef4444;
          background: #fef2f2;
          padding: 12px 15px;
          border-radius: 8px;
          font-size: 0.9rem;
          animation: shake 0.5s;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }

        .login-art-error svg {
          width: 18px;
          height: 18px;
          fill: currentColor;
        }

        .login-art-button {
          background: linear-gradient(90deg, #4f46e5, #8b5cf6);
          color: white;
          border: none;
          padding: 15px;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
          position: relative;
          overflow: hidden;
        }

        .login-art-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(79, 70, 229, 0.4);
        }

        .login-art-button:active {
          transform: translateY(0);
        }

        .login-art-button::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3));
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .login-art-button:hover::after {
          transform: translateX(100%);
        }

        .spin-animation {
          animation: spin 1s linear infinite;
          margin-right: 8px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .login-art-footer {
          text-align: center;
          margin-top: 25px;
          color: #64748b;
          font-size: 0.9rem;
        }

        .login-art-link {
          color: #4f46e5;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .login-art-link:hover {
          text-decoration: underline;
        }

        .login-art-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: -1;
        }

        .particle {
          position: absolute;
          bottom: -50px;
          background: linear-gradient(90deg, #a5b4fc, #c7d2fe);
          border-radius: 50%;
          animation: rise linear infinite;
          animation-delay: var(--delay);
          animation-duration: var(--duration);
          width: var(--size);
          height: var(--size);
          opacity: var(--opacity);
          left: var(--left);
        }

        @keyframes rise {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: var(--opacity);
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}