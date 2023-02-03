## Author: Brian Protas Odida

## Date: 02/02/2022

---

# Money Tracker API Test

#### Environment requirements

- Node.js
- Git

#### Technical requirements

- Next.js
- TypeScript
- Prisma
- Sqlite

## Installation

On the terminal, clone this repository: `git clone https://github.com/OdidaProtas/money-tracker-assesment.git
`

Move to the newly created "monyetracker-assesment-api" : `cd monyetracker-assesment-api `

Install Project dependencies: `yarn` or `npm install`

Generate Prisma client: `npx prisma db push`

Run dev server: `yarn start` or `npm run start`

visit Homepage: `http://localhost:3000` : returns "Hello World"

View Api docs: `htt://localhost:3000/docs`

---

### Api Actions

Users:

Endpoint: `http://localhost:3000/users`

- Create A user

  - Method: `POST`
  - Endpoint: `/`
  - Body: {firstName, lastName, username}


- Get user profile with balances

  - Method: `GET`
  - Endpoint: `/{{USER_ID}}/profile`
 

Wallets:

Endpoint: `http://localhost:3000/wallets`

- Create A wallet

  - Method: `POST`
  - Endpoint: `/`
  - Body: {userId,name}

- Wallet detail, balance and transactions

  - Method: `GET`
  - Endpoint: `/{{WALLET_ID}}`


Transactions:

Endpoint: `http://localhost:3000/transactions`

1. Adding Credit (Income)

- Method: `POST`
- Endpoint: `/`
- Body:
  {walletId,
  type = credit,
  description,
  amount}
  }



2. Adding Debit (Expenses)

- Method: `POST`
- Endpoint: `/`
- Body:
  {walletId,
  type = debit,
  description,
  amount}
  }


