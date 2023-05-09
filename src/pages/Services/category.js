import http from '../../utils/Http'

const getAllCategory = () => {
  return http.get('/category')
}
const getCategoryById = (id) => {
  return http.get(`/category/${id}`)
}
const addCategory = (data) => {
  return http.post('/category', data)
}
const editCategory = (id, data) => {
  return http.put(`/category/${id}`, data)
}
const deleteCategory = (id) => {
  return http.delete(`/category/${id}`)
}
const getProductsByCategory = (id) => {
  return http.get(`/category/getproducts/${id}`)
}
const addPrentCategory = (id, categoryId, data) => {
  return http.put(`/category/${id}/${categoryId}`, data)
}

const category = {
  getAllCategory, addCategory, editCategory, getCategoryById, deleteCategory, getProductsByCategory, addPrentCategory
}
export default category