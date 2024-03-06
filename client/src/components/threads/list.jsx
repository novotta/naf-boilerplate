// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';


// Components
import { Row } from '@narmi/design_system';

// Threads
const Threads = (props) => {
  if (!props.threads.data || props.threads.data.length === 0) {
    return (
      <>
        <p>No threads found.</p>
      </>
    );
  } else {
    return (
      <div>
        {props.threads.data.map((thread) => (
          <Row key={thread.id} alignItems="center" justifyContent="start" gapSize="l">
            <Row.Item>
              <div>
                <div>{thread.subject}</div>
                <div>{thread.updated_at}</div>
              </div>
            </Row.Item>
          </Row>
        ))}
      </div>
    );
  }
};


// Export
export default Threads;

// Styles
