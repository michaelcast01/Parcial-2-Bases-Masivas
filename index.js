const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Obtener todos
app.get('/api/restaurantes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM restaurante');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener uno por ID
app.get('/api/restaurantes/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM restaurante WHERE id_rest = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear nuevo restaurante
app.post('/api/restaurantes', async (req, res) => {
  const { nombre, ciudad, direccion, fecha_apertura } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO restaurante (nombre, ciudad, direccion, fecha_apertura) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, ciudad, direccion, fecha_apertura]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar restaurante
app.put('/api/restaurantes/:id', async (req, res) => {
  const { nombre, ciudad, direccion, fecha_apertura } = req.body;
  try {
    const result = await pool.query(
      'UPDATE restaurante SET nombre=$1, ciudad=$2, direccion=$3, fecha_apertura=$4 WHERE id_rest=$5 RETURNING *',
      [nombre, ciudad, direccion, fecha_apertura, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Actualizar un pedido
app.put('/api/pedidos/:id', async (req, res) => {
  const { fecha, id_rest, total } = req.body;
  try {
    const result = await pool.query(
      'UPDATE pedido SET fecha = $1, id_rest = $2, total = $3 WHERE id_pedido = $4 RETURNING *',
      [fecha, id_rest, total, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar restaurante
app.delete('/api/restaurantes/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM restaurante WHERE id_rest = $1', [req.params.id]);
    res.json({ message: 'Restaurante eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Obtener todos los empleados
app.get('/api/empleados', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM empleado');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Obtener un empleado por ID
app.get('/api/empleados/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM empleado WHERE id_empleado = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Crear nuevo empleado
app.post('/api/empleados', async (req, res) => {
  const { nombre, rol, id_rest } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO empleado (nombre, rol, id_rest) VALUES ($1, $2, $3) RETURNING *',
      [nombre, rol, id_rest]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Actualizar empleado
app.put('/api/empleados/:id', async (req, res) => {
  const { nombre, rol, id_rest } = req.body;
  try {
    const result = await pool.query(
      'UPDATE empleado SET nombre = $1, rol = $2, id_rest = $3 WHERE id_empleado = $4 RETURNING *',
      [nombre, rol, id_rest, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Eliminar empleado
app.delete('/api/empleados/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM empleado WHERE id_empleado = $1', [req.params.id]);
    res.json({ message: 'Empleado eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Obtener todos los productos
app.get('/api/productos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM producto');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener un producto por ID
app.get('/api/productos/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM producto WHERE id_prod = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear producto
app.post('/api/productos', async (req, res) => {
  const { nombre, precio } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO producto (nombre, precio) VALUES ($1, $2) RETURNING *',
      [nombre, precio]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar producto
app.put('/api/productos/:id', async (req, res) => {
  const { nombre, precio } = req.body;
  try {
    const result = await pool.query(
      'UPDATE producto SET nombre = $1, precio = $2 WHERE id_prod = $3 RETURNING *',
      [nombre, precio, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar producto
app.delete('/api/productos/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM producto WHERE id_prod = $1', [req.params.id]);
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Obtener todos los pedidos
app.get('/api/pedidos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pedido');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener un pedido por ID
app.get('/api/pedidos/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pedido WHERE id_pedido = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear nuevo pedido
app.post('/api/pedidos', async (req, res) => {
  const { fecha, id_rest, total } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO pedido (fecha, id_rest, total) VALUES ($1, $2, $3) RETURNING *',
      [fecha, id_rest, total]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar pedido
app.delete('/api/pedidos/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM pedido WHERE id_pedido = $1', [req.params.id]);
    res.json({ message: 'Pedido eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Obtener todos los detalles
app.get('/api/detalles', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM detalle_pedido');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener un detalle por ID
app.get('/api/detalles/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM detalle_pedido WHERE id_detalle = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear nuevo detalle
app.post('/api/detalles', async (req, res) => {
  const { id_pedido, id_prod, cantidad, subtotal } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO detalle_pedido (id_pedido, id_prod, cantidad, subtotal) VALUES ($1, $2, $3, $4) RETURNING *',
      [id_pedido, id_prod, cantidad, subtotal]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar detalle
app.put('/api/detalles/:id', async (req, res) => {
  const { id_pedido, id_prod, cantidad, subtotal } = req.body;
  try {
    const result = await pool.query(
      'UPDATE detalle_pedido SET id_pedido = $1, id_prod = $2, cantidad = $3, subtotal = $4 WHERE id_detalle = $5 RETURNING *',
      [id_pedido, id_prod, cantidad, subtotal, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar detalle
app.delete('/api/detalles/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM detalle_pedido WHERE id_detalle = $1', [req.params.id]);
    res.json({ message: 'Detalle eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

process.on('uncaughtException', (err) => {
  console.error('🔥 Error no capturado:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Rechazo no manejado:', reason);
});
// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔥 Servidor activo en http://localhost:${PORT}`);
});