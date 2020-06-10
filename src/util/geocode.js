const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic3dhbWluYXRoYW5zNDUiLCJhIjoiY2themNsZWczMGNnZjJzbnN0ZGZ1enplNiJ9.fsHxGyIf_ogcl4SoTLtAVw&limit=1'
    request({ url: url, json: true}, (error, response) => {
      if (error)
      {
        callback('Unable to conect to location services', undefined)
      }
      else if (response.body.features.length === 0) {
        callback( 'Unable to find location, Try another location', undefined)
      }
      else {
        callback(undefined, {
          lat: response.body.features[0].center[1],
          lon: response.body.features[0].center[0],
          loc: response.body.features[0].place_name
        })
      } 
    })
  }

  module.exports = geocode
  