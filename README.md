# Storefront API
AtlasDB with product and category records that are accessed in the virtual storefront front end.

[Live Version of Virtual Storefront at Netlify](https://at-storefront.netlify.app/)

[Deployed Version of API via Heroku](https://at-storefront-server.herokuapp.com/)

## Author: Anne Thorsteinson

**[Tests](https://github.com/AnneThor/storefront-api/actions)**

## Setup

```.env``` requirements:

- ```PORT``` - port number
- ```MONGO_URI``` - used to connect to AtlasDB Collections

## Running the App

There is no front end, so this app won't do much from it's deployment (as it will be impossible to login, signup and get the access tokens necessary to view content on most routes); Testing should be done via the front end (see link above)

- ```npm start```

### Non access controlled endpoints

* Note that the type of record is determined by the model param *
* ```GET /api/v1/:model'``` returns all models
* ```GET /api/v1/:model/:id```returns one model record by id
* ```POST /api/v1/:model``` creates a new record
* ```PUT /api/v1/:model/:id``` updates a record with the input id
* ```DELETE /api/v1/:model/:id``` deletes a record with the input id

## Tests

- Unit Tests: ```npm run test``` (auth-routes, non ACL routes, and ACL route test suites implemented)
- Lint Tests: ```npm run lint```

