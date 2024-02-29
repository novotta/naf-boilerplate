// Dependencies
import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { ContentCard, LoadingShim, Row } from '@narmi/design_system';
import styled from 'styled-components';

// Actions
import { getAccounts } from '../actions/accounts';

// Components
import List from '../components/accounts/list';

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
      <PageLayout>
        <LeftLayout>
          <LoadingShim isLoading={loading}>
            <ContentCard kind="elevated">
              <Row alignItems="center">
                <Row.Item>
                  <h3 className="fontFamily--body fontSize--l">Balances</h3>
                </Row.Item>
              </Row>
              <List accountType="favorite" />
              <List accountType="deposit" />
              <List accountType="credit" />
            </ContentCard>
          </LoadingShim>
        </LeftLayout>
        <RightLayout>
          <ContentCard kind="elevated">
            <Row alignItems="center">
              <Row.Item>
                <h3 className="fontFamily--body fontSize--l">Messages</h3>
              </Row.Item>
            </Row>
          </ContentCard>
        </RightLayout>
      </PageLayout>
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

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 1280px) {
    display: grid;
    gap: 1.33rem;
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  }
`;

const LeftLayout = styled.div`
  order: 2;

  @media screen and (min-width: 1280px) {
    grid-column-start: 1;
    order: 1;
    position: relative;
  }
`;

const RightLayout = styled.div`
  order: 1;

  @media screen and (min-width: 1280px) {
    grid-column-start: 2;
    order: 1;
    position: relative;
  }
`;