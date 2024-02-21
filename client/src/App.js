import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function YourComponent() {
  let query = useQuery();
  let token = query.get('token');
  let secret = query.get('secret');

  return (
    <div>
      <h1>Novotta</h1>
      <p>Token: {token}</p>
      <p>Secret: {secret}</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<YourComponent />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;