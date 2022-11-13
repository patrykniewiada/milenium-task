## Install application

After fetch repository run `npm i` command in project root directory (place where's package.json file)

## Run project

To run project, simply, type `npm start` command - it should run react app (port 3000) and json server (port 3001).
JSONServer have additional endpoint (transactions_empty) to check empty state of application.

## Test project

For run test type `npm run test` in terminal

# Previous readme

## Introduction

Application should contain list of bank transactions, based on design structure from _design.png_ file and contain following functionalities:

1.  Transactions fetched from API, displayed in table or list.
2.  Pagination (infinite-scroll or traditional, 20 items per page)
3.  Filtering by `beneficiary` field
4.  Form for adding new transaction to the list with basic non-empty fields validation. Add input fields for:
    -   amount (must be positive)
    -   account number (not empty, numbers)
    -   address
    -   description
    -   date and id should be generated when submiting form
5.  Simple communicate when success/error after form submission.
6.  Removing transaction from the list

NOTE: Points 2-5 should be done on front-end side.

## API description

To run API, run following commands in task directory:

    npm install
    npm run server

Available endpoints:

> GET /transactions

## Technologies

Required technologies for development are _React_ and _Typescript_.

## Summary

Send us back your app with instruction how to run app and tests. Preferred way is to get URL to codesandbox or your public repository with project. In case of problems/questions feel free to ask.

**Good luck!**
