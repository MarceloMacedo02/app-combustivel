 

  
 
import { Router,Route, Routes} from 'react-router';
import Account from './components/Account';
import DashboardLayout from './components/DashboardLayout';
import history from './util/history'; 
const RoutesApp =()=>{
    <Routes>
    <Route path="/" element={<DashboardLayout />}>
      <Route
       path= '/account'  element= {<Account /> }
      />
      
    </Route>
  </Routes>
}
    /* = [
    
    {
      path: 'app',
      element: <DashboardLayout />,
      children: [
        { path: 'account', element: <Account /> },
       
      ]
    },
    {/*
      path: '/',
      element: <MainLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/app/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    */ 

export default RoutesApp;