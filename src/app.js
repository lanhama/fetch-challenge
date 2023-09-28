const express = require('express')
const calc_points = require('./middleware/point_calculator').calc_points;
const app = express()
const port = 3000

const receipts = {}

// parse json message with express middleware
app.use(express.json());

app.post('/receipts/process', calc_points, (req, res) => {
  receipts[res.locals.id] = res.locals.points;
  res.status(200).json({'id': res.locals.id});
});

app.get('/receipts/:id/points', (req, res) => {
  myReceiptId = req.params.id;

  if (!(myReceiptId in receipts))
  {
    res.sendStatus(404);
  }
  else
  {
    res.status(200).json({
      'points': receipts[myReceiptId]
    });
  }
});

app.listen(port, () => {
  console.log(`Receipt server listening on port ${port}`)
});
