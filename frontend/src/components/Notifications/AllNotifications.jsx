import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AllNotifications() {
  const [notifications, setNotifications] = useState([]);

  const url = 'http://localhost:8000/api/notifications/';

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(url);
      setNotifications(response.data);
    } catch (error) {
      console.error('Erreur récupération notifications :', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette notification ?')) return;

    try {
      await axios.delete(`${url}${id}/`);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (error) {
      console.error('Erreur suppression notification :', error);
      alert('Impossible de supprimer la notification.');
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div>
      <h1>Notifications</h1>

      {notifications.length === 0 ? (
        <p>Aucune notification.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Message</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((n) => (
              <tr key={n.id}>
                <td>{n.id}</td>
                <td>{n.message}</td>
                <td>{new Date(n.date).toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(n.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
