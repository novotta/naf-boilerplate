// Dependencies
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ContentCard, Dialog, LoadingShim, Row } from '@narmi/design_system';
import styled from 'styled-components';

// Actions
import {
  editAccount,
  getAccounts,
  setAccountError,
  setAccountSaved,
  setAccountTouched
} from '../actions/accounts';
import {
  getThreads
} from '../actions/threads';

// Components
import AccountsList from '../components/accounts/list';
import AccountModal from '../components/accounts/modal';
import errors from '../components/errors';
import ThreadsList from '../components/threads/list';

// Initial State
const initialState = {
  account: {
    id: null,
    name: '',
    favorited: false,
    hidden: false
  }
};

// Overview
const Overview = (props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [account, setAccount] = useState(initialState.account);

  const state = {
    account
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codeFromURL = params.get('code');

    if (codeFromURL) {
      localStorage.setItem('code', codeFromURL);
      props.getAccounts();
      props.getThreads();
    }
  }, []);

  const editAccountModal = (data) => {
    window.scrollTo(0, 0);
    console.log('EDIT ACCOUNT MODAL');
    console.log(data);
    setAccount({
      id: data.id,
      name: data.name,
      favorited: data.favorited,
      hidden: false
    });
    setIsDialogOpen(true);
  };

  const editAccount = () => {
    props.setAccountError(null);
    const { name, favorited, hidden } = account;

    console.log('EDIT ACCOUNT OVERVIEW')
    props.setAccountTouched(false);
    props.editAccount({ account });
  };

  const editFavorited = (account, favorited) => {
    props.setAccountError(null);
    props.setAccountTouched(false);
    props.editAccount({ account: {id: account.id, name: account.name, favorited: favorited, hidden: false }});
  };

  const setAccountValue = (e) => {
    console.log('SET ACCOUNT VALUE');
    props.setAccountTouched(true);
    props.setAccountSaved(false);
    if (e != null && e.target != null) {
      const { name, value } = e.target;

      setAccount((account) => ({
        ...account,
        [name]: value,
      }));
    }
  };

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
              <AccountsList
                accounts={props.accounts}
                accountType="favorite"
                editFavorited={editFavorited}
                editAccountModal={editAccountModal}
              />
              <AccountsList
                accounts={props.accounts}
                accountType="deposit"
                editFavorited={editFavorited}
                editAccountModal={editAccountModal}
              />
              <AccountsList
                accounts={props.accounts}
                accountType="credit"
                editFavorited={editFavorited}
                editAccountModal={editAccountModal}
              />
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
        <Dialog isOpen={isDialogOpen} title={`Edit Account`} onUserDismiss={() => { setIsDialogOpen(false); }}>
          <AccountModal
            setValue={setAccountValue}
            state={state}
            account={state.account}
            editAccount={editAccount}
            setAccountTouched={props.setAccountTouched}
          />
        </Dialog>
      </NarmiContainer>
    )
  }

  return <LoadingShim true />;
}

// Map State to Props
const mapStateToProps = (state) => {
  const {
    account,
    accounts,
    threads
  } = state;
  return {
    account,
    accounts,
    threads
  };
};

// Map Dispatch to Props
const mapDispatchToProps = {
  getAccounts,
  editAccount,
  setAccountError,
  setAccountSaved,
  setAccountTouched,
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