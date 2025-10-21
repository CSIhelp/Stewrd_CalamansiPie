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
import ChequeDisburment from './pages/ChequeDisbursement/ChequeDisbursement';
import Deposit from './pages/Deposit/Deposit';
import Withdraw from './pages/Withdraw/Withdraw';
import Transfer from './pages/Transfer/Transfer';
import UserManual from './pages/UserManual/UserManual';


//N8n frames
import PaymentFrame from "./pages/Payments/PaymentFrame";
import BillsFrame from "./pages/Bills/BillFrame";
import PettyCashFrame from "./pages/PettyCash/PettyCashFrame";
import InvoiceFrame from "./pages/Invoice/InvoiceFrame";
import CollectionReceiptFrame from "./pages/CollectionReceipt/CollectionReceiptFrame";
import WithdrawFrame from "./pages/Withdraw/WithdrawFrame";
import TransferFrame from "./pages/Transfer/TransferFrame";
import DepositFrame from "./pages/Deposit/DepositFrame";
import ChequeDisbursementFrame from "./pages/ChequeDisbursement/ChequeDisbursementFrame";
import BankReconciliationFrame from "./pages/BankReconciliation/BankReconciliationFrame";
import LooseLeafFrame from "./pages/LooseLeaf/LooseLeafFrame";

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
          <ProtectedRoute accountantOnly={true}>
            <BankReconciliation/>
          </ProtectedRoute>
        } />
                <Route path="/looseleaf" element={
          <ProtectedRoute accountantOnly={true}>
            <LooseLeaf />
          </ProtectedRoute>
        } />
        <Route path="/chequedisbursement" element={
          <ProtectedRoute>
            <ChequeDisburment />
          </ProtectedRoute>
        } />
                <Route path='/deposit' element={
          <ProtectedRoute>
            <Deposit />
          </ProtectedRoute>
        } />
                <Route path='/withdraw' element={
          <ProtectedRoute>
            <Withdraw/>
          </ProtectedRoute>
        } />
                <Route path='/transfer' element={
          <ProtectedRoute>
            <Transfer />
          </ProtectedRoute>
        } />
        <Route path="/Documentation" element={
          <ProtectedRoute accountantOnly={true}>
            <Documentation />
          </ProtectedRoute>
        } />
        <Route path="/userManagement" element={
          <ProtectedRoute adminaccountantOnly={true} >
            <UserManagement />
          </ProtectedRoute>
        } />
        <Route path = "/contact" element = {
           <ProtectedRoute  >
            <ContactUs />
          </ProtectedRoute>
        }/>
        
        <Route
          path="/paymentform"
          element={
            <ProtectedRoute>
              <PaymentFrame />
            </ProtectedRoute>
          }
        />
        <Route
          path="/billsform"
          element={
            <ProtectedRoute>
              <BillsFrame />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pettycashform"
          element={
            <ProtectedRoute>
              <PettyCashFrame />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invoiceform"
          element={
            <ProtectedRoute>
              <InvoiceFrame />
            </ProtectedRoute>
          }
        />
        <Route
          path="/collectionreceiptform"
          element={
            <ProtectedRoute>
              <CollectionReceiptFrame />
            </ProtectedRoute>
          }
        />

        <Route
          path="/withdrawform"
          element={
            <ProtectedRoute>
              <WithdrawFrame />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transferform"
          element={
            <ProtectedRoute>
              <TransferFrame />
            </ProtectedRoute>
          }
        />

        <Route
          path="/depositform"
          element={
            <ProtectedRoute>
              <DepositFrame />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chequedisbursementform"
          element={
            <ProtectedRoute>
              <ChequeDisbursementFrame />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bankreconciliationform"
          element={
            <ProtectedRoute>
              <BankReconciliationFrame />
            </ProtectedRoute>
          }
        />
                <Route
          path="/looseleafform"
          element={
            <ProtectedRoute>
              <LooseLeafFrame />
            </ProtectedRoute>
          }
        />
        <Route path="/usermanual" element={
          <ProtectedRoute>
            <UserManual />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
