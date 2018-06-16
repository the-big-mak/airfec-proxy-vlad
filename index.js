const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');

const port = process.env.PORT || 3000;

app.use('/rooms/:id', express.static(path.join(__dirname, './public')));

app.get('/Photos/:id/', (req, res) => {
  res.redirect(`http://localhost:3003/Photos/${req.params.id}`)
})
app.get('/reservations/:id/', (req, res) => {
  res.redirect(`http://localhost:3004/reservations/${req.params.id}`)
})
app.get('/reviews', (req, res) => {
  axios.get('http://localhost:3001/reviews', {
    params: {
      ID: req.query.ID,
    }
  })
    .then((response) => res.send(response.data))
    .catch(error => console.error('no response in proxy', error))
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});