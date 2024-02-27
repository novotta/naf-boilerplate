// Dependencies
import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Button } from '@narmi/design_system';

// Actions
import { getAccounts } from '../actions/accounts';

// Overview
const Overview = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codeFromURL = params.get('code');

    if (codeFromURL) {
      localStorage.setItem('code', codeFromURL);
      // After dispatching the setCode, call the getAccounts action
      dispatch(getAccounts());
    }
  }, [dispatch]);

  return (
    <div>
      <h1>Novotta</h1>
      <p>Access Code: {localStorage.getItem('code')}</p>
      <Button
  as="button"
  kind="primary"
  label="Submit"
  size="m"
  type="button"
/>
    </div>
  )
}

// Map State to Props
const mapStateToProps = (state) => {
  console.log("STATE");
  console.log(state);
  return {
    //code: state.code.value
  }
}

// Map Dispatch to Props
const mapDispatchToProps = (dispatch) => {
  return {
    //getAccounts: () => dispatch(getAccounts()),
  }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(Overview);