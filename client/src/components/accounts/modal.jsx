// Dependencies
import React, { useState } from "react";
import { Button, TextInput } from "@narmi/design_system";
import styled from 'styled-components';

// AccountModal
const AccountModal = props => {
  const [isLoading, setIsLoading] = useState(false);

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
    props.editAccount(data);
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
            label="Name"
            onBlur={function noRefCheck(){}}
            tabIndex="1"
            onKeyDown={handleEnter}
            onChange={(e) => props.setValue(e)}
            name="name"
            value={state.account.name}
            type="text"
            id="AccountName"
          />
        </FormGroup>
        <Button
          as="button"
          kind="primary"
          label={isLoading ? "Loading..." : "Save"}
          onClick={editAccount}
          size="m"
          type="button"
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

// Export
export default AccountModal;

// Styles
const FormGroup = styled.fieldset`
  border: 0;
  margin: 0 0 16px;
  padding: 0;
`;