// Run this example by adding <%= javascript_pack_tag 'TaskBoard_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>TaskBoard React</div> at the bottom
// of the page.

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function TaskBoard({ title }) {
  return <div>TaskBoard {title}!</div>;
}

TaskBoard.defaultProps = {
  title: 'Task Board',
};

TaskBoard.propTypes = {
  title: PropTypes.string,
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<TaskBoard />, document.body.appendChild(document.createElement('div')));
});
