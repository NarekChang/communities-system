const initial = {
  name: null,
  auth: false,
  groups: 0,
};

const userReducer = (state = initial, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        ...action.userData
      }
    case 'LOGOUT':
      return {
        ...initial,
        auth: false
      }
    default:
      return state
  }
}

export default userReducer;
