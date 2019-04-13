import * as actionTypes from "./constant";

const initialState = {
  logdin: false,
  username: null,
  password: null,
  userToken: null,
  errorMessage: false,
  lastUpdate: 0,
  light: false,
  count: 0
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNOUT:
      return {...state, logdin: false, username: null, password: null, userToken: null,};
    case actionTypes.TICK:
      return Object.assign({}, state, {
        lastUpdate: action.ts,
        light: !!action.light
      })
    case actionTypes.SERVER_TICK:
      return Object.assign({}, state, {
        lastUpdate: action.ts,
        light: !!action.light
      })
    default:
      return state
  }
};
export default userReducer