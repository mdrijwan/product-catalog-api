# product-catalog-api

## Description

This is a a TypeScript powered REST API backend service to create and maintain Product Catalog.

- platform: AWS
- language: TypeScript
- runtime/environment: NodeJS
- dbSolution: dynamoDB
- framewrok: serverless
- authorName: Md Rijwan Razzaq Matin
- authorLink: 'https://github.com/mdrijwan'

## Getting Started

Clone the project repository by running the command below.

SSH:
```
git clone git@github.com:mdrijwan/product-catalog-api.git
```

HTTPS:
```
git clone https://github.com/mdrijwan/product-catalog-api
```

GitHub CLI:
```
gh repo clone mdrijwan/product-catalog-api
```

Run the command below to install NPM dependencies

```
npm install
```

( This will automatically install dynamodb for local development, otherwise run the following command)

```
sls dynamodb install
```

Then start the server and follow the instructions in the console.

```
npm run start
```

To deploy the stack on AWS
```
npm run deploy
```

( This will automatically deploy the data resources on AWS before deploying the stack, otherwise run the following command )
```
npm run predeploy
```

To check the code limting:
```
npm run lint
```

To fix the issues with code limting:
```
npm run lint:fix
```

To generate the swagger doc:
```
npm run swagger
```

>- This project is powered by TypeScript so no compilation needed.
>- You need to install dynamodb-local for local development but no worries, simply by running `npm i` will do that for you automatically.
>- You need to deploy data resources before deploying the stack but no worries, simply by running `npm run deploy` will do that for you automatically.

### Let's get started!

***Methods***
- GET/
  + GET/supply-chain `(List all the products from the product catalog)`
  + GET/supply-chain/{id} `(Get a specific product from the product catalog)`

- POST/
  + POST/candsupply-chainidate `(Add a new product to the product catalog)`
   
- PUT/
  + PUT/supply-chain/{id} `(Modify/Update a specific product from the product catalog)`

  - DELETE/
  + DELETE/supply-chain/{id} `(Remove a specific product to the product catalog)`

***Functions***
- createProduct
- listProducts
- getProduct
- updateProduct
- removeProduct


### Project Structure

```
product-catalog-api
├─ src
│ ├─ api
│ │ ├─ create.ts
│ │ ├─ get.ts
│ │ ├─ list.ts
│ │ ├─ remove.ts
│ │ └─ update.ts
│ ├─ helpers
│ │ ├─ common.ts
│ │ ├─ formatter.ts
│ │ └─ model.ts
│ ├─ resources
│ │ └─ seedData.json
│ ├─ validator
│ │ ├─ request.json
│ │ ├─ response.json
│ │ └─ requestAuthorizer.ts
├─ .eslintrc.json
├─ .gitignore
├─ package.json
├─ package-lock.json
├─ serverless.yml
├─ serverless.data.yml
├─ serverless.local.yml
└─ tsconfig.json

```

>Upon deploying the stack to AWS, Request Validation Schema and Request Authroizer will be created and attached to the respective API methods. Besides, the full API Documentations will also be available in the API Gateway Console.

### API Documentation

[swagger](https://github.com/mdrijwan/product-catalog-api/blob/master/swagger.json)
