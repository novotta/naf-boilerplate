// Dependencies
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ContentCard, LoadingShim, Row } from '@narmi/design_system';
import styled from 'styled-components';

// Actions
import {
  getAccounts
} from '../actions/accounts';
import {
  getThreads
} from '../actions/threads';

// Components
import AccountsList from '../components/accounts/list';
import ThreadsList from '../components/threads/list';
import Threads from '../reducers/threads';

// Overview
const Overview = (props) => {

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codeFromURL = params.get('code');

    if (codeFromURL) {
      localStorage.setItem('code', codeFromURL);
      props.getAccounts();
      props.getThreads();
    }
  }, []);

  if (props.accounts.data !== null && props.threads.data !== null) {
    return (
      <NarmiContainer>
        <h1>Novotta</h1>
        <p>Access Code: {localStorage.getItem('code')}</p>
        <PageLayout>
          <LeftLayout>
            <ContentCard kind="elevated">
              <Row alignItems="center">
                <Row.Item>
                  <h3 className="fontFamily--body fontSize--l">Balances</h3>
                </Row.Item>
              </Row>
              <AccountsList state={props.accounts} accountType="favorite" />
              <AccountsList state={props.accounts} accountType="deposit" />
              <AccountsList state={props.accounts} accountType="credit" />
            </ContentCard>
          </LeftLayout>
          <RightLayout>
            <ContentCard kind="elevated">
              <Row alignItems="center">
                <Row.Item>
                  <h3 className="fontFamily--body fontSize--l">Messages</h3>
                </Row.Item>
              </Row>
              <ThreadsList state={props.threads} />
            </ContentCard>
          </RightLayout>
        </PageLayout>
      </NarmiContainer>
    )
  }

  return <LoadingShim true />;
}

// Map State to Props
const mapStateToProps = (state) => {
  const {
    accounts,
    threads
  } = state;
  return {
    accounts,
    threads
  };
};

// Map Dispatch to Props
const mapDispatchToProps = {
  getAccounts,
  getThreads
};

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