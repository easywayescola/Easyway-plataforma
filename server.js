const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'easyway-secret-2024';

// ─── Conexão com banco ───────────────────────────────────────────────────────
const db = mysql.createPool({
  connectTimeout: 10000,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
});

// ─── Middleware de autenticação ──────────────────────────────────────────────
function auth(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ error: 'Token não fornecido' });
  const token = header.split(' ')[1];
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
}

// ─── Health check ────────────────────────────────────────────────────────────
app.get('/', (req, res) => res.json({ status: 'EasyWay Backend online ✅' }));

// ─── LOGIN ───────────────────────────────────────────────────────────────────
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email e senha obrigatórios' });

  try {
    // Verifica professores
    const [teachers] = await db.query('SELECT * FROM teachers WHERE email = ?', [email]);
    if (teachers.length) {
      const t = teachers[0];
      const ok = await bcrypt.compare(password, t.password_hash);
      if (!ok) return res.status(401).json({ error: 'Senha incorreta' });
      const token = jwt.sign({ id: t.id, type: 'teacher', name: t.name }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, userType: 'teacher', userName: t.name });
    }

    // Verifica alunos
    const [students] = await db.query('SELECT * FROM students WHERE email = ?', [email]);
    if (students.length) {
      const s = students[0];
      const ok = await bcrypt.compare(password, s.password_hash);
      if (!ok) return res.status(401).json({ error: 'Senha incorreta' });
      const token = jwt.sign({ id: s.id, type: 'student', name: s.name }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, userType: 'student', userName: s.name });
    }

    res.status(401).json({ error: 'Usuário não encontrado' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erro interno' });
  }
});

// ─── SUBMISSIONS ─────────────────────────────────────────────────────────────
app.get('/api/activities/submissions', auth, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT s.id, st.name AS student_name, s.lesson, s.score, s.answers, s.submitted_at
      FROM submissions s
      JOIN students st ON st.id = s.student_id
      ORDER BY s.submitted_at DESC
    `);
    const data = rows.map(r => ({
      ...r,
      answers: r.answers ? JSON.parse(r.answers) : {}
    }));
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erro ao buscar submissions' });
  }
});

app.delete('/api/activities/submissions/:id', auth, async (req, res) => {
  try {
    await db.query('DELETE FROM submissions WHERE id = ?', [req.params.id]);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'Erro ao excluir' });
  }
});

// ─── SUMMARY POR LIÇÃO ───────────────────────────────────────────────────────
app.get('/api/activities/summary', auth, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT lesson,
             COUNT(*) AS total,
             ROUND(AVG(score)) AS avg_score,
             MAX(score) AS max_score
      FROM submissions
      GROUP BY lesson
      ORDER BY lesson
    `);
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erro ao buscar resumo' });
  }
});

// ─── ALUNOS ──────────────────────────────────────────────────────────────────
app.get('/api/teachers/:id/students', auth, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, name, email, level, class_name, created_at FROM students WHERE teacher_id = ? ORDER BY name',
      [req.params.id]
    );
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erro ao buscar alunos' });
  }
});

app.post('/api/students/register', auth, async (req, res) => {
  const { name, email, password, teacher_id, level, class_name } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });

  try {
    const [exists] = await db.query('SELECT id FROM students WHERE email = ?', [email]);
    if (exists.length)
      return res.status(400).json({ error: 'Email já cadastrado' });

    const hash = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO students (name, email, password_hash, teacher_id, level, class_name) VALUES (?,?,?,?,?,?)',
      [name, email, hash, teacher_id || 1, level || 'A1', class_name || null]
    );
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erro ao cadastrar aluno' });
  }
});

// ─── SUBMETER ATIVIDADE (aluno) ───────────────────────────────────────────────
app.post('/api/activities/submit', auth, async (req, res) => {
  const { lesson, score, answers } = req.body;
  const student_id = req.user.id;
  try {
    await db.query(
      'INSERT INTO submissions (student_id, lesson, score, answers) VALUES (?,?,?,?)',
      [student_id, lesson, score || 0, JSON.stringify(answers || {})]
    );
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erro ao salvar atividade' });
  }
});

db.getConnection().then(conn => {
  console.log('✅ Conectado ao banco de dados MySQL!');
  conn.release();
}).catch(err => {
  console.error('❌ Erro ao conectar ao banco de dados:', err.message);
});
app.listen(PORT, () => console.log(`✅ EasyWay backend rodando na porta ${PORT}`));
