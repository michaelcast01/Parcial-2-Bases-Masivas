const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres.pocuddbpupdudxscfsez',
  host: 'aws-0-us-east-1.pooler.supabase.com',
  database: 'postgres',
  password: '1234',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error al conectar con Supabase:', err.stack);
  } else {
    console.log('🟢 Conectado exitosamente a Supabase');
    release();
  }
});

module.exports = pool;
