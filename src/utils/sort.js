// Sort column/card
export const mapOrder = (array, order, key) => {
  if (!array || !order || !key) return []
  return order.map((id) => array.find((item) => item[key] === id))
}
