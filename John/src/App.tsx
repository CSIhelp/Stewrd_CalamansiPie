
import './App.css'
import Dashboard from './pages/Dashboard/Dashboard'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Invoice from './pages/Invoice/Invoice'
function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/invoice" element={<Invoice />} />
        </Routes>
 </BrowserRouter>
    </>
  )
}

export default App
