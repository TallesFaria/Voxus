# Voxus Tasks Manager


# How to use it? #
* 1: SSR + Client:

Change directory into Server

Install all dependencies: npm install 

Run: npm run dev

Go to localhost:3000

* 2: API Server:
Change directory into Api

Install all dependencies: npm install 

Run: npm run dev

Go to localhost:4000

* 3: Install Elastic Search and run it locally
https://www.elastic.co/

* 4: Run mongodb locally

* Amazon S3 Credentials at amazonS3.json inside API folder

* Client: localhost:3000
* API Server: localhost:4000

### Time to complete Task ###

* Task 1: SSR + CRUD = 10h
    Suport for CRUD operations + Server Side Rendering

* Task 2: API + OAUTH = 8h
    Suport for OAuth - gmail

* Task 3: More Complex Tasks: 3h
    Description: ok, priority: ok, user that submitted task: ok
* Task 4: Done: 1h
    Users can mark task as done - register the user 

* Task 5: 
    Suport only single upload - 
    I came up with a solution for multiple input but I since I had problem with creating my on account 
    on Amazon S3 and yesterday I the one was using belongs from my friend and he changed his password so I
    am unable to continue on. 

    Yet some possible solution, which need testing, is on the branch multipleUpload.

    When Done task is indexed on Elastic Search.
    
### Features ###
* Click on the task to change their status
* Materialize - Modern styling

# Performance #
* Server Side Rendering: render data on the server and display content for the user as soon as possible
* Easy to scale Server Renderer or Api Server - decoupled 

### Challenges ###
* Time manage

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



