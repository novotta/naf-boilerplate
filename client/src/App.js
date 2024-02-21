import React from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function YourComponent() {
  let query = useQuery();

  return (
    <div>
      <h1>Novotta</h1>
      <p>Query: {query}</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <YourComponent />
        </Route>
        {/* Other routes */}
      </Switch>
    </Router>
  );
}

export default App;