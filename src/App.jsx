import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Advisory from './pages/Advisory';
import OnlineClasses from './pages/OnlineClasses';
import About from './pages/About';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';


import Overview from './pages/dashboard/Overview';
import AdvisoryCalls from './pages/dashboard/AdvisoryCalls';
import CourseLearning from './pages/dashboard/CourseLearning';
import Profile from './pages/dashboard/Profile';
import PaymentHistory from './pages/dashboard/PaymentHistory';
import MySubscription from './pages/dashboard/MySubscription';

import AdminLayout from './pages/admin/AdminLayout';
import AdminOverview from './pages/admin/AdminOverview';
import ManageCalls from './pages/admin/ManageCalls';
import ManageUsers from './pages/admin/ManageUsers';
import ManageCourses from './pages/admin/ManageCourses';
import ManagePayments from './pages/admin/ManagePayments';
import AdminSettings from './pages/admin/AdminSettings';
import AdminLogin from './pages/admin/AdminLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="advisory" element={<Advisory />} />
          <Route path="classes" element={<OnlineClasses />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          
          <Route path="disclaimer" element={<Legal title="Disclaimer" />} />
          <Route path="privacy" element={<Legal title="Privacy Policy" />} />
          <Route path="terms" element={<Legal title="Terms & Conditions" />} />
          <Route path="refund" element={<Legal title="Refund/Cancellation Policy" />} />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {/* Protected authenticated routes inheriting the top navbar */}
          <Route element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
            <Route path="dashboard" element={<Overview />} />
            <Route path="advisory-calls" element={<AdvisoryCalls />} />
            <Route path="my-course" element={<CourseLearning />} />
            <Route path="profile" element={<Profile />} />
            <Route path="payment-history" element={<PaymentHistory />} />
            <Route path="my-subscription" element={<MySubscription />} />
          </Route>
        </Route>
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="calls" element={<ManageCalls />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="courses" element={<ManageCourses />} />
          <Route path="payments" element={<ManagePayments />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="*" element={
          <div className="h-screen flex flex-col items-center justify-center bg-navy-900 border-t-4 border-brand-blue">
            <h1 className="text-7xl font-black text-white mb-4">404</h1>
            <p className="text-text-muted text-xl font-medium">Page Not Found</p>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
