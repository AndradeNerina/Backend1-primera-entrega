const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/products.json');

// Función para leer productos desde el archivo JSON
const readProducts = () => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
};

// 1. GET - Listar todos los productos
router.get('/', (req, res) => {
    const products = readProducts();
    res.json(products);
});

// 2. GET - Obtener un producto por ID
router.get('/:pid', (req, res) => {
    const products = readProducts();
    const product = products.find(p => p.id == req.params.pid);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

module.exports = router;