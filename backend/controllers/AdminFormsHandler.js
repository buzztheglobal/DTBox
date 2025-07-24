const db = require('../db');

const getAllFormsWithResponses = async (req, res) => {
    const userEmail = req.headers.authorization;

    const questionStats = await db.query(`
  SELECT q.id, q.question_text, COUNT(a.id) AS answer_count
  FROM questions q
  LEFT JOIN answers a ON q.id = a.question_id
  WHERE q.form_id = $1
  GROUP BY q.id
`, [form.id]);


    if (!userEmail) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const forms = await db.query(
            `SELECT id, title, type, created_at FROM forms WHERE created_by = $1`,
            [userEmail]
        );

        const formsWithResponses = await Promise.all(
            forms.rows.map(async (form) => {
                const responses = await db.query(
                    `SELECT id, submitted_at FROM responses WHERE form_id = $1`,
                    [form.id]
                );

                const detailed = await Promise.all(
                    responses.rows.map(async (r) => {
                        const answers = await db.query(
                            `SELECT question_id, answer_text FROM answers WHERE response_id = $1`,
                            [r.id]
                        );
                        return {
                            ...r,
                            answers: answers.rows
                        };
                    })
                );

                return {
                    ...form,
                    response_count: detailed.length,
                    responses: detailed,
                    question_stats: questionStats.rows
                };
            })
        );

        res.json(formsWithResponses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllFormsWithResponses };
