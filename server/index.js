// ======================
// 🚗 IMPORTS & CONFIG DE BASE
// ======================
require('dotenv').config();
console.log("🔍 MONGO_URI =", process.env.MONGO_URI);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Pour parser les requêtes JSON

// ======================
// 🔌 CONNEXION MONGODB
// ======================
mongoose.connect(process.env.MONGO_URI)

  .then(() => console.log('✅ Connecté à MongoDB'))
  .catch(err => console.error('❌ Erreur MongoDB:', err));

// ======================
// 📦 MODÈLES (exemple)
// ======================
const Vehicle = mongoose.model('Vehicle', new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  price: Number,
  status: { type: String, default: 'pending' } // pending/approved/sold
}));

// ======================
// 🛣️ ROUTES API
// ======================
// Route test
app.get('/api/hello', (req, res) => {
  res.send('API Showroom Auto fonctionnelle !');
});

// Récupérer tous les véhicules
app.get('/api/vehicles', async (req, res) => {
  const vehicles = await Vehicle.find();
  res.json(vehicles);
});

// Ajouter un véhicule (ex: depuis le formulaire client)
app.post('/api/vehicles', async (req, res) => {
  const newVehicle = new Vehicle(req.body);
  await newVehicle.save();
  res.status(201).json(newVehicle);
});

// ======================
// 🚀 DÉMARRAGE SERVEUR
// ======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Serveur prêt sur http://localhost:${PORT}`);
  console.log(`🔗 Testez : http://localhost:${PORT}/api/hello\n`);
});