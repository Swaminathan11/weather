const request = require('request')

const forecast = (latitude, longitude, callback) => {

     const url  = 'http://api.weatherstack.com/current?access_key=f5653990ea8d8ba0c72dc3a7978b9810&query=' + latitude + ',' + longitude


    request( {url: url, json:true}, (error, response) => {

        if(error){
            callback("Unable to connect to the weather service", undefined)
        }
        else if (response.body.error){
            callback("Unable to find location", undefined)
        }
            
        else {
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is " + response.body.current.temperature + " degree celsius. It might have " + response.body.current.precip + "mm of rain.")
        }
                
})
}

module.exports = forecast