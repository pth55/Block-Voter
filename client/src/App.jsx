import { Route, Routes, useLocation } from 'react-router-dom';
import Landing from "./pages/Landing/Landing";
import AdminDashboard from "./pages/Dashboard/Admin/AdminDashboard";
import VoterDashboard from "./pages/Dashboard/Voter/VoterDashboard";
import VoterPrivateRoute from './components/VoterPrivateRoute';
import AdminPrivateRoute from './components/AdminPrivateRoute';

function App() {
  // Set background color conditionally
  const location = useLocation();
  const backgroundColor = location.pathname === '/' || location.pathname === '/home' || location.pathname === '/contact' || location.pathname === '/about'  ? 'bg-orange-100' : 'bg-white';
  
  return (
    <div className={`${backgroundColor} h-[100svh]`}>
      <div className="pt-[5rem]">
        <Routes>
          {/* Render Landing page for main routes */}
          <Route path="/*" element={<Landing />} />
          
          {/* Admin and Voter Dashboard routes */}
          <Route path='/voterDashboard' element={
            <VoterPrivateRoute>
              <VoterDashboard />
            </VoterPrivateRoute>
          } />

          <Route path='/adminDashboard' element={
            <AdminPrivateRoute>
              <AdminDashboard />
            </AdminPrivateRoute>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
