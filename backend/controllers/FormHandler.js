// File: backend/controllers/FormHandler.js
// File: backend/controllers/FormHandler.js
// File: backend/controllers/FormHandler.js
const pool = require('../db');

const generateSlug = (title) => {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // non-alphanumeric to dashes
    .replace(/^-+|-+$/g, '');
  return `${slug}-${Date.now()}`;
};

const getFormResponses = async (req, res) => {
  const { formId } = req.params;

  try {
    const responsesRes = await pool.query(`
      SELECT r.id as response_id, r.submitted_at, q.id as question_id, q.question_text, ra.answer_text
      FROM responses r
      JOIN response_answers ra ON r.id = ra.response_id
      JOIN questions q ON ra.question_id = q.id
      WHERE r.form_id = $1
      ORDER BY r.submitted_at DESC, q.id ASC
    `, [formId]);

    const grouped = {};
    for (const row of responsesRes.rows) {
      if (!grouped[row.response_id]) {
        grouped[row.response_id] = {
          submitted_at: row.submitted_at,
          answers: []
        };
      }
      grouped[row.response_id].answers.push({
        question_id: row.question_id,
        question_text: row.question_text,
        answer: row.answer_text
      });
    }

    res.json(grouped);
  } catch (err) {
    console.error('❌ getFormResponses error:', err.message);
    res.status(500).json({ error: 'Failed to fetch responses' });
  }
};

// GET /api/forms/:formId
const getFormById = async (req, res) => {
  const { formId } = req.params;
  try {
    const formRes = await pool.query('SELECT * FROM forms WHERE id = $1', [formId]);
    if (formRes.rowCount === 0) return res.status(404).json({ error: 'Form not found' });
    const form = formRes.rows[0];

    const questionsRes = await pool.query(
      'SELECT * FROM questions WHERE form_id = $1 ORDER BY id ASC',
      [formId]
    );

    const questions = await Promise.all(
      questionsRes.rows.map(async (q) => {
        let options = [];
        if (['multiple_choice', 'dropdown'].includes(q.question_type)) {
          const optRes = await pool.query(
            'SELECT option_text FROM question_options WHERE question_id = $1',
            [q.id]
          );
          options = optRes.rows.map((o) => o.option_text);
        }

        return { ...q, options };
      })
    );

    res.json({ ...form, questions });
  } catch (err) {
    console.error('❌ getFormById error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /api/forms/slug/:slug
const getFormBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const formRes = await pool.query('SELECT * FROM forms WHERE slug = $1', [slug]);
    if (formRes.rowCount === 0) return res.status(404).json({ error: 'Form not found' });
    const form = formRes.rows[0];

    const questionsRes = await pool.query(
      'SELECT * FROM questions WHERE form_id = $1 ORDER BY id ASC',
      [form.id]
    );

    const questions = await Promise.all(
      questionsRes.rows.map(async (q) => {
        let options = [];
        if (['multiple_choice', 'dropdown'].includes(q.question_type)) {
          const optRes = await pool.query(
            'SELECT option_text FROM question_options WHERE question_id = $1',
            [q.id]
          );
          options = optRes.rows.map((o) => o.option_text);
        }

        return { ...q, options };
      })
    );

    res.json({ ...form, questions });
  } catch (err) {
    console.error('❌ getFormBySlug error:', err);
    res.status(500).json({ error: 'Internal error' });
  }
};

// POST /api/forms/create
const createForm = async (req, res) => {
  const client = await pool.connect();
  try {
    const { title, description, type, created_by, questions } = req.body;
    const slug = generateSlug(title);
    await client.query('BEGIN');

    const formRes = await client.query(
      `INSERT INTO forms (title, description, type, created_by, slug)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, slug`,
      [title, description, type, created_by, slug]
    );

    const formId = formRes.rows[0].id;

    for (const q of questions) {
      const questionRes = await client.query(
        `INSERT INTO questions (form_id, question_text, question_type, is_required)
         VALUES ($1, $2, $3, $4) RETURNING id`,
        [formId, q.question_text, q.question_type, q.is_required]
      );

      const questionId = questionRes.rows[0].id;

      if (q.options?.length > 0) {
        for (const option of q.options) {
          await client.query(
            `INSERT INTO question_options (question_id, option_text) VALUES ($1, $2)`,
            [questionId, option]
          );
        }
      }
    }

    await client.query('COMMIT');
    console.log(`✅ Form created with ID ${formId} and slug ${slug}`);
    res.status(201).json({ formId, slug });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ createForm error:', err.message);
    res.status(500).json({ error: 'Failed to create form' });
  } finally {
    client.release();
  }
};

// PUT /api/forms/update/:formId
const updateForm = async (req, res) => {
  const { formId } = req.params;
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      `UPDATE forms SET title = $1, description = $2 WHERE id = $3 RETURNING *`,
      [title, description, formId]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Form not found' });
    res.json({ success: true, updatedForm: result.rows[0] });
  } catch (err) {
    console.error('❌ updateForm error:', err.message);
    res.status(500).json({ error: 'Update failed' });
  }
};

// DELETE /api/forms/delete/:formId
const deleteForm = async (req, res) => {
  const { formId } = req.params;
  try {
    const result = await pool.query('DELETE FROM forms WHERE id = $1 RETURNING *', [formId]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Form not found' });
    console.log(`🗑️ Deleted form ID ${formId}`);
    res.json({ success: true, deletedForm: result.rows[0] });
  } catch (err) {
    console.error('❌ deleteForm error:', err.message);
    res.status(500).json({ error: 'Failed to delete form' });
  }
};

// POST /api/forms/submit-response
const submitResponse = async (req, res) => {
  const client = await pool.connect();
  try {
    const { form_id, answers } = req.body;
    await client.query('BEGIN');

    const responseRes = await client.query(
      `INSERT INTO responses (form_id, submitted_at) VALUES ($1, NOW()) RETURNING id`,
      [form_id]
    );

    const responseId = responseRes.rows[0].id;

    for (const ans of answers) {
      await client.query(
        `INSERT INTO response_answers (response_id, question_id, answer_text)
         VALUES ($1, $2, $3)`,
        [responseId, ans.question_id, ans.answer_text]
      );
    }

    await client.query('COMMIT');
    console.log(`📥 Response recorded for form ID ${form_id}`);
    res.json({ success: true });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ submitResponse error:', err.message);
    res.status(500).json({ error: 'Failed to submit response' });
  } finally {
    client.release();
  }
};

module.exports = {
  getFormById,
  getFormBySlug,
  createForm,
  updateForm,
  deleteForm,
  submitResponse,
  getFormResponses // ✅ add this to export list
};

//C:\Users\gupta\Documents\DailyToolbox\backend\controllers\FormHandler.js