# Redux Toolkit Bulletin Board App

This is a project created by following Dave's Gray React Redux Full Course for Beginners in his youtube channel.

## Redux

To install the redux toolkit in a react project that already exists we call

> `npm install @reduxjs/toolkit react-redux`

Redux is a JavaScript library that helps you to manage the state of the application. It works by creating a **store** that all components can be exposed and consume from this store. Inside the store we can call the features, with is called by a reducer. These state and features can be created by creating a **slice** and exporting the reducer to the store. The slice is where we devide our state.

To use the features we call a dispatch function informing the feature we want to use. To use a state, we call a useSelector informing the state we want to access.

It's recommended to have only one store in the entire application.
