// Dependencies
import React, { useState } from "react";
import { Button, TextInput } from "@narmi/design_system";
import styled from 'styled-components';

// Thread Modal
const ThreadModal = props => {
  const [isLoading, setIsLoading] = useState(false);

  const handleEnter = event => {
    console.log("FIRE")
    if (event.keyCode === 13) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      if (event.target.name === "subject") {
        document.activeElement.blur();
      }
      event.preventDefault();
    }
  };

  const createThread = data => { // editAccount
    setIsLoading(true);
    props.createThread(data);
    setIsLoading(false);
  };

  const {
    state
  } = props;

  return (
    <div>
      <form>
        <FormGroup>
          <TextInput
            label="Subject"
            tabIndex="1"
            onKeyDown={handleEnter}
            onChange={(e) => props.setValue(e)}
            name="subject"
            value={state.thread.subject}
            type="text"
            id="ThreadSubject"
          />
        </FormGroup>
        <FormGroup>
          <TextInput
            multiline
            label="Body"
            tabIndex="2"
            onKeyDown={handleEnter}
            onChange={(e) => props.setValue(e)}
            name="body"
            value={state.thread.body}
            type="text"
            id="ThreadMessage"
          />
        </FormGroup>
        <Button
          as="button"
          kind="primary"
          label={isLoading ? "Loading..." : "Save"}
          onClick={createThread}
          size="m"
          type="button"
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

// Export
export default ThreadModal;

// Styles
const FormGroup = styled.fieldset`
  border: 0;
  margin: 0 0 16px;
  padding: 0;
`;