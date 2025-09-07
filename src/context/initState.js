const savedCart = localStorage.getItem("cart");

const STATE = {
  cart: savedCart ? JSON.parse(savedCart) : []  // lấy lại giỏ hàng cũ
};

export default STATE;