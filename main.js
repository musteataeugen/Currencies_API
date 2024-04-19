const KEY = `Q3gEt1tWbANHZKTOjuc09LcIZrkgBm7o`
const endpoint = `	https://api.currencybeacon.com/v1/latest`

let rates = {}
let fromCurrency = document.querySelector('.fromCurrency')
let toCurrency = document.querySelector('.toCurrency')
const inputAmount = document.querySelector('.inputAmount')
const outputAmount = document.querySelector('.outputAmount')


const getCurrencies = (base = 'USD') => {
    // HW8: if/else - get from storage   
    const storageKey = `${new Date().toISOString().split('T')[0]}-${base}`;
    const cache = localStorage.getItem(storageKey);

    if (cache) {
        rates = JSON.parse(cache)
    } else {
        let xhr = new XMLHttpRequest()
        xhr.open("GET", endpoint + `?api_key=${KEY }&base=${base}`)
        xhr.onload = () => {
            let response = xhr.responseText
            let data = JSON.parse(response)

            // console.log(data)
            rates = {
                MDL: data.rates.MDL,
                EUR: data.rates.EUR,
                USD: data.rates.USD
            }
            fromCurrency.innerHTML = `<option value="0">--select currency--</option>`
            toCurrency.innerHTML = `<option value="0">--select currency--</option>`
            Object.keys(rates).forEach(code => {
                let option = document.createElement('option')
                option.innerText = code
                fromCurrency.append(option)
                option = document.createElement('option')
                option.innerText = code
                toCurrency.append(option)
            })

            // HW8: save to storage
            localStorage.setItem(storageKey, JSON.stringify(rates))

            fromCurrency.value = base

        }
        xhr.send()
    }
}

inputAmount.addEventListener('keyup', () => {
    let amount = parseInt(inputAmount.value)
    let resultAmount = amount * rates[toCurrency.value]

    if (amount != '0' && toCurrency.value == '0') {
        alert("Select the currency")

    } else if (amount <= 0)
        alert("Enter a positive number")

    else if (isNaN(inputAmount.value))
        alert('Enter a number')

    else if (fromCurrency != '0' && toCurrency != '0') {
        // HW1: show only integer values------> outputAmount.innerText = resultAmount.toFixed(0)
        // HW2: show only numbers with 2 digits after the comma
        outputAmount.innerText = resultAmount.toFixed(2)

        // HW3: for the situation when toCurrency was not selected
        //      but the user inputs amount -> show message
        // HW4: if the user entered the amount and then selected the
        //      currency calculate -> show result
        // HW5: validate that the amount is a number
        // HW6: make sure the amount is positive
        // HW7*: try to use bootstrap: form,inputs,alerts
        // HW8*: try to use local storage as cache: after you get the currencies
        //       save the using data & base -> key e.g.:
        //       '2024-09-04-USD','2024-09-04-EUR'
    }

})

fromCurrency.addEventListener('change', () => {
    getCurrencies(fromCurrency.value)

})
toCurrency.addEventListener('change', () => {
    let amount = parseInt(inputAmount.value)
    let resultAmount = amount * rates[toCurrency.value]
    outputAmount.innerText = resultAmount.toFixed(2)
})

getCurrencies()