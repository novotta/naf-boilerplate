// Dependencies
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import styled from 'styled-components';

// Components
import { formatNumber, Popover, Row } from '@narmi/design_system';

// Actions
import {
  favoriteAccount,
  unfavoriteAccount,
  resetFavoriteAccount,
  resetUnfavoriteAccount,
} from '../../actions/accounts';


// Account
const Account = ({ account, favoriteAccount, unfavoriteAccount, resetFavoriteAccount, resetUnfavoriteAccount, accountFavorite, accountUnfavorite }) => {

  // const [isAccountFavorited, setIsAccountFavorited] = useState(false);

  // const { error: errorAccountFavorite, success: successAccountFavorite } = accountFavorite;
  // const { error: errorAccountUnfavorite, success: successAccountUnfavorite } = accountUnfavorite;

  // const favoriteAccountHandler = () => {
  //   favoriteAccount(account.id);
  // };
  // const unfavoriteAccountHandler = () => {
  //   unfavoriteAccount(account.id);
  // };

  useEffect(() => {
    // const index = post.likes.findIndex(
    //   (l) => String(l.user.id) === String(user.profile.id)
    // );

    // TODO: DELETE
    // if (index === -1) setIsPostLiked(false);
    // else setIsPostLiked(true);
    // setNbrLikes(post.likes.length);


    // if (error) {
    //   showAlert({
    //     type: "danger",
    //     title: "error",
    //     content: error,
    //   });
    // }

    // if (errorPostLike) {
    //   // showAlert({
    //   //   type: "danger",
    //   //   title: "error",
    //   //   content: errorPostLike,
    //   // });
    //   resetLikePost();
    // }

    // if (errorPostUnlike) {
    //   // showAlert({
    //   //   type: "danger",
    //   //   title: "error",
    //   //   content: errorPostUnlike,
    //   // });
    //   resetUnlikePost();
    // }
    // if (successAccountFavorite) {
    //   setIsAccountFavorited(true);
    //   resetFavoriteAccount();
    // }
    // if (successAccountUnfavorite) {
    //   setIsAccountFavorited(false);
    //   resetUnfavoriteAccount();
    // }
  }, [
    // resetUnfavoriteAccount,
    // resetFavoriteAccount,
    // errorAccountFavorite,
    // errorAccountUnfavorite,
    // successAccountFavorite,
    // successAccountUnfavorite,
    // post.likes,
    // showAlert,
    // userInfo,
    // error
  ]);

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

            </div>
          </BalanceOptions>
        </Row.Item>
      </Row>
      {/* {name, nickname, id, number, type, product, updated_at, users, features, routing, loan_details, source, state, favorited, hidden, out_of_date, updated_from_source_at, check_micr, metadata, balances, fi_name, created_at, verified, fi_svg} */}
    </AccountRow>
  );
};

const mapStateToProps = (state) => {
  const { accountFavorite, accountUnfavorite } = state;
  return { accountFavorite, accountUnfavorite };
};

const mapDispatchToProps = (dispatch) => {
  return {
    favoriteAccount: (id) => dispatch(favoriteAccount(id)),
    unfavoriteAccount: (id) => dispatch(unfavoriteAccount(id)),
    resetFavoriteAccount: () => dispatch(resetFavoriteAccount()),
    resetUnfavoriteAccount: () => dispatch(resetUnfavoriteAccount()),
  };
};

// Export
export default connect(mapStateToProps, mapDispatchToProps)(Account);

// Styles
const AccountRow = styled.div`
  border-top: 1px solid rgba(var(--nds-lightest-grey));

  &:hover {
    background: RGBA(var(--theme-rgb-primary), var(--hover-opacity));
    cursor: pointer;
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