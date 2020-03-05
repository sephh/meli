import numeral from 'numeral'

numeral.register('locale', 'meli', {
  delimiters: {
    thousands: '.',
    decimal: ','
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't'
  },
  ordinal: function(number) {
    return number === 1 ? 'er' : 'ème'
  },
  currency: {
    symbol: '$'
  }
})

numeral.locale('meli')

export default function price(value) {
  return numeral(value).format('0,0[.]00')
}
