// Dependencies
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Narmi Design System
import "@narmi/design_system/dist/style.css";

// Views
import Overview from './views/overview';
import Messages from './views/messages';

// App
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </Router>
  );
}

// Export
export default App;



