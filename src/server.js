const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

mongoose.connect("mongodb+srv://kubyshkoilya04:FBgwkkP94NP28qlS@cluster0.lxj1jny.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

const skinSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
});

const Skin = mongoose.model('Skin', skinSchema);

app.get('/skins', async (req, res) => {
  const skins = await Skin.find();
  res.json(skins);
});

app.post('/skins', async (req, res) => {
  const newSkin = new Skin(req.body);
  await newSkin.save();
  res.json(newSkin);
});

app.put('/skins/:id', async (req, res) => {
  const updatedSkin = await Skin.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedSkin);
});

app.delete('/skins/:id', async (req, res) => {
  await Skin.findByIdAndDelete(req.params.id);
  res.json({ message: 'Skin deleted' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});