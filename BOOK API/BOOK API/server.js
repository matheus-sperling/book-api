const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookdb_v1';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Conectado ao MongoDB');
    console.log(`Database: ${MONGODB_URI}`);
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  });

// Start server
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Base URL: http://localhost:${PORT}/bookapi/v1`);
  console.log('Pressione Ctrl+C para parar o servidor');
});