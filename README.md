# Voxus Tasks Manager


# How to use it? #

Change directory into Server

Install all dependencies: npm install 

Run: npm run dev

Go to localhost:3000

* Client: localhost:3000
* API Server: localhost:4000

### Time to complete Task ###

* Task 1:
* Task 2:
* Task 3:
* Task 4:
* Task 5: 


### Code Structure ###

* build: bundle containing server side code + react code
* public: bundle sent onto the browser containing only React code 

* api: API server - contain application logic
* * config: keys for production, development, etc
* * controllers: interface between routes and database - query data and return them.
* * * checkout: 
* * middlewares: in this case responsible for protecting routes: login required
* * services: passport for login + security analysis
* * shared: files shared between site and erp 
* * * constants
* * * helper
* * * models - data modeling used in mongo
* * index.js: app/express + make connection available

* server: SSR + React code for the client
* * client: React code for the client + Redux architecture
* * * actions: all actions files
* * * components: common components used around
* * * pages: container for each page on the website
* * * reducers: files receiving data, processing and sending them to the store
* * * App.js: base component for rendering children
* * * client.js: provider + store + Browse Router for the browser
* * * Routes.js: all routes in the application
* * helpers: createStore + server side rendering content
* * index.js: receive user request + decide which components to render and which data to load + mongo connection + port connection

* webpacks: config for compiling and babelofying files.

### Who do I talk to? ###

* talles@livup.com.br



