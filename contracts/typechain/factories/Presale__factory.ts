/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Presale, PresaleInterface } from "../Presale";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "investToken_",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "startTimestamp_",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "duration_",
        type: "uint32",
      },
      {
        components: [
          {
            internalType: "uint240",
            name: "hardcap",
            type: "uint240",
          },
          {
            internalType: "uint16",
            name: "price",
            type: "uint16",
          },
        ],
        internalType: "struct Presale.RoundInfo[]",
        name: "rounds_",
        type: "tuple[]",
      },
      {
        internalType: "address",
        name: "receiver_",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "HardcapAccomplished",
    type: "error",
  },
  {
    inputs: [],
    name: "IncorrectStartTimestamp",
    type: "error",
  },
  {
    inputs: [],
    name: "PresaleNotActive",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroDuration",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroInvest",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroRounds",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "investor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "roundId",
        type: "uint8",
      },
    ],
    name: "Invested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint240",
            name: "hardcap",
            type: "uint240",
          },
          {
            internalType: "uint16",
            name: "price",
            type: "uint16",
          },
        ],
        internalType: "struct Presale.RoundInfo[]",
        name: "rounds_",
        type: "tuple[]",
      },
    ],
    name: "addRounds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "duration",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user_",
        type: "address",
      },
    ],
    name: "getUserAllocations",
    outputs: [
      {
        internalType: "uint256[]",
        name: "allocations",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user_",
        type: "address",
      },
    ],
    name: "getUserInvestmentInfo",
    outputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "roundId",
            type: "uint8",
          },
          {
            internalType: "uint32",
            name: "timestamp",
            type: "uint32",
          },
          {
            internalType: "uint216",
            name: "amount",
            type: "uint216",
          },
        ],
        internalType: "struct Presale.InvestInfo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "roundId_",
        type: "uint8",
      },
    ],
    name: "invest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "investToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "investTokenReceiver",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    name: "roundTotalInvested",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "rounds",
    outputs: [
      {
        internalType: "uint240",
        name: "hardcap",
        type: "uint240",
      },
      {
        internalType: "uint16",
        name: "price",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver_",
        type: "address",
      },
    ],
    name: "setReceiverWallet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startTimestamp",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalInvested",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60e06040523480156200001157600080fd5b50604051620014a9380380620014a98339810160408190526200003491620002b1565b6200003f33620001bb565b6001600160a01b03861615806200005d57506001600160a01b038116155b806200007057506001600160a01b038216155b156200008f5760405163d92e233d60e01b815260040160405180910390fd5b428563ffffffff161015620000b75760405163513e936960e11b815260040160405180910390fd5b8251600003620000da5760405163065e270360e51b815260040160405180910390fd5b8363ffffffff16600003620001025760405163346ab43760e11b815260040160405180910390fd5b6001600160a01b0386811660805263ffffffff86811660a052851660c052600280546001600160a01b03191691841691909117905560005b8351811015620001a35760018482815181106200015b576200015b62000412565b6020908102919091018101518254600181810185556000948552938390208251929093015161ffff16600160f01b026001600160f01b0390921691909117910155016200013a565b50620001af81620001bb565b50505050505062000428565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b80516001600160a01b03811681146200022357600080fd5b919050565b805163ffffffff811681146200022357600080fd5b634e487b7160e01b600052604160045260246000fd5b604080519081016001600160401b03811182821017156200027857620002786200023d565b60405290565b604051601f8201601f191681016001600160401b0381118282101715620002a957620002a96200023d565b604052919050565b60008060008060008060c08789031215620002cb57600080fd5b620002d6876200020b565b95506020620002e781890162000228565b95506040620002f8818a0162000228565b60608a01519096506001600160401b03808211156200031657600080fd5b818b0191508b601f8301126200032b57600080fd5b8151818111156200034057620003406200023d565b62000350858260051b016200027e565b818152858101925060069190911b83018501908d8211156200037157600080fd5b928501925b81841015620003df5784848f031215620003905760008081fd5b6200039a62000253565b84516001600160f01b0381168114620003b35760008081fd5b81528487015161ffff81168114620003cb5760008081fd5b818801528352928401929185019162000376565b809850505050505050620003f6608088016200020b565b91506200040660a088016200020b565b90509295509295509295565b634e487b7160e01b600052603260045260246000fd5b60805160a05160c05161103d6200046c6000396000818160ff01526103ec01526000818161028e01526103b801526000818161025401526105d6015261103d6000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c80638da5cb5b11610097578063badf822b11610066578063badf822b1461024f578063dd073a0c14610276578063e6fd48bc14610289578063f2fde38b146102b057600080fd5b80638da5cb5b146101d75780639c932547146101fc578063a2c6d1771461021c578063a518488e1461022f57600080fd5b80635216aeec116100d35780635216aeec146101705780635e03b67a14610187578063715018a61461019a5780638c65c81f146101a257600080fd5b80630fb5a6b4146100fa57806317fa0f721461013b57806322912cb21461015b575b600080fd5b6101217f000000000000000000000000000000000000000000000000000000000000000081565b60405163ffffffff90911681526020015b60405180910390f35b61014e610149366004610ca8565b6102c3565b6040516101329190610cd8565b61016e610169366004610ca8565b610360565b005b61017960035481565b604051908152602001610132565b61016e610195366004610d59565b6103b1565b61016e610606565b6101b56101b0366004610d85565b61061a565b604080516001600160f01b03909316835261ffff909116602083015201610132565b6000546001600160a01b03165b6040516001600160a01b039091168152602001610132565b61017961020a366004610d9e565b60046020526000908152604090205481565b61016e61022a366004610db9565b610650565b61024261023d366004610ca8565b6106cf565b6040516101329190610e2e565b6101e47f000000000000000000000000000000000000000000000000000000000000000081565b6002546101e4906001600160a01b031681565b6101217f000000000000000000000000000000000000000000000000000000000000000081565b61016e6102be366004610ca8565b6108bb565b6001600160a01b0381166000908152600560209081526040808320805482518185028101850190935280835260609492939192909184015b82821015610355576000848152602090819020604080516060810182529185015460ff81168352610100810463ffffffff16838501526501000000000090046001600160d81b0316908201528252600190920191016102fb565b505050509050919050565b610368610939565b6001600160a01b03811661038f5760405163d92e233d60e01b815260040160405180910390fd5b600280546001600160a01b0319166001600160a01b0392909216919091179055565b63ffffffff7f0000000000000000000000000000000000000000000000000000000000000000164281118061041457504261041263ffffffff7f00000000000000000000000000000000000000000000000000000000000000001683610e88565b105b1561043257604051633844da5760e21b815260040160405180910390fd5b82600003610453576040516330be62cd60e11b815260040160405180910390fd5b60018260ff168154811061046957610469610ea1565b600091825260208083209091015460ff8516835260049091526040909120546001600160f01b039091169061049f908590610e88565b11156104be57604051631894575b60e11b815260040160405180910390fd5b82600360008282546104d09190610e88565b909155505060ff8216600090815260046020526040812080548592906104f7908490610e88565b9091555050336000818152600560209081526040808320815160608101835260ff88811680835263ffffffff4281168488019081526001600160d81b038d81168689019081528754600181018955978b5299899020955195909601805491519951909616650100000000000264ffffffffff999092166101000264ffffffffff19909116949093169390931791909117959095161790558051878152918201929092527f8be001c51fa67bb39d13928f57c4231ab199404a3e3e1de2ff6cd7756bfbba48910160405180910390a2600254610601906001600160a01b037f000000000000000000000000000000000000000000000000000000000000000081169133911686610993565b505050565b61060e610939565b61061860006109f3565b565b6001818154811061062a57600080fd5b6000918252602090912001546001600160f01b0381169150600160f01b900461ffff1682565b610658610939565b600081900361067a5760405163065e270360e51b815260040160405180910390fd5b60005b8181101561060157600183838381811061069957610699610ea1565b835460018101855560009485526020909420604090910292909201929190910190506106c58282610eb7565b505060010161067d565b60015460609067ffffffffffffffff8111156106ed576106ed610f04565b604051908082528060200260200182016040528015610716578160200160208202803683370190505b50905060005b6001600160a01b03831660009081526005602052604090205460ff8216101561080b576001600160a01b0383166000908152600560205260408120805460ff841690811061076c5761076c610ea1565b60009182526020808320909101546001600160a01b038716835260059091526040909120805460ff9283169350909184169081106107ac576107ac610ea1565b9060005260206000200160000160059054906101000a90046001600160d81b03166001600160d81b0316838260ff16815181106107eb576107eb610ea1565b602002602001018181516107ff9190610e88565b9052505060010161071c565b5060005b81518160ff1610156108b55760018160ff168154811061083157610831610ea1565b90600052602060002001600001601e9054906101000a900461ffff1661ffff16828260ff168151811061086657610866610ea1565b602002602001015161271061087b9190610f1a565b6108859190610f31565b828260ff168151811061089a5761089a610ea1565b60209081029190910101526108ae81610f53565b905061080f565b50919050565b6108c3610939565b6001600160a01b03811661092d5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b610936816109f3565b50565b6000546001600160a01b031633146106185760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610924565b604080516001600160a01b0385811660248301528416604482015260648082018490528251808303909101815260849091019091526020810180516001600160e01b03166323b872dd60e01b1790526109ed908590610a43565b50505050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000610a98826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316610b189092919063ffffffff16565b9050805160001480610ab9575080806020019051810190610ab99190610f72565b6106015760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b6064820152608401610924565b6060610b278484600085610b2f565b949350505050565b606082471015610b905760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b6064820152608401610924565b600080866001600160a01b03168587604051610bac9190610fb8565b60006040518083038185875af1925050503d8060008114610be9576040519150601f19603f3d011682016040523d82523d6000602084013e610bee565b606091505b5091509150610bff87838387610c0a565b979650505050505050565b60608315610c79578251600003610c72576001600160a01b0385163b610c725760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610924565b5081610b27565b610b278383815115610c8e5781518083602001fd5b8060405162461bcd60e51b81526004016109249190610fd4565b600060208284031215610cba57600080fd5b81356001600160a01b0381168114610cd157600080fd5b9392505050565b602080825282518282018190526000919060409081850190868401855b82811015610d36578151805160ff1685528681015163ffffffff16878601528501516001600160d81b03168585015260609093019290850190600101610cf5565b5091979650505050505050565b803560ff81168114610d5457600080fd5b919050565b60008060408385031215610d6c57600080fd5b82359150610d7c60208401610d43565b90509250929050565b600060208284031215610d9757600080fd5b5035919050565b600060208284031215610db057600080fd5b610cd182610d43565b60008060208385031215610dcc57600080fd5b823567ffffffffffffffff80821115610de457600080fd5b818501915085601f830112610df857600080fd5b813581811115610e0757600080fd5b8660208260061b8501011115610e1c57600080fd5b60209290920196919550909350505050565b6020808252825182820181905260009190848201906040850190845b81811015610e6657835183529284019291840191600101610e4a565b50909695505050505050565b634e487b7160e01b600052601160045260246000fd5b80820180821115610e9b57610e9b610e72565b92915050565b634e487b7160e01b600052603260045260246000fd5b81356001600160f01b038116808214610ecf57600080fd5b82546001600160f01b0319908116821784559150602084013561ffff81168114610ef857600080fd5b60f01b90911617905550565b634e487b7160e01b600052604160045260246000fd5b8082028115828204841417610e9b57610e9b610e72565b600082610f4e57634e487b7160e01b600052601260045260246000fd5b500490565b600060ff821660ff8103610f6957610f69610e72565b60010192915050565b600060208284031215610f8457600080fd5b81518015158114610cd157600080fd5b60005b83811015610faf578181015183820152602001610f97565b50506000910152565b60008251610fca818460208701610f94565b9190910192915050565b6020815260008251806020840152610ff3816040850160208701610f94565b601f01601f1916919091016040019291505056fea264697066735822122086296d48935aafb43007060be18d5cbdee7d28b23d777d169659b453fb3df05d64736f6c63430008120033";

export class Presale__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    investToken_: string,
    startTimestamp_: BigNumberish,
    duration_: BigNumberish,
    rounds_: { hardcap: BigNumberish; price: BigNumberish }[],
    receiver_: string,
    owner_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Presale> {
    return super.deploy(
      investToken_,
      startTimestamp_,
      duration_,
      rounds_,
      receiver_,
      owner_,
      overrides || {}
    ) as Promise<Presale>;
  }
  getDeployTransaction(
    investToken_: string,
    startTimestamp_: BigNumberish,
    duration_: BigNumberish,
    rounds_: { hardcap: BigNumberish; price: BigNumberish }[],
    receiver_: string,
    owner_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      investToken_,
      startTimestamp_,
      duration_,
      rounds_,
      receiver_,
      owner_,
      overrides || {}
    );
  }
  attach(address: string): Presale {
    return super.attach(address) as Presale;
  }
  connect(signer: Signer): Presale__factory {
    return super.connect(signer) as Presale__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PresaleInterface {
    return new utils.Interface(_abi) as PresaleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Presale {
    return new Contract(address, _abi, signerOrProvider) as Presale;
  }
}
