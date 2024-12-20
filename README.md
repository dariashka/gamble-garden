# Embed a deposit form with Rebilly Cashier

Rebilly Cashier provides an embeddable form for customers to deposit funds into
your website. 

## Define your secret key, organization ID, and website ID

In the server-side code (`server.js`), assign values for `API_SECRET_KEY`,
`ORGANIZATION_ID`, and `WEBSITE_ID`. In production, we recommend using a secrets
manager to store your secret key instead of including it alongside code.

## Set customer ID and currency

In the server-side code (`server.js`), replace `{{ CUSTOMER_ID }}` and `{{
CURRENCY }}` with a customer ID and currency code in ISO 4217 format.

## Running the sample application

To run the sample application, execute the following commands in this directory.

1. Install dependencies

```
npm install
```

2. Run the server

```
node server.js
```

1. Open [http://localhost:8080](http://localhost:8080)

## Error handling

Errors from the server are logged to your console.
