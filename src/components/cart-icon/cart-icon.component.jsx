// import "./cart-icon.styles.scss";
import { ShoppingIcon, CartIconContainer, ItemCount } from "./cart-icon.styles";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartItems, cartCount } =
    useContext(CartContext);
  const handleCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartIconContainer>
      <ShoppingIcon onClick={handleCartOpen} />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};
export default CartIcon;
