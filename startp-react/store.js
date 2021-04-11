import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productsData } from './products'

let store

const initialState = {
  products: productsData,
  cart: [],
  total: 0,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      let addedItem = state.products.find(item => item.id === action.id)
      let existed_item = state.cart.find(item => action.id === item.id)

      if(existed_item){
        addedItem.quantity += 1
        return {
          ...state,
          total: state.total + addedItem.price
        }
      } else {
        addedItem.quantity = 1
        let newTotal = state.total + addedItem.price
        return {
          ...state,
          cart: [...state.cart, addedItem],
          total: newTotal
        }
      }

    case 'ADD_QUANTITY':
      let existingItem = state.cart.find(item => item.id === action.id)
      existingItem.quantity += 1
      let newTotal = state.total + existingItem.price
      return {
        ...state,
        total: newTotal
      }

    case 'SUB_QUANTITY':
        let exItem = state.products.find(item=> item.id === action.id)
        if(exItem.quantity === 1){
          let new_items = state.cart.filter(item=>item.id !== action.id)
          let newTotal = state.total - exItem.price
          return {
              ...state,
              cart: new_items,
              total: newTotal
          }
      } else {
        exItem.quantity -= 1
        let newTotal = state.total - exItem.price
        return {
          ...state,
          total: newTotal
        }
      }

    case 'ADD_QUANTITY_WITH_NUMBER':
        let addedItemD = state.products.find(item => item.id === action.id)
        //check if the action id exists in the addedItems
        let existed_itemd = state.cart.find(item=> action.id === item.id)
        if(existed_itemd)
        {
            addeaddedItemDdItem.quantity += action.qty
            return {
                ...state,
                total: state.total + addedItemD.price * action.qty
            }
        } else {
            addedItemD.quantity = action.qty;
            //calculating the total
            let newTotal = state.total + addedItemD.price * action.qty
            
            return {
                ...state,
                cart: [...state.cart, addedItemD],
                total : newTotal
            }
            
        }

    case 'REMOVE_ITEM':
      let itemToRemove = state.cart.find(item=> action.id === item.id)
      let new_items = state.cart.filter(item=> action.id !== item.id)
        
      //calculating the total
      let newTotalRemove = state.total - (itemToRemove.price * itemToRemove.quantity );

      return {
          ...state,
          cart: new_items,
          total: newTotalRemove
      }

    case 'RESET':
      return {
        ...state,
        cart: [],
      }
    default:
      return state
  }
}

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  )
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
