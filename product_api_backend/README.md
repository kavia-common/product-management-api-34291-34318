# Product API Backend

Express-based REST API exposing CRUD endpoints for managing products.

- Server port: `process.env.PORT || 3001`
- Base URL: `http://localhost:3001`
- Docs (Swagger UI): `http://localhost:3001/docs`

Seed data:
- `{ "id": 1, "name": "Notebook", "price": 5.99, "quantity": 100 }`
- `{ "id": 2, "name": "Ballpoint Pen", "price": 1.49, "quantity": 250 }`

Install and run:
- npm install
- npm start

Endpoints:
- GET /products
- POST /products
- GET /products/:id
- PUT /products/:id
- DELETE /products/:id

Curl examples:

List products:
curl -s http://localhost:3001/products | jq .

Get product by id:
curl -s http://localhost:3001/products/1 | jq .

Create product:
curl -s -X POST http://localhost:3001/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Marker","price":2.5,"quantity":30}' | jq .

Update product:
curl -s -X PUT http://localhost:3001/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Notebook - Large","price":7.49,"quantity":80}' | jq .

Delete product:
curl -s -X DELETE http://localhost:3001/products/2 -i

Validation notes:
- name: non-empty string
- price: number >= 0
- quantity: integer >= 0

Error responses:
- 400 with details on invalid input
- 404 when product id not found
