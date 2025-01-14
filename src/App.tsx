import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SkiResortList from './components/SkiResortList';
import SkiResortDetail from './components/SkiResortDetail';
import SkiResortDashboard from './components/SkiResortDashboard';
import HomePage from './components/HomePage';
import './App.css';

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/" element={<SkiResortList />} />
                    <Route path="/resort/:id" element={<SkiResortDetail />} />
                    <Route path="/dashboard/:id" element={<SkiResortDashboard />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;



