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
                    <Route path="/resorts" element={<SkiResortList />} />
                    <Route path="/resort/:id" element={<SkiResortDetail />} />
                    <Route path="/dashboard" element={<SkiResortDashboard />} />
                    <Route path="/dashboard/:id" element={<SkiResortDashboard />} />
                    <Route path="/add-resort" element={<AddResort />} />
                    <Route path="/remove-resort" element={<RemoveResort />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;















