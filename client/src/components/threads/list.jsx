// Dependencies
import React from 'react';
import styled from 'styled-components';

// Components
import { Row } from '@narmi/design_system';

// Threads
const Threads = (props) => {
  if (!props.state.data || props.state.data.length === 0) {
    return (
      <>
        <p>No threads found.</p>
      </>
    );
  } else {
    return (
      <div>
        {props.state.data.map((thread) => (
          <div key={thread.id}>
            <Row alignItems="center" justifyContent="start" gapSize="l">
              <Row.Item>
                <div>{thread.subject}</div>
              </Row.Item>
            </Row>
          </div>
        ))}
      </div>
    );
  }
};

// Export
export default Threads;

// Styles
