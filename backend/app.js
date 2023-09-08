const express = require('express')
var cors = require('cors')

const app = express()
const port = 3000
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/cities", (req,res) => {
    const cities = [
        {
            id: 1,
            name: "New York",
        },
        {
            id: 2,
            name: "Berlin",
        },
        {
        id: 3,
        name: "London",
        },
        {
          id: 3,
          name: "Dhaka",
          }
    ];
  
    res.json(cities);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})