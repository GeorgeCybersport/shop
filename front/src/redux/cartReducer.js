import { ADD_PRODUCT, REMOVE_PRODUCT, GET_CART, CLEAR_CART } from "./keys";
const initialstate = {
  items: [],
  totalPrice: 0,
};
export default function cartReducer(state = initialstate, action) {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        totalPrice: action.totalPrice,
        items: action.items,
      };
    case ADD_PRODUCT:
      const index = state.items.findIndex((item) => item.id === action.item.id);
      if (index === -1) {
        state.items.push(action.item);
        return {
          ...state,
          totalPrice: action.totalPrice,
        };
      } else {
        state.items[index].itemAmount = action.item.itemAmount;
        return {
          ...state,
          totalPrice: action.totalPrice,
        };
      }
    case REMOVE_PRODUCT:
      const i = state.items.findIndex((item) => item.id === action.item.id);
      if (+state.items[i].itemAmount === 1) {
        state.items.splice(i, 1);
        return {
          ...state,
          totalPrice: action.totalPrice,
        };
      } else {
        state.items[i].itemAmount = action.item.itemAmount;
        return {
          ...state,
          totalPrice: action.totalPrice,
        };
      }
    case CLEAR_CART:
      return {
        items: [],
        totalPrice: 0,
      };
    default:
      return state;
  }
}
