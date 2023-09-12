# Rewards 
 This webapp is based on the Fetch Rewards app which rewards points to a user on every purchase inputted in the Application

## Workflow

* The app allows a user to login to the system 
* The app allows a user to input their expenses into the system once they login
* The app calculates the reward gained based on each expense inputted in the system
* The app allows a user to view a history of their expenses
* The app allows the user to delete any of their previous expense
* The app binds the user with their session id to maintain data and displays a cumulative total of rewards earned by a user

## Validations

* Basic UI validations on user inputs while entering new Expense details
* The application allows a user to Login, username can consist of only English characters. The username "dog" is forbidden from logging into the system which portrays a case of authentication
* Date, Shop and Cost of the receipt are required fields

## Interface Design
* The app uses industry standards of styling methodologies in CSS
* The app has a clean UI displaying different sections such as History of Expenses and New Expense visibly 

## Steps to run the app
* `npm install` - To install all dependencies
* `npm run build` - To build react application and related assets
* `npm start` - To run the server at port 4000
* Open http://localhost:4000 in browser to start using the app
