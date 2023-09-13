const express = require("express");
const cors = require("cors");
const MOCK_DATA = require('./MOCK_DATA.json')
const app = express()
const PORT = 4000;
app.use(express.json())
app.use(
  cors({
    origin: '*',
  })
);
app.post('/', (req, res) => {
  const { length = 10 } = req.body || {}
  res.status(200).json({ data: MOCK_DATA.splice(0, length) })
})
app.listen(PORT, () => console.log(`Server started at ${PORT}`));