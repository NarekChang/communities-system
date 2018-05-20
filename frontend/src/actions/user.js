export const login = () => ({
  type: 'LOGIN',
  userData: {
    name: 'Narek',
    auth: true,
    groups: 10
  }
})

export const logout = () => ({
  type: 'LOGOUT',
})
