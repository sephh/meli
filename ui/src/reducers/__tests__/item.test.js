import item from '../item'
import { ITEM_REDUCER_STATE } from '../../../__mock__/reducers.mock'

describe('item reducer', () => {
  test('reducers', () => {
    let state;
    state = item.reducer(ITEM_REDUCER_STATE, {});
    expect(state).toEqual(ITEM_REDUCER_STATE);
  });
})
