import {bnb_chain} from './bnb_chain'
import {chain} from './chain'

export function prefixedAddress(network, addr) {
  if(network == bnb_chain){
      return "bnb_"+addr
  } else if(network == chain){
      return "eth_"+addr
  }
}
