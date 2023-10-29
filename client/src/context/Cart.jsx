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

  // update item Quantity
  useEffect(() => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item._id === productId);
      if (itemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[itemIndex].quantity += 1;
        return updatedCart;
      }
      return prevCart;
    });
  }, [cart, productId]);

  useEffect(() => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item._id === productId);
      if (itemIndex > -1) {
        const updatedCart = [...prevCart];
        if (updatedCart[itemIndex].quantity > 1) {
          updatedCart[itemIndex].quantity -= 1;
        } else {
          updatedCart.splice(itemIndex, 1);
        }
        return updatedCart;
      }
      return prevCart;
    });
  }, [cart, productId]);

  const addToCart = (p) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === p._id);
      if (existingItem) {
        existingItem.quantity += 1;
        return prevCart;
      } else {
        const newItem = { ...p, quantity: 1 };
        toast.success("Item added into cart Successfully")
        return [...prevCart, newItem];
      }
    });
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
