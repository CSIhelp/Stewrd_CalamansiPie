import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from './service/AuthRoutes';
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
function App() {


  return (

       <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
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
        <Route path="/Documentation" element={
          <ProtectedRoute>
            <Documentation />
          </ProtectedRoute>
        } />
        <Route path="/userManagement" element={
          <ProtectedRoute>
            <UserManagement />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
