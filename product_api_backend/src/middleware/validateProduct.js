 // PUBLIC_INTERFACE
function validateProduct(req, res, next) {
  /**
   * Validate product payload.
   * Required fields:
   * - name: string (non-empty)
   * - price: number (finite, >= 0)
   * - quantity: integer (>= 0)
   */
  const errors = [];

  const { name, price, quantity } = req.body || {};

  if (typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Field "name" must be a non-empty string.');
  }

  if (typeof price !== 'number' || !Number.isFinite(price)) {
    errors.push('Field "price" must be a valid number.');
  } else if (price < 0) {
    errors.push('Field "price" must be >= 0.');
  }

  if (typeof quantity !== 'number' || !Number.isInteger(quantity)) {
    errors.push('Field "quantity" must be an integer.');
  } else if (quantity < 0) {
    errors.push('Field "quantity" must be >= 0.');
  }

  if (errors.length) {
    return res.status(400).json({
      error: 'Invalid request body',
      details: errors,
    });
  }

  // Coerce trimmed name
  req.body.name = name.trim();

  return next();
}

module.exports = validateProduct;
