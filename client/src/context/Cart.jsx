import React, { useState, createContext, useEffect } from "react";
import toast from "react-hot-toast";
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  // item amount state
  const [itemQuantity, setItemQuantity] = useState(0);
  // total price state
  const [total, setTotal] = useState(0);
  const productId = null;

  // here whenever the cart will change here we are setting updatin the cart in local storage also
  const setCartToLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  // here we getting the data from cart so that after reload the page our cart data will not go dissapera
  const getCartFromLocalStorage = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      return cart;
    } else {
      return [];
    }
  };

  useEffect(() => {
    const cartFromLocalStorage = getCartFromLocalStorage();
    setCart(cartFromLocalStorage);
  }, []);

  useEffect(() => {
    setCartToLocalStorage(cart);
  }, [cart]);

  useEffect(() => {
    const totalAmount = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.quantity;
    }, 0);
    setTotal(totalAmount);
  }, [cart]);

  useEffect(() => {
    const amount = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.quantity;
    }, 0);
    setItemQuantity(amount);
  }, [cart]);

  // this function will work when i adding the same item again and again by add to cart function and its will update the itemquantity in real time
  const updateItemQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item._id === productId);
      if (itemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[itemIndex].quantity = quantity;
        return updatedCart;
      } else {
        return prevCart;
      }
    });
  };

  const addToCart = (p) => {
    const existingItem = cart.find((item) => item._id === p._id);
    if (existingItem) {
      updateItemQuantity(p._id, existingItem.quantity + 1);
    } else {
      setCart((prevCart) => [...prevCart, { ...p, quantity: 1 }]);
    }
  };

  // delete item from cart
  const removeCartItem = async (pid) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== pid);
      toast.success("Item removed from cart Successfully");
      return updatedCart;
    });
  };

  // cleart cart
  const clearCart = () => {
    setCart([]);
  };
  // increasing the quantity
  const incrementQuantity = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item._id === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return updatedCart;
    });
  };

  const decrementQuantity = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item._id === productId) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return undefined;
          }
        }
        return item;
      });
      return updatedCart.filter(Boolean);
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeCartItem,
        clearCart,
        incrementQuantity,
        decrementQuantity,
        total,
        itemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
