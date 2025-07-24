// File: backend/routes/forms.js
const express = require('express');
const router = express.Router();

const {
  getFormById,
  getFormBySlug,
  createForm,
  updateForm,
  deleteForm,
  submitResponse,
  getFormResponses // ✅ include this
} = require('../controllers/FormHandler');

const {
  getAllFormsWithResponses
} = require('../controllers/AdminFormsHandler'); // optional analytics

// Public endpoints
// Public + Admin APIs
router.get('/:formId', getFormById);
router.get('/slug/:slug', getFormBySlug);
router.get('/:formId/responses', getFormResponses); // ✅ error was here
router.post('/create', createForm);
router.put('/update/:formId', updateForm);
router.delete('/delete/:formId', deleteForm);
router.post('/submit-response', submitResponse);
router.get('/admin/forms', getAllFormsWithResponses);

module.exports = router;
