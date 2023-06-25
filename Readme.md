# Advisor list with GraphQL and Infinity pagination

The application is an improved version of [previous application](https://github.com/allinne/advisor-list). The pagination is cursor-based. This approach is resilient to changes that occur in the list while paginating, as it doesn’t rely on the position of items but rather on a cursor.

## What has been added

* GraphQL support
* it is possible to send request on the client side to the backend using REST API and GraphQL
* Infinity scrolling
* added Reset filtering and sorting button
* deployment on Google Cloud and MongoDB Atlas

## Prerequisites

The application requires Node v18.0.0, npm v9.6.1, Docker Desktop, MongoDB Compass.

## Installation

Install it from GitHub using the following commands
* `git clone git@github.com:allinne/advisor-list-graphql.git`
* `cd advisor-list-graphql`
* `npm i` install all dependencies

## Running / Development

* `docker-compose up` start Docker with MongoDB
* `cd backend && npm run dev:server` launch the backend
* open MongoDB Compass - optional, to check wheather DB is filled or not
* `node ./backend/src/dev/load-test-data.js` seed database with autogenerated data
* `cd frontend && npm run dev:bundler` launch the frontend - optional, for local development
* visit the app at [http://0.0.0.0:8080](http://0.0.0.0:8080)

## todo
* add sorting by Advisor Name;
* add tests
* add TypeScript support
