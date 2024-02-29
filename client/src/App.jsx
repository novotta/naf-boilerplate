// Dependencies
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';

// Narmi Design System
import "@narmi/design_system/dist/style.css";

// Views
import Overview from './views/overview';

// App
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Overview />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

// Map State to Props
const mapStateToProps = (state) => {
  return {
    loading: false
  }
}

// Map Dispatch to Props
const mapDispatchToProps = (dispatch) => {
  return {
    //checkAuth: () => dispatch(checkAuth())
  }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(App);



