# AOS front-end technical test

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) based on typescript template.

## Steps to start the project

1) First clone the source code of the project:
### `git clone https://github.com/AhmedOuali/sos-tech-test`


2) Install dependencies
### `npm install`

3) launch the project
### `npm start`

It runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

4)  Go to production
once you have completed development and want to go into production, to create a production version, run this command
### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Test users
#### user1  
Email:test@test.com  
Password: test

#### user2
Email:test1@test.com  
Password: test

## Api used
To make the application work correctly, we have chosen to develop a specific API for it:
### login: {post} http://api.aos.res2menu.online/auth/login
request: {email:string, password: string}  
response: {status: 'OK' | 'FAILURE', redirect: string, user: {id: number, email: string, username: string}}

### checkAuthentication: {get} http://api.aos.res2menu.online/auth/checkAuthentication
response: {status: 'OK' | 'FAILURE', redirect: string, user: {id: number, email: string, username: string}}

### logout: {get} http://api.aos.res2menu.online/auth/logout 
response: {status: string}

### getAllTasks: {get} http://api.aos.res2menu.online/tasks
* response: {id: number, title: string, shortDesc: string, longDesc: string, createdAt: string, updatedAt: string, ownerId: number}[]

### getTask: {get} http://api.aos.res2menu.online/tasks/:id
* response: {id: number, title: string, shortDesc: string, longDesc: string, createdAt: string, updatedAt: string, ownerId: number}  

### deleteTask: {delete} http://api.aos.res2menu.online/tasks/:id
* response: {id: number, title: string, shortDesc: string, longDesc: string, createdAt: string, updatedAt: string, ownerId: number}  

### updateTask: {update} http://api.aos.res2menu.online/tasks/:id
* request: {id: number, title: string, shortDesc: string, longDesc: string, createdAt: string, updatedAt: string, ownerId: number}  
* response: {id: number, title: string, shortDesc: string, longDesc: string, createdAt: string, updatedAt: string, ownerId: number}

### createTask: {post} http://api.aos.res2menu.online/tasks
* request: {id: number, title: string, shortDesc: string, longDesc: string, createdAt: string, updatedAt: string, ownerId: number}  
* response: {id: number, title: string, shortDesc: string, longDesc: string, createdAt: string, updatedAt: string, ownerId: number}


