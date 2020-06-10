
const weat = document.querySelector('form')
const search = document.querySelector('input')
const msg = document.querySelector('#msg1')


weat.addEventListener('submit',(e) => {
    e.preventDefault()

    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            msg1.textContent = data.error
        }else {
            msg1.textContent = data.location
            msg2.textContent = data.forecast
        }
    })
})

})