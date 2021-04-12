# Voxus Tasks Manager


# How to use it? #
* 1: SSR + Client:

Change directory into Server

Install all dependencies: npm install 

Run: npm run dev

Go to localhost:3000

* 2: API Server:
Change directory into API

Install all dependencies: npm install 

Run: npm run dev

Go to localhost:4000

* 3: Install Elastic Search and run it locally
https://www.elastic.co/

* 4: Run MongoDB locally

* Amazon S3 Credentials at amazonS3.json inside API folder

* Client: localhost:3000
* API Server: localhost:4000

### Time to complete Task ###

* Task 1: SSR + CRUD = 10h
    Support for CRUD operations + Server-Side Rendering

* Task 2: API + OAUTH = 8h
    Suport for OAuth - gmail

* Task 3: More Complex Tasks: 3h
    Description: ok, priority: ok, a user has submitted a task: ok
* Task 4: Done: 1h
    Users can mark a task as done - register the user 

* Task 5: 
    Support only single upload - 
    I came up with a solution for multiple inputs

    Yet some possible solution, which needs testing, is on the branch multipleUpload.

    When a Done task is indexed on Elastic Search.
    
### Features ###
* Click on the task to change their status
* Materialize - Modern styling
* Server Renderer code using ES6
* React + Redux
* Auth with cookies

# Performance #
* Server-Side Rendering: render data on the server and display content for the user as soon as possible
* Easy to scale Server Renderer or Api Server - decoupled 

### Challenges ###
* Redux needs different configuration on the browser and the server 
* Aspects of authentication needs handle on the server - Normally this is only on the browser
* Need state rehydration on the browser
* Need to detect when all in initial data load action creators are completed
* Time manage - been busy with work

### Recommend improvements ###
* Redirect right away from Edit Page
* Priority customization - User decides the range.
* Edit task without routing
* Created by can be user name - that's more suitable

### Code Structure ###

* build: bundle containing server-side code + react code
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

* webpack: config for compiling and babelfying files.

### Who do I talk to? ###

* tallesanalise@gmail.com

