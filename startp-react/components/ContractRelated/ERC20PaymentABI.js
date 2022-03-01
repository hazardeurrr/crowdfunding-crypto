const erc20PaymentAbi= [
  {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "userAddr",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "token",
              "type": "address"
          }
      ],
      "name": "amountAllowance",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "userAddr",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "token",
              "type": "address"
          }
      ],
      "name": "approveCrowdfunding",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "userAddr",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "token",
              "type": "address"
          }
      ],
      "name": "payInERC20",
      "outputs": [
          {
              "internalType": "bool",
              "name": "success",
              "type": "bool"
          }
      ],
      "stateMutability": "payable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "userAddr",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "campaign",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "token",
              "type": "address"
          }
      ],
      "name": "payInERC20Bis",
      "outputs": [
          {
              "internalType": "bool",
              "name": "success",
              "type": "bool"
          }
      ],
      "stateMutability": "payable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "userAddr",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "campaign",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "token",
              "type": "address"
          }
      ],
      "name": "payInERC20Qat",
      "outputs": [
          {
              "internalType": "bool",
              "name": "success",
              "type": "bool"
          }
      ],
      "stateMutability": "payable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "userAddr",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "token",
              "type": "address"
          }
      ],
      "name": "payInERC20Ter",
      "outputs": [
          {
              "internalType": "bool",
              "name": "success",
              "type": "bool"
          }
      ],
      "stateMutability": "payable",
      "type": "function"
  }
]

module.exports = {
  erc20PaymentAbi
}