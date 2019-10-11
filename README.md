# Backend Challenge API

## Building and Developing

Make sure you have node.js 8+ installed

Install knex.js
```
yarn global add knex

or

npm install -g knex
```

Install dependencies
```
yarn

or

npm install
```

Initialise, migrate and seed database
```
knex migrate:latest
knex seed:run
```

Launch
```
node index.js
```

# LICENCE

Licensed under the MIT License see [LICENSE.md](LICENSE.md)