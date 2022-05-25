import {poly_chain} from './poly_chain'
import {chain} from './chain'

export function prefixedAddress(network, addr) {
  if(network == poly_chain){
      return "poly_"+addr
  } else if(network == chain){
      return "eth_"+addr
  }
}
