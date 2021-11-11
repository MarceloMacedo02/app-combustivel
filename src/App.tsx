 
import './App.css'; 
import {   useRoutes } from 'react-router-dom'; 
import Account from './components/Account';
import DashboardLayout from './components/DashboardLayout';
import Login from './pages/Login';
import ListUser from './pages/Users/ListUser';

function App() { 
  const root = {
    
    path: '/',
    element: <DashboardLayout />,
    children: [
      
      {path: 'account', element: <Account />},
      
    ],
  };
  const mainRoutes = {
    
    path: '/app',
    element: <DashboardLayout />,
    children: [
      {path: 'usuarios', element: <ListUser  />},
      {path: 'account', element: <Account />},
      
      
    ],
  };
const auth={
  path: '/auth/login',
  element: <Login />
  
} 
  const routing = useRoutes([mainRoutes,auth,root]);

  return <>{routing} </>;
 
}

export default App;
