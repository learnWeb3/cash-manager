# T-DEV-700-MAR_11/bank

This repository serve as a fake bank who has all authority to manage user funds

Three different collections are made available through a REST API :
- users : manage users, their informations, related accounts and have visibility over their transactions  (endpoint is accesible only by ADMIN or MANAGER roles- see below)
- sessions : obtain a JWT token in order to perform authenticated requests on the platform
- transaction : create a transaction to move funds between accounts (endpoint is accessible only by ADMIN, MANAGER or MERCHANT roles - see below)

## Roles 

- ADMIN - superadmin rights can do anything
- MANAGER - admin rights can do anything at the moment
- MERCHANT - can create new transaction 
- USER - can login, see own account details

## Trandaction status 

  - PENDING: 1
  - APPROVED: 2
  - INVALID_SIGNATURE_ERROR: 3
  - INSUFFICIENT_BALANCE_ERROR: 4

## Postman collection available at 

[API documentation](https://documenter.getpostman.com/view/13953520/2s8YswQXGW)

## Quick start

- Seed the database
  
```bash
npm run seed
```

- Generate new RSA key pair to sign user transaction
  
```bash
# file will be written to root directory
npm run gen-rsa
```

- Update an account with a new public key to pair it with the private one that will be used to sign transaction
  
```bash
# start the server
npm run start
# login to have a JWT token
curl -X POST http://localhost:3000/sessions -H 'Content-Type: application/json'  -d '{"email":"admin@yopmail.com","password":"foobar"}' 
# get your user id 
curl -X GET http://localhost:3000/users -H 'Authorization: Bearer ${TOKEN}' -H 'Content-Type: application/json'
# create an account for a user
curl -X POST http://localhost:3000/users/YOUR_USER_ID/accounts  -H 'Authorization: Bearer ${TOKEN}' -H 'Content-Type: application/json'
# get your public key as string correctly formatted (careful on that)
awk -v ORS='\\n' '1' ./pk.pub.txt
# update a user public key
curl -X PUT http://localhost:3000/users/YOUR_USER_ID/accounts/YOUR_ACCOUNT_ID -H 'Authorization: Bearer ${TOKEN}' -H 'Content-Type: application/json' -d '{"key":"${PKEY}"}' 
```

- Send a transaction

```bash
# start the server
npm run start
# sign a transaction
npm run sign-tx # you will be prompted for the data to sign careful to omit the first and last quote of your JSON.stringify command output
# get your tx signature as string correctly formatted (careful on that)
awk -v ORS='\\n' '1' ./sig.txt
# send a signed tx to the bank
curl -X POST http://localhost:3000/transaction  -H 'Authorization: Bearer ${TOKEN}' -H 'Content-Type: application/json' -d  '{"from":"USER_ID_SENDING_FUNDS","to":"USER_ID_RECEIVING_FUNDS","amount":AMOUNT_TO_SEND,"signature":"TX_SIGNATURE"}' 
```
