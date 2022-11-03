import React from 'react';
import PropTypes from 'prop-types';

function Task({ task }) {
  console.log('task: ', task);
  return <div>Task</div>;
}
Task.propTypes = {
  task: PropTypes.shape().isRequired,
};

export default Task;
