import http from '../../utils/Http'

const getAllProducts = () => {
  return http.get('/product')
}
const getProductById = (id) => {
  return http.get(`/product/${id}`)
}
const addProduct = (data) => {
  return http.post('/product', data)
}
const deleteProduct = (id) => {
  return http.delete(`/product/${id}`)
}
const editProduct = (id, data) => {
  return http.put(`/product/${id}`, data)
}
const getProductsPrice = (data) => {
  return http.post('/product/getproducts', data)
}
const product = {
  getAllProducts, addProduct, deleteProduct, getProductById, editProduct, getProductsPrice
}

export default product