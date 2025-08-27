
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
function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/pettycash" element={<PettyCash />} />
           <Route path="/collectionreceipt" element={<CollectionReceipt />} />
           <Route path='/bills' element={<Bills/>} />
           <Route path='/payments' element={<Payments/>} />
           <Route path='/Documentation' element={<Documentation/>} />
        </Routes>
 </BrowserRouter>
    </>
  )
}

export default App
