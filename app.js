const getExchangeRate = async(fromCurrency, toCurrency) => {
  try {
  const response = await axios.get('http://apilayer.net/api/live?access_key=f7f8f871f046d1f58cb73b4c8703baaa&format=1')

  const rate = response.data.rates
  const rupiah = 1 / rate[fromCurrency]
  const exchangeRate = rupiah * rate[toCurrency]

  return exchangeRate
} catch (error) {
  throw new Error(`Unable get currency ${fromCurrency} and ${toCurrency}`)
  }
}

const getCountries = async (currencyCode) => {
  try {
  const response = await axios.get('https://restcountries.eu/rest/v2/currency/{currency}')

  return response.data.map(country => country.name)
} catch (error) {
  throw new Error(`unable to get countries that use ${currencyCode}`)
  }
}


//convert final
const convertCurrency = async (fromCurrency, toCurrency, amount) => {
  const exchangeRate = await getExchangeRate(fromCurrency, toCurrency)
  const countries = await getCountries(toCurrency)
  const convertedAmount = (amount * exchangeRate).toFixed(2)

  return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spend on this following countries: ${countries}`
}

convertCurrency('USD', 'IDR', 20)
  .then((message) => {
    console.log(message)
  }).catch((error) => {
    console.log(error.message)
  })