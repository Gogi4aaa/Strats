import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./Root";
import './App.scss';
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

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
        path: '/About', //we have protected route
        element: <Suspense fallback={displayMessage('Status')}><ProtectedRoute><About /></ProtectedRoute></Suspense>
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
  },
  {
    path: '*',
    element: <p>404 Error - Nothing here...</p>//shoud create 404 component to hold this exception
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App;