import { combineReducers } from 'redux';
import loginStatusReducer from './slices/registerSlice';
import CartSliceReducer from './slices/cartSlice';

const rootReducer = combineReducers({
  login_Status: loginStatusReducer,
  addToCart: CartSliceReducer,
});

export default rootReducer;
