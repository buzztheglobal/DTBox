//  C:\Users\gupta\Documents\DailyToolbox\backend\index.js
const express = require('express');
const cors = require('cors');
const formsRouter = require('./routes/forms');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/forms', formsRouter);

app.get('/', (req, res) => {
  res.send('Survey API running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//  C:\Users\gupta\Documents\DailyToolbox\backend\index.js