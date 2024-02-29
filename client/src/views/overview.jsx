// Dependencies
import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { ContentCard, LoadingShim, Row } from '@narmi/design_system';
import styled from 'styled-components';

// Actions
import { getAccounts } from '../actions/accounts';

// Components
import Accounts from '../components/accounts/list';

// Overview
const Overview = ({ loading }) => {
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
    <NarmiContainer>
      <h1>Novotta</h1>
      <p>Access Code: {localStorage.getItem('code')}</p>
      <LoadingShim isLoading={loading}>
        <ContentCard>
          <Row alignItems="center">
            <Row.Item>
              <h3 className="fontFamily--body fontSize--l">Account details</h3>
            </Row.Item>
          </Row>
          <Accounts />
        </ContentCard>
      </LoadingShim>
    </NarmiContainer>
  )
}

// Map State to Props
const mapStateToProps = (state) => {
  console.log("STATE");
  console.log(state);
  return {
    loading: false,
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

// Styles
const NarmiContainer = styled.div`
  width: 1300px;
`;