import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./Root";
import './App.scss';

const Home = lazy(() => import('./Pages/Home/Home'));
const About = lazy(() => import('./Pages/About/About'));
const Login = lazy(() => import('./Pages/LoginAndRegister/LoginAndRegister'));
const SearchDestiantion = lazy(() => import('./Pages/SearchDestination/SearchDestination'));
function displayMessage(type) {
  return (
    type === 'Error' ?
      <div className="overlay">An unexpected ERROR has occured!</div>
    :
      <div className="overlay">Loading...</div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: displayMessage('Error'),
    children: [ // Add routes here
      {
        path: '/',
        element: <Suspense fallback={displayMessage('Status')}><Home /></Suspense>
      },
      {
        path: '/About',
        element: <Suspense fallback={displayMessage('Status')}><About /></Suspense>
      },
      {
        path: '/Login',
        element: <Suspense fallback={displayMessage('Status')}><Login /></Suspense>
      },
      {
        path: '/SearchDestination',
        element: <Suspense fallback={displayMessage('Status')}><SearchDestiantion /></Suspense>
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App;