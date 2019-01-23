import Axios from "axios";

const getExchangeRate = async(fromCurrency, toCurrency) => {
  const response = await axios.get('http://apilayer.net/api/live?access_key=f7f8f871f046d1f58cb73b4c8703baaa&format=1')

  const rate = response.data.rates
  const rupiah = 1 / rate[fromCurrency]
  const exchangeRate = rupiah * rate[toCurrency]

  return exchangeRate
}

