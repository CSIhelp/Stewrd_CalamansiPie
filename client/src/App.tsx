
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
    <>
    <BrowserRouter>
    <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<LogIn />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/pettycash" element={<PettyCash />} />
           <Route path="/collectionreceipt" element={<CollectionReceipt />} />
           <Route path='/bills' element={<Bills/>} />
           <Route path='/payments' element={<Payments/>} />
           <Route path='/Documentation' element={<Documentation/>} />
           <Route path='/userManagement' element={<UserManagement/>} />
        </Routes>
 </BrowserRouter>
    </>
  )
}

export default App
