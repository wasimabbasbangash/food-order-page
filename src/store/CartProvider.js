import CartContext from "./cart-context-provider";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "Add_item") {
    const newTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemindex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemindex];

    let updateItem;
    let updatedItems;

    if (existingCartItem) {
      updateItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemindex] = updateItem;
    } else {
      updateItem = { ...action.item };
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: newTotalAmount,
    };
  } else if (action.type === "Remove_item") {
    const existingCartItemindex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingCartItem = state.items[existingCartItemindex];
    const updateTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updateditem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemindex] = updateditem;
    }
    return {
      items: updatedItems,
      totalAmount: updateTotalAmount,
    };
  }
  return defaultCartState;
};
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "Add_item", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "Remove_item", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
