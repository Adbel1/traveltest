const express =  require("express");
const app = express();
const BodyParse = require("body-parser");
const fs = require('fs');

const PORT = process.env.PORT || 3977;

app.use(express.json());

app.use(BodyParse.urlencoded({ extended: true }));
app.use(BodyParse.json());


app.get('/', (req, res) => {
  // Cargar la base de datos JSON (db.json)
  const data = JSON.parse(fs.readFileSync('db.json', 'utf-8'));

  // Acceder al array de usuarios dentro del objeto "login"
  const users = data.login;

  // Retornar la lista de usuarios como respuesta
  res.status(200).json(users);
});


app.post('/login', (req, res) => {
  const { email, pin } = req.body;

  // Cargar la base de datos JSON (db.json)
  const data = JSON.parse(fs.readFileSync('db.json', 'utf-8'));

  // Acceder al array de usuarios dentro del objeto "login"
  const users = data.login;

  // Realizar una búsqueda para encontrar un usuario con las credenciales coincidentes
  const user = users.find(user => user.email === email && user.pin === pin);

  if (user) {
    const token = 'token_de_autenticacion'; // Genera un token válido
    return res.status(200).json({ message: 'Autenticación exitosa', token });
  } else {
    return res.status(401).json({ error: 'Nombre de usuario o contraseña incorrectos.' });
  }
});


app.listen(PORT, () => {
    console.log(`Tu server esta listo en el puerto ${PORT}`); 
});