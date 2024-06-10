import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import { UserProvider } from './contexts/UserContext';
import { TaskProvider } from './contexts/TaskContext';

function App() {
  return (
    <Router>
      <TaskProvider>
        <UserProvider>
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route 
                path="/" 
                element={
                    <PrivateRoute>
                        <TaskList />
                    </PrivateRoute>
                } 
            />
            <Route 
                path="/new-task" 
                element={
                    <PrivateRoute>
                        <TaskForm />
                    </PrivateRoute>
                } 
            />
            <Route 
                path="/edit-task/:id" 
                element={
                    <PrivateRoute>
                        <TaskForm />
                    </PrivateRoute>
                } 
            />
          </Routes>
        </UserProvider>
      </TaskProvider>
    </Router>
  );
}

export default App;
