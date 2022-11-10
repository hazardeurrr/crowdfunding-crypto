import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {getOne, updateDoc} from 'firebase-crowdfund/queries';
import {chain} from '@/utils/chain'

let store

const initialState = {
  products: [],
  cart: [],
  total: 0,
  address: undefined,
  metamask_connected: false,
  chainID: chain,
  allCampaigns: [],
  allCreators: [],
  currentUser: undefined,
  bbstBalance: 0,
  web3Instance: undefined,
  eth_web3Instance: undefined,
  bnb_web3Instance: undefined,
  currentProvider: undefined,
  showWelcome: true,
  openNotif: false,
  allPreCampaigns: []
}

// const reducerComp = (previous, current) => previous[1] + current[1];
// const compare = (x, y) => {
//   console.log("comparing" + x.title + y.title)
//   if(x.likedTupleArray.length === 0 && y.likedTupleArray.length > 0){
//     return -1
//   }
//   if(x.likedTupleArray.length > 0 && y.likedTupleArray.length === 0){
//     return 1
//   }
//   if(x.likedTupleArray.length === 0 && y.likedTupleArray.length === 0){
//     return 0
//   }
//   if(y.likedTupleArray.reduce(reducerComp) > x.likedTupleArray.reduce(reducerComp)){
//     return -1
//   }
//   return 1
  
// }

 const compare = (x, y) => {
   let xvalues = Object.values(x.likedTupleMap)
   let yvalues = Object.values(y.likedTupleMap)

   if(xvalues.length === 0 && yvalues.length > 0){
     return 1
   }
   if(xvalues.length> 0 && yvalues.length === 0){
     return -1
   }
   if(xvalues.length === 0 && yvalues.length === 0){
     return 1
   }
   if(yvalues.reduce((acc, val) => acc + val, 0) > xvalues.reduce((acc, val) => acc + val, 0)){
     return 1
   }
   return -1
  
 }


const reducer = (state = initialState, action) => {
  switch (action.type) {

    case 'SET_SHOWWELCOME':
      return {
        ...state,
        showWelcome: action.id
      }

      case 'SET_OPENNOTIF':
      return {
        ...state,
        openNotif: action.id
      }


    case 'SET_BBST_BALANCE':
      return {
        ...state,
        bbstBalance: action.id
      }

    case 'SET_PROVIDER':
      return {
        ...state,
        currentProvider: action.id
      }

    case 'SET_WEB3':
      return {
        ...state,
        web3Instance: action.id
    }

    case 'SET_WEB3ETH':
      return {
        ...state,
        eth_web3Instance: action.id
    }

    case 'SET_WEB3BNB':
      return {
        ...state,
        bnb_web3Instance: action.id
    }

    case 'SET_ALL_PRECAMPAIGNS':
      console.log(action.id)
      return {
        ...state,
        allPreCampaigns: action.id
    }

    case 'SET_ALL_CAMPAIGNS':
      let campaigns = action.id
      var now = Date.now() / 1000

      let current = [];
      let ended = [];
      let future = [];

      for (let elem of campaigns) {
        if (elem.end_date < now) {
          ended.push(elem)
        }
        else if (elem.start_date > now) {
          future.push(elem)
        }
        else current.push(elem)
      }

      current.sort((x, y) => compare(x,y))
      future.sort((x, y) => compare(x,y))
      ended.sort((x, y) => compare(x,y))

      let tmp = current.concat(future)

      campaigns = tmp.concat(ended);



      // console.log(campaigns)
      return {
        ...state,
        allCampaigns: campaigns
      }

      case 'SET_ALL_CREATORS':
        return {
          ...state,
          allCreators: action.id
        }

    case 'SET_ADDRESS':
      return {
        ...state,
        address: action.id
      }

    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.id
      }

    case 'SET_CONNECTED':
      return {
        ...state,
        metamask_connected: action.id
      }

    case 'SET_CHAINID':
      return {
        ...state,
        chainID: action.id
      }

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
