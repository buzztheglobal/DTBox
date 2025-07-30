5. Add console.log for debugging
🟩 In Backend (Node.js):
You can add logs in any controller, like:

js
Copy
Edit
console.log('[CREATE FORM] Payload:', req.body);
console.log(`[GET] Form ID: ${formId}`);
console.log('[DELETE] Deleting form with ID:', formId);
You can also log SQL results:

js
Copy
Edit
console.log('[DB] Inserted form ID:', formId);
🟦 In Frontend (React):
Use browser console logs like:

js
Copy
Edit
console.log('[Form Submit Payload]', payload);
console.log('[API Response]', data);
console.warn('[Warning] Missing title or questions');
console.error('[Fetch Error]', err);

inspect props in any component:
useEffect(() => {
  console.log('[SurveyBuilder] Loaded props:', props);
}, []);