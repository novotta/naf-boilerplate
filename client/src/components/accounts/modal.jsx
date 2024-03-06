import React, { useState, useEffect } from "react";
// import classnames from "classnames";
// import GoalSettings from "./goalSettings";
// import EditGoal from "./editGoal";
// import Alert from "./alert";
// import DeleteAlert from "./deleteAlert";
// import GoalTransfer from "./goalTransfer";

const AccountModal = props => {
  const [isLoading, setIsLoading] = useState(false);
  // const [transfer, setTransfer] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
    }
  }, [props.show]);

  // useEffect(() => {
  //   if (isLoading && props.account.error) {
  //     setIsLoading(false);
  //   }
  // }, [props.account.error]);

  const handleEnter = event => {
    if (event.keyCode === 13) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      if (event.target.name === "name") {
        document.activeElement.blur();
      }
      event.preventDefault();
    }
  };

  const editAccount = data => {
    setIsLoading(true);
    console.log("MODAL EDIT ACCOUNT")
    console.log(data);
    props.editAccount(data);
  };

  const {
    show,
    setValue,
    state,
    account,
    closeAccountModal
  } = props;


  // let modalContent = (
  //   <EditAccount
  //     closeAccountModal={closeAccountModal}
  //     modalTitle={modalTitle}
  //     handleEnter={handleEnter}
  //     setValue={setValue}
  //     state={state.account}
  //     account={account}
  //     button={button}
  //     show={show}
  //   />
  // );

  return (
    <div
      id="accountModal"
      className="modal fade in modal-background"
      // , {
      //   modalShow: show
      // })}
    >
      <div className="formCover" />
      {/* {modalContent} */}
      <form>
        <fieldset>
          <label className="control-label">Name</label>
          <input
            tabIndex="1"
            onKeyDown={handleEnter}
            onChange={(e) => props.setValue(e)}
            name="name"
            value={state.account.name}
            type="text"
            id="AccountName"
          />
        </fieldset>
        <button
          onClick={editAccount}
          type="button"
          className="btn btn-sm btn-primary"
          id="accountButton"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default AccountModal;