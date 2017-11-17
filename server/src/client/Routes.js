import React from 'react';
import App from './App';
import HomePage from './pages/HomePage';
import EditPage from './pages/EditPage';
import NotFoundPage from './pages/NotFoundPage';

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: '/',
        exact: true
      },
      {
        ...EditPage,
        path: '/edit/:id',
      },
      {
        ...NotFoundPage
      }
    ]
  }
];
