import http from '../../utils/Http'

const getUser = () => {
  return http.get('/user')
}
const editUser = (id, data) => {
  return http.put(`/user/${id}`, data)
}
const deleteUser = (id) => {
  return http.delete(`/user/${id}`)
}
const user = {
  getUser, editUser, deleteUser
}
export default user