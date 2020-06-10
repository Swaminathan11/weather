const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./util/geocode')
const forecast = require('./util/forecast')
const app = express()
const port = process.env.PORT || 3000
const pub = path.join(__dirname,'../public')
const viewname = path.join(__dirname,'../templates/views')
const part = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewname)
hbs.registerPartials(part)
app.use(express.static(pub))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather Forecast'
  })
})
app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send("Provide an address")
  }
  geocode(req.query.address, (error, data) => {
    if(error) {
      return res.send({error})
    }
    forecast(data.lat, data.lon, (error, forecastdata) => {
      if(error) {
        return res.send({error})
      }
      res.send({
        forecast : forecastdata,
        location : data.loc,
        address: req.query.address
      })
    })
  })
})
app.get('*', (req, res) => {
  res.send('My 404 page')
})
app.listen(port, () => {
    console.log('Server is on a port 3000')
})