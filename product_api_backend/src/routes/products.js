const express = require('express');
const validateProduct = require('../middleware/validateProduct');

const router = express.Router();

/**
 * Simple in-memory store with seed data.
 * Each product: { id: number, name: string, price: number, quantity: number }
 */
let products = [
  { id: 1, name: 'Notebook', price: 5.99, quantity: 100 },
  { id: 2, name: 'Ballpoint Pen', price: 1.49, quantity: 250 },
];

// PUBLIC_INTERFACE
function getProductsStore() {
  /** Returns the current in-memory products store (for debugging/testing). */
  return products;
}

// Utility to generate next id
const getNextId = () => (products.length ? Math.max(...products.map(p => p.id)) + 1 : 1);

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('/', (req, res) => {
  return res.status(200).json(products);
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: Invalid input
 */
router.post('/', validateProduct, (req, res) => {
  const { name, price, quantity } = req.body;

  const newProduct = {
    id: getNextId(),
    name,
    price,
    quantity,
  };
  products.push(newProduct);
  return res.status(201).json(newProduct);
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The product
 *       404:
 *         description: Product not found
 */
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Invalid id parameter. Must be an integer.' });
  }
  const product = products.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({ error: `Product with id ${id} not found.` });
  }
  return res.status(200).json(product);
});

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Updated product
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Product not found
 */
router.put('/:id', validateProduct, (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Invalid id parameter. Must be an integer.' });
  }
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: `Product with id ${id} not found.` });
  }
  const { name, price, quantity } = req.body;
  const updated = { id, name, price, quantity };
  products[idx] = updated;
  return res.status(200).json(updated);
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 */
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Invalid id parameter. Must be an integer.' });
  }
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: `Product with id ${id} not found.` });
  }
  products.splice(idx, 1);
  return res.status(204).send();
});

module.exports = router;
module.exports.getProductsStore = getProductsStore;
