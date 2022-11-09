/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import PropTypesPresenter from 'utils/PropTypesPresenter';

export default new PropTypesPresenter(
  {
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    assignee: PropTypes.shape(),
    author: PropTypes.shape(),
    expiredAt: PropTypes.string,
  },
  {
    expiredDate(task) {
      const isoDate = new Date(task.expiredAt);
      const delimiter = '/';
      const year = isoDate.getFullYear();
      const month = isoDate.getMonth();
      const date = isoDate.getDate();

      return `${date}/${month}/${year}`;
    },
    valid(task) {
      return !!(task.name && task.description && task.assignee);
    },
  },
);
