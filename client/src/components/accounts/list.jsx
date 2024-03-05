// Dependencies
import React from 'react';
import styled from 'styled-components';

// Components
import { Row } from '@narmi/design_system';
import Account from './account';

// Accounts
const Accounts = (props) => {
  if (!props.state.data || props.state.data.length === 0) {
    return (
      <>
        <p>No accounts found.</p>
      </>
    );
  } else {
    const favoriteAccounts = props.state.data.filter(account => account.favorited);
    const listAccounts = props.state.data.filter(account => account.type === props.accountType);
    const printedAccounts = props.accountType === 'favorite' ? favoriteAccounts : listAccounts;

    return (
      <>
        <AccountGroupHeader role="button" tabIndex="0">
          <div className="fontWeight--bold padding--y--xs">
            <Row alignItems="center" justifyContent="start" gapSize="l">
              <Row.Item>
                <GroupName>{props.accountType} Accounts</GroupName>
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
  }
};

// Export
export default Accounts;

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