import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from './service/AuthRoutes';
import { Notifications } from '@mantine/notifications';
// Import pages
import LogIn from './pages/LogIn/LogIn';  
import Dashboard from './pages/Dashboard/Dashboard'
import Invoice from './pages/Invoice/Invoice'
import PettyCash from './pages/PettyCash/PettyCash';
import CollectionReceipt from './pages/CollectionReceipt/CollectionReceipt';
import Bills from './pages/Bills/Bills'
import Payments from './pages/Payments/Payments';
import Documentation from './pages/Documentation/Documentation';
import UserManagement from './pages/UserManagement/UserManagement';
import Unauthorized from './pages/Authentication/Authentication';
import ContactUs from './pages/ContactUs/ContactUs';
import BankReconciliation from './pages/BankReconciliation/BankReconciliation';
import LooseLeaf from './pages/LooseLeaf/LooseLeaf';

import BackLogoutModal from './components/LogoutModal/LogOut';
import { useSession } from './hooks/useSession';
function App() {
    const { showBackWarning, cancelBackLogout, clearSession } = useSession();


  return (

       <BrowserRouter>
       
       <Notifications position="bottom-right" className='Notification' />
             
                <BackLogoutModal
               opened={showBackWarning}
               onStay={cancelBackLogout}
               onLogout={clearSession}
             />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LogIn />} />
        <Route path = "/unauthorizedAcess" element={<Unauthorized/>}/>

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/invoice" element={
          <ProtectedRoute>
            <Invoice />
          </ProtectedRoute>
        } />
        <Route path="/pettycash" element={
          <ProtectedRoute>
            <PettyCash />
          </ProtectedRoute>
        } />
        <Route path="/collectionreceipt" element={
          <ProtectedRoute>
            <CollectionReceipt />
          </ProtectedRoute>
        } />
        <Route path="/bills" element={
          <ProtectedRoute>
            <Bills />
          </ProtectedRoute>
        } />
        <Route path="/payments" element={
          <ProtectedRoute>
            <Payments />
          </ProtectedRoute>
        } />
                <Route path="/bankreconciliation" element={
          <ProtectedRoute>
            <BankReconciliation/>
          </ProtectedRoute>
        } />
                <Route path="/looseleaf" element={
          <ProtectedRoute>
            <LooseLeaf />
          </ProtectedRoute>
        } />
        <Route path="/Documentation" element={
          <ProtectedRoute>
            <Documentation />
          </ProtectedRoute>
        } />
        <Route path="/userManagement" element={
          <ProtectedRoute adminOnly={true} >
            <UserManagement />
          </ProtectedRoute>
        } />
        <Route path = "/contact" element = {
           <ProtectedRoute  >
            <ContactUs />
          </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
