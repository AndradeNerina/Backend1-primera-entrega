const express = require('express');
const app = express();
const PORT = 8080;

// Middleware para parsear JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar rutas
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

// Rutas principales
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Ruta raíz para verificar el servidor
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});