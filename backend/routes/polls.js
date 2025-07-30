// File: /backend/routes/polls.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const { Parser } = require('json2csv');
// const exportPollToSheet = require('../utils/googleSheetsExporter');
const admin = require('firebase-admin');

// Create poll
router.post('/', async (req, res) => {
  const { title, question, options, is_anonymous, is_visible, created_by_id } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO polls (title, question, options, is_anonymous, is_visible, created_by_id)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, question, options, is_anonymous, is_visible, created_by_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Poll insert failed:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get all polls
router.get('/', async (req, res) => {
  try {
    const showPublicOnly = req.query.public === 'true';
    const query = showPublicOnly
      ? `SELECT * FROM polls WHERE is_visible_to_public = TRUE AND is_deleted = FALSE ORDER BY created_at DESC`
      : `SELECT * FROM polls WHERE is_deleted = FALSE ORDER BY created_at DESC`;
    const result = await db.query(query);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get poll by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM polls WHERE id = $1 AND is_deleted = FALSE`, [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Poll not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit response
router.post('/:id/responses', async (req, res) => {
  const { selected_option } = req.body;
  const pollId = req.params.id;
  try {
    await db.query(
      `INSERT INTO poll_responses (poll_id, selected_option, submitted_at)
       VALUES ($1, $2, NOW())`,
      [pollId, selected_option]
    );

    try {
      await admin.messaging().send({
        topic: `poll_${pollId}`,
        notification: {
          title: '🗳️ New Vote Received',
          body: `Someone just voted on poll #${pollId}`
        }
      });
    } catch (firebaseErr) {
      console.warn("⚠️ Firebase notification failed:", firebaseErr.message);
    }

    res.status(201).json({ success: true, message: "Vote recorded" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Aggregate results
router.get('/:id/results', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT selected_option, COUNT(*) as votes
       FROM poll_responses
       WHERE poll_id = $1
       GROUP BY selected_option`,
      [req.params.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Export as CSV
router.get('/:id/export', async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM poll_responses WHERE poll_id = $1`, [req.params.id]);
    const parser = new Parser();
    const csv = parser.parse(result.rows);
    res.header('Content-Type', 'text/csv');
    res.attachment(`poll_${req.params.id}_responses.csv`);
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Export to Google Sheets
// router.get('/:id/export-google', async (req, res) => {
//   try {
//     const result = await db.query(
//       `SELECT selected_option, submitted_at FROM poll_responses WHERE poll_id = $1`,
//       [req.params.id]
//     );
//     const sheetUrl = await exportPollToSheet(req.params.id, result.rows);
//     res.json({ url: sheetUrl });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Soft delete
router.delete('/:id', async (req, res) => {
  try {
    await db.query(`UPDATE polls SET is_deleted = TRUE WHERE id = $1`, [req.params.id]);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
