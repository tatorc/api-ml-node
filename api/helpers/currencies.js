const currencies = require('../config/currencies')

const getCurrency = (currency) => {
    let res = currencies.find((filter) => filter.id === currency)

    if (typeof res !== 'undefined'){
        res = {
            'decimal_places': 2,
            'description': "Peso argentino",
            'id': "ARS",
            'symbol': "$",
        }
    }
    return res
}

module.exports = {
    getCurrency
}