import http from '../../utils/Http'

const getAllOrders = () => {
  return http.get('/order')
}
const getOrderById = (id) => {
  return http.get(`/order/${id}`)
}
const addOrder = (data) => {
  return http.post('/order', data)
}
const editOrder = (id, data) => {
  return http.put(`/order/${id}`, data)
}
const deleteOrder = (id) => {
  return http.delete(`/order/${id}`)
}
const getOrdersByUser = (userId) => {
  return http.get(`/order/getorders/${userId}`)
}

const order = {
  getAllOrders, addOrder, getOrderById, editOrder, deleteOrder, getOrdersByUser
}
export default order