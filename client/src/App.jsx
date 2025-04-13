import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/hello')
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(err => setMessage('Erreur de connexion au serveur'));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bienvenue dans Showroom Auto 🚗</h1>
      <p>Message du serveur : <strong>{message}</strong></p>
    </div>
  );
}

export default App;
