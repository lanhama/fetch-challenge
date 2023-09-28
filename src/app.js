const express = require('express')
const calc_points = require('./middleware/point_calculator').calc_points;
const validate_input = require('./middleware/validate_input').validate_input;
const app = express()
const port = 3000

const receipts = {}

// parse message body with json express middleware
app.use(express.json());

app.post('/receipts/process', calc_points, validate_input, (req, res) => {
  receipts[res.locals.id] = res.locals.points;
  res.status(200).json({ 'id': res.locals.id });
});

app.get('/receipts/:id/points', (req, res) => {
  myReceiptId = req.params.id;

  if (!(myReceiptId in receipts)) {
    res.status(404).send('receipt not recognized');
  }
  else {
    res.status(200).json({
      'points': receipts[myReceiptId]
    });
  }
});

app.listen(port, () => {
  console.log(`Receipt server listening on port ${port}`)
});
