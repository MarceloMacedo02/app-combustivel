 
import './App.css'; 
import {   useRoutes } from 'react-router-dom'; 
import Account from './components/Account';
import DashboardLayout from './components/DashboardLayout';
import Login from './pages/Login';

function App() { 
  const mainRoutes = {
    
    path: '/app',
    element: <DashboardLayout />,
    children: [
      
      {path: 'account', element: <Account />},
      
    ],
  };
const auth={
  path: '/auth/login',
  element: <Login />
  
}
 /* const accountRoutes = {
    path: 'account',
    element: <AccountLayout />,
    children: [
      {path: '*', element: <Navigate to='/404' />},
      {path: ':id', element: <AccountDetailView />},
      {path: 'add', element: <AccountAddView />},
      {path: 'list', element: <AccountListView />},
    ],
  };
*/
  const routing = useRoutes([mainRoutes,auth]);

  return <>{routing}</>;
 
}

export default App;
