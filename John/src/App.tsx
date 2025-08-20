
import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Import pages
import LogIn from './pages/LogIn/LogIn';  
import Dashboard from './pages/Dashboard/Dashboard'
import Invoice from './pages/Invoice/Invoice'
import PettyCash from './pages/PettyCash/PettyCash';
import CollectionReceipt from './pages/CollectionReceipt/CollectionReceipt';
function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/pettycash" element={<PettyCash />} />
           <Route path="/pettycash" element={<PettyCash />} />
           <Route path="/collectionreceipt" element={<CollectionReceipt />} />
     
        </Routes>
 </BrowserRouter>
    </>
  )
}

export default App
