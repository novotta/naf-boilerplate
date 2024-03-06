// Dependencies
import React from "react";
import styled from 'styled-components';

// Components
import { formatNumber, Popover, Row } from '@narmi/design_system';

// Account
const Account = (props) => {

  const { account } = props;

  return (
    <AccountRow key={account.id} className="padding--y--m">
      <Row alignItems="center" justifyContent="start" gapSize="l">
        <Row.Item>
          <span role="button" tabIndex="0">
            {account.name} - {account.number.slice(-4)}
          </span>
        </Row.Item>
        <Row.Item shrink>
          <BalanceOptions>
            <span role="button" tabIndex="0">
              <span className="margin--right--xxs fontColor--primary">
                {formatNumber(account.balances.primary / 100, "currency")}
              </span>
            </span>
            <div className="options" style={{width: 'auto', position: 'relative'}}>
              <Popover
                alignment="end"
                content={
                  !account.favorited ? (
                    <>
                    <div onClick={() => { props.editFavorited(account, true); }}>
                      Favorite
                    </div>
                    <div
                      onClick={() => { props.editAccountModal(account); }}>
                        Edit
                    </div>
                  </>
                  ) : (
                    <>
                      <div onClick={() => { props.editFavorited(account, false); }}>
                        Unfavorite
                      </div>
                      <div
                        onClick={() => { props.editAccountModal(account); }}>
                          Edit
                      </div>
                    </>
                  )

                }
                onUserDismiss={function noRefCheck() {}}
                side="bottom"
                wrapperDisplay="inline-flex"
              >
                <div className="options-traffic-light  ">
                  <span className="clickable narmi-icon-more-vertical"></span>
                </div>
              </Popover>
            </div>
          </BalanceOptions>
        </Row.Item>
      </Row>
      {/* {name, nickname, id, number, type, product, updated_at, users, features, routing, loan_details, source, state, favorited, hidden, out_of_date, updated_from_source_at, check_micr, metadata, balances, fi_name, created_at, verified, fi_svg} */}
    </AccountRow>
  );
};

// Export
export default Account;

// Styles
const AccountRow = styled.div`
  border-top: 1px solid rgba(var(--nds-lightest-grey));

  &:hover {
    background: RGBA(var(--theme-rgb-primary), var(--hover-opacity));
  }
`;

const BalanceOptions = styled.div`
  display: flex;
  flex-direction: row;

  * {
    align-items: center;
    color: var(--color-grey);
    display: flex;
    justify-content: center;
  }
`;