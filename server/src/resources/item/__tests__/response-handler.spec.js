import ResponseHandler from '../response-handler'

import {
  RAW_DATA as listRawData,
  PARSED_DATA as listParsedData
} from '../__mock__/list-response.mock'

import {
  RAW_DATA as itemRawData,
  PARSED_DATA as itemParsedData
} from '../__mock__/item-response.mock'

describe('ResponseHandler', () => {
  test('should handle list response', () => {
    const responseHandler = new ResponseHandler(listRawData)

    expect(responseHandler.getItems()).toEqual(listParsedData)
  })

  test('should handle item response', () => {
    const responseHandler = new ResponseHandler(itemRawData)

    expect(responseHandler.getItem()).toEqual(itemParsedData)
  })
})
