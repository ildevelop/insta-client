import * as actionTypes from "./../reducers/constant";

export function signout() {
  localStorage.removeItem('user');
  return function (dispatch) {
    return dispatch({
      type: actionTypes.SIGNOUT,
    })
  }
}
export const startClock = () => {
  return { type: actionTypes.TICK, light: true, ts: Date.now() }
}
export const serverRenderClock = () => {
  return { type: actionTypes.SERVER_TICK, light: false, ts: Date.now() }
}