// Dependencies
import React, { useState, useEffect } from "react";


const ThreadModal = props => {
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

  const createThread = data => { // editAccount
    setIsLoading(true);
    console.log("MODAL CREATE THREAD")
    console.log(data);
    props.createThread(data);
  };

  const {
    show,
    setValue,
    state,
    thread,
    closeThreadModal
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
      id="threadModal"
      className="modal fade in modal-background"
      // , {
      //   modalShow: show
      // })}
    >
      <div className="formCover" />
      {/* {modalContent} */}
      <form>
        <fieldset>
          <label className="control-label">Subject</label>
          <input
            tabIndex="1"
            onKeyDown={handleEnter}
            onChange={(e) => props.setValue(e)}
            name="name"
            value={state.thread.subject}
            type="text"
            id="ThreadSubject"
          />
        </fieldset>
        <fieldset>
          <label className="control-label">Message</label>
          <input
            tabIndex="1"
            onKeyDown={handleEnter}
            onChange={(e) => props.setValue(e)}
            name="name"
            value={state.thread.body}
            type="text"
            id="ThreadMessage"
          />
        </fieldset>
        <button
          onClick={createThread}
          type="button"
          className="btn btn-sm btn-primary"
          id="threadButton"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default ThreadModal;