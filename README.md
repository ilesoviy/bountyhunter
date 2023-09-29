# BountyHunter
BountyHunter Web Application on Stellar Blockchain

## How to execute on local environment
Download Project:
-------------
```
$ git clone https://github.com/alexanderkoh/escrow-soroban
```

Deploy Smart Contract:
-------------
```
$ cd escrow-soroban\contracts
$ soroban contract build
$ soroban contract deploy \
    --wasm target/wasm32-unknown-unknown/release/soroban_token_contract.wasm \
    --source <admin> \
    --rpc-url https://rpc-futurenet.stellar.org:443 \
    --network-passphrase 'Test SDF Future Network ; October 2022'
```

Run BackEnd:
-------------
On a new terminal:
```
$ cd escrow-soroban\backend
$ npm install
$ npm run start
```

Run FrontEnd:
-------------
On a new terminal:
```
$ cd escrow-soroban\frontend
# yarn
$ yarn start
```

Access to the following URL:
-------------
https://localhost:5173/
