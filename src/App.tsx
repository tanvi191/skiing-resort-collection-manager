import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import SkiResortList from './components/SkiResortList';
import SkiResortDetail from './components/SkiResortDetail';
import SkiResortDashboard from './components/SkiResortDashboard';
import AddResort from './components/AddResort';
import RemoveResort from './components/RemoveResort';
import './App.css';

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/resorts" element={<div className="content-container"><SkiResortList /></div>} />
                    <Route path="/resort/:id" element={<div className="content-container"><SkiResortDetail /></div>} />
                    <Route path="/dashboard" element={<div className="content-container"><SkiResortDashboard /></div>} />
                    <Route path="/add-resort" element={<div className="content-container"><AddResort /></div>} />
                    <Route path="/remove-resort" element={<div className="content-container"><RemoveResort /></div>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;







