/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, BigNumberish, Contract, ContractFactory, Overrides } from 'ethers'
import { Provider, TransactionRequest } from '@ethersproject/providers'
import type { Token, TokenInterface } from '../Token'

const _abi = [
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name_',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'symbol_',
        type: 'string',
      },
      {
        internalType: 'uint8',
        name: 'decimals_',
        type: 'uint8',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'subtractedValue',
        type: 'uint256',
      },
    ],
    name: 'decreaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'addedValue',
        type: 'uint256',
      },
    ],
    name: 'increaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const _bytecode =
  '0x60806040523480156200001157600080fd5b5060405162000dd138038062000dd183398101604081905262000034916200022d565b8282600362000044838262000340565b50600462000053828262000340565b505050620000803382600a6200006a919062000521565b6200007a90633b9aca0062000539565b6200009d565b6005805460ff191660ff9290921691909117905550620005699050565b6001600160a01b038216620000f85760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b80600260008282546200010c919062000553565b90915550506001600160a01b038216600081815260208181526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b505050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200019057600080fd5b81516001600160401b0380821115620001ad57620001ad62000168565b604051601f8301601f19908116603f01168101908282118183101715620001d857620001d862000168565b81604052838152602092508683858801011115620001f557600080fd5b600091505b83821015620002195785820183015181830184015290820190620001fa565b600093810190920192909252949350505050565b6000806000606084860312156200024357600080fd5b83516001600160401b03808211156200025b57600080fd5b62000269878388016200017e565b945060208601519150808211156200028057600080fd5b506200028f868287016200017e565b925050604084015160ff81168114620002a757600080fd5b809150509250925092565b600181811c90821680620002c757607f821691505b602082108103620002e857634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200016357600081815260208120601f850160051c81016020861015620003175750805b601f850160051c820191505b81811015620003385782815560010162000323565b505050505050565b81516001600160401b038111156200035c576200035c62000168565b62000374816200036d8454620002b2565b84620002ee565b602080601f831160018114620003ac5760008415620003935750858301515b600019600386901b1c1916600185901b17855562000338565b600085815260208120601f198616915b82811015620003dd57888601518255948401946001909101908401620003bc565b5085821015620003fc5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052601160045260246000fd5b600181815b80851115620004635781600019048211156200044757620004476200040c565b808516156200045557918102915b93841c939080029062000427565b509250929050565b6000826200047c575060016200051b565b816200048b575060006200051b565b8160018114620004a45760028114620004af57620004cf565b60019150506200051b565b60ff841115620004c357620004c36200040c565b50506001821b6200051b565b5060208310610133831016604e8410600b8410161715620004f4575081810a6200051b565b62000500838362000422565b80600019048211156200051757620005176200040c565b0290505b92915050565b60006200053260ff8416836200046b565b9392505050565b80820281158282048414176200051b576200051b6200040c565b808201808211156200051b576200051b6200040c565b61085880620005796000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80633950935111610071578063395093511461012957806370a082311461013c57806395d89b4114610165578063a457c2d71461016d578063a9059cbb14610180578063dd62ed3e1461019357600080fd5b806306fdde03146100ae578063095ea7b3146100cc57806318160ddd146100ef57806323b872dd14610101578063313ce56714610114575b600080fd5b6100b66101a6565b6040516100c391906106a2565b60405180910390f35b6100df6100da36600461070c565b610238565b60405190151581526020016100c3565b6002545b6040519081526020016100c3565b6100df61010f366004610736565b610252565b60055460405160ff90911681526020016100c3565b6100df61013736600461070c565b610276565b6100f361014a366004610772565b6001600160a01b031660009081526020819052604090205490565b6100b6610298565b6100df61017b36600461070c565b6102a7565b6100df61018e36600461070c565b610327565b6100f36101a1366004610794565b610335565b6060600380546101b5906107c7565b80601f01602080910402602001604051908101604052809291908181526020018280546101e1906107c7565b801561022e5780601f106102035761010080835404028352916020019161022e565b820191906000526020600020905b81548152906001019060200180831161021157829003601f168201915b5050505050905090565b600033610246818585610360565b60019150505b92915050565b600033610260858285610484565b61026b8585856104fe565b506001949350505050565b6000336102468185856102898383610335565b6102939190610801565b610360565b6060600480546101b5906107c7565b600033816102b58286610335565b90508381101561031a5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b61026b8286868403610360565b6000336102468185856104fe565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6001600160a01b0383166103c25760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610311565b6001600160a01b0382166104235760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610311565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b60006104908484610335565b905060001981146104f857818110156104eb5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610311565b6104f88484848403610360565b50505050565b6001600160a01b0383166105625760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610311565b6001600160a01b0382166105c45760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610311565b6001600160a01b0383166000908152602081905260409020548181101561063c5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610311565b6001600160a01b03848116600081815260208181526040808320878703905593871680835291849020805487019055925185815290927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a36104f8565b600060208083528351808285015260005b818110156106cf578581018301518582016040015282016106b3565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b038116811461070757600080fd5b919050565b6000806040838503121561071f57600080fd5b610728836106f0565b946020939093013593505050565b60008060006060848603121561074b57600080fd5b610754846106f0565b9250610762602085016106f0565b9150604084013590509250925092565b60006020828403121561078457600080fd5b61078d826106f0565b9392505050565b600080604083850312156107a757600080fd5b6107b0836106f0565b91506107be602084016106f0565b90509250929050565b600181811c908216806107db57607f821691505b6020821081036107fb57634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561024c57634e487b7160e01b600052601160045260246000fdfea26469706673582212207aa5b03b9c41fd50cdf148f76e25c8ba6470643bb8ecdb16a03b7f5d30e3666364736f6c63430008120033'

export class Token__factory extends ContractFactory {
  constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0])
    } else {
      super(...args)
    }
  }

  deploy(
    name_: string,
    symbol_: string,
    decimals_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Token> {
    return super.deploy(name_, symbol_, decimals_, overrides || {}) as Promise<Token>
  }
  getDeployTransaction(
    name_: string,
    symbol_: string,
    decimals_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name_, symbol_, decimals_, overrides || {})
  }
  attach(address: string): Token {
    return super.attach(address) as Token
  }
  connect(signer: Signer): Token__factory {
    return super.connect(signer) as Token__factory
  }
  static readonly bytecode = _bytecode
  static readonly abi = _abi
  static createInterface(): TokenInterface {
    return new utils.Interface(_abi) as TokenInterface
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Token {
    return new Contract(address, _abi, signerOrProvider) as Token
  }
}
