import numeral from 'numeral'

numeral.register('locale', 'br', {
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

numeral.locale('br')

export default function price(value) {
  return numeral(value).format('0,0[.]00')
}
