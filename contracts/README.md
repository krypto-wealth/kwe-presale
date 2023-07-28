# KWE Presale

## Getting Started

Recommended Node version is 16.0.0.

```bash
$ yarn
$ yarn compile
$ yarn testf
```

## Project Structure

This a hardhat typescript project with `hardhat-deploy` extension.
Solidity version `0.8.18`

### Tests

Tests are found in the `./test/` folder.

To run tests

```bash
$ yarn testf
```

To run coverage

```bash
$ yarn coverage
```

### Contracts

Solidity smart contracts are found in `./contracts/`.
`./contracts/mock` folder contains contracts mocks that are used for testing purposes.

### Deploy

Deploy script can be found in the `./deploy/localhost` for local testing and `./deploy/mainnet` for mainnet deploy

Generate `.env` file

```bash
$ cp .env.example .env
```

Add .env file to the project root.

To add the private key of a deployer account, assign the following variable

```
PRIVATE_TEST=
PRIVATE_MAIN=
```

To add API Keys for verifying

```
API_ETH=
API_BSC=
API_POLYGON=
API_AVAX=
API_FTM=
API_ARBITRUM=
```

To deploy contracts on `Polygon chain`

1. Paste constructor parameters inside deploy script `./deploy/mainnet/01_Presale.deploy.ts`

- `investToken` - users investments token
- `start` - timestamp of presale start
- `duration` - duration of presale in seconds
- `rounds` - array of RoundInfo struct with rounds parameters
- `owner` - address of the contract owner
- `investTokenReciever` - address who will receive all invested tokens

```bash
$ yarn deploy --network polygon_mainnet
```

### Deployments

Deployments on mainnets and testnets are stored in `./deployments`

### Verify

To verify contracts on `Polygon chain`

```bash
$ yarn verify --network polygon_mainnet
```

### Setup

Setup functions list:

1. function `setReceiverWallet`(`receiver_`)
   - `receiver_` is address of the new receiver
2. function `addRounds`(`rounds_`)
   - `rounds_` is array of new rounds struct `RoundInfo`

## Test Coverage

```text
  Presale contract
    ✔ correct init (67ms)
    ✔ deploy reverts with incorrect params (93ms)
    ✔ correct invest tokens flow (64ms)
    ✔ fails to invest if presale is not active
    ✔ fails to invest over hardcap (58ms)
    ✔ multi invest (220ms)
    admin functions
      ✔ setting receiver wallet only owner
      ✔ rounds addition only owner (54ms)


  8 passing (1s)

--------------|----------|----------|----------|----------|----------------|
File          |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
--------------|----------|----------|----------|----------|----------------|
 contracts/   |    97.22 |      100 |    88.89 |    97.73 |                |
  Presale.sol |      100 |      100 |      100 |      100 |                |
  Token.sol   |       75 |      100 |    66.67 |       75 |             27 |
--------------|----------|----------|----------|----------|----------------|
All files     |    97.22 |      100 |    88.89 |    97.73 |                |
--------------|----------|----------|----------|----------|----------------|
```

Contracts in contracts/mock/ will not be deployed to mainnet so they are not tested.
Contract token is not unit tested because it is mock token version not desired for deploy.

## Technical Requirements

The technical requirement document describes the product's functionality and purpose.
It can be found [here](https://docs.google.com/document/d/1wHnPm4DEGrWsuAO_M7hucJfRyc4PQ9AH/edit#heading=h.1fob9te).

## Implementation Details

### Audit scope

The following files contain code that will be deployed on mainnet and thus require a security audit:

- Presale.sol

### Architecture

The system consists of the Presale and Vesting contracts. After presale end the admin will fill the allocations for vesting using `getUserAllocations` function, taking care of decimals.

### Role Model

The Vesting has only one owner role:

- Owner can setReceiverWallet and addRounds.

### Backend

There is no backend

### Usage Scenarios

Below are detailed step-by-step usage scenarios. They may duplicate the ones described in the technical requirement document, but they are written with much more detail, i.e. who calls what function with what parameters, and where do these parameters come from.

#### Scenario 1

#### Scenario 2
