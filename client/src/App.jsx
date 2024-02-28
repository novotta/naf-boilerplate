// Dependencies
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';

// Narmi Design System
import "@narmi/design_system/dist/style.css";

// Views
import Overview from './views/overview';


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

const mapStateToProps = (state) => {
  console.log(state);
  return {
    loading: false
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //checkAuth: () => dispatch(checkAuth())
  }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(App);



