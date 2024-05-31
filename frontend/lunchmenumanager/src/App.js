import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './component/NavBar';
import { AuthProvider, useAuth } from './component/AuthContext';
import Home from './component/Home';
import Login from './component/Login';
import Signup from './component/Signup';
import AddMenu from './component/AddMenu';
import EmployeeChoices from './component/EmployeeChoices';
import DailyMenu from './component/DailyMenu';
import SelectLunch from './component/SelectLunch';

const ProtectedRoute = ({ children, roleRequired }) => {
  const { isLoggedIn, role } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />


            <Route
              path="/addmenu"
              element={
                <ProtectedRoute roleRequired="admin">
                  <AddMenu />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employeechoices"
              element={
                <ProtectedRoute roleRequired="admin">
                  <EmployeeChoices />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dailymenu"
              element={
                <ProtectedRoute>
                  <DailyMenu />
                </ProtectedRoute>
              }
            />
            <Route
              path="/selectlunch"
              element={
                <ProtectedRoute>
                  <SelectLunch />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;