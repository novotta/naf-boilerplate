// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// Components
import { Row } from '@narmi/design_system';
import Account from './account';

// Accounts
const Accounts = ({ accounts, accountType }) => {
  const favoriteAccounts = accounts.filter(account => account.favorited);
  const listAccounts = accounts.filter(account => account.type === accountType);
  const printedAccounts = accountType === 'favorite' ? favoriteAccounts : listAccounts;

  return (
    <>
      <AccountGroupHeader role="button" tabIndex="0">
        <div className="fontWeight--bold padding--y--xs">
          <Row alignItems="center" justifyContent="start" gapSize="l">
            <Row.Item>
              <GroupName>{accountType} Accounts</GroupName>
            </Row.Item>
          </Row>
        </div>
      </AccountGroupHeader>
      <div className="account-rows">
        {printedAccounts.map((account) => (
          <Account key={account.id} account={account} />
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    accounts: state.accountList.accounts
  }
}

// Export
export default connect(mapStateToProps)(Accounts);

// Styles
const AccountGroupHeader = styled.div`
  &:not(:first-of-type) {
    padding-top: 16px !important;
  }
`;

const GroupName = styled.div`
  color: RGBA(var(--primary-accessible-color));
  display: flex;
  flex-direction: row;
  text-transform: capitalize;
`;