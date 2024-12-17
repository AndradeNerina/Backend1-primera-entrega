const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/carts.json');

// Función para leer carritos desde el archivo JSON
const readCarts = () => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
};

//Funcion para escribir carritos
const writeCarts = (carts) => {
    fs.writeFileSync(filePath, JSON.stringify(carts, null, 2))
};

// GET - Listar todos los carritos
router.get('/', (req, res) => {
    const carts = readCarts();
    res.json(carts);
});

// POST - Crear un nuevo carrito
router.post('/', (req, res) => {
    const carts = readCarts();
    const newCart = {
        id: carts.length + 1, 
        products: []
    };
    carts.push(newCart);
    writeCarts(carts);
    res.status(201).json(newCart);
});
    


// DELETE - Eliminar un carrito por ID
router.delete('/:cid', (req, res) => {
    let carts = readCarts();
    const cartId = parseInt(req.params.cid); // Convierte el ID a número
    const cartIndex = carts.findIndex(c => c.id === cartId); // Encuentra el índice del carrito

    if (cartIndex !== -1) { // Si el carrito existe
        carts.splice(cartIndex, 1); // Elimina el carrito
        writeCarts(carts); // Escribe los cambios en el archivo
        res.status(200).send(`Carrito con ID ${cartId} eliminado`); // Respuesta de éxito
    } else {
        res.status(404).send('Carrito no encontrado'); // Respuesta si no se encuentra el carrito
    }
});

module.exports = router;