import numeral from 'numeral'

export default function price(value) {
  return numeral(value).format('0,0[.]00')
}
