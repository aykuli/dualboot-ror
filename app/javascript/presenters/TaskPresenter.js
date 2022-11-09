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
      const isoDate = new Date(this.expiredAt(task));
      const year = isoDate.getFullYear();
      const month = isoDate.getMonth();
      const date = isoDate.getDate();

      return `${date}/${month}/${year}`;
    },
    invalid(task) {
      return !(this.name(task) && this.description(task) && this.assignee(task));
    },
    title(task) {
      return `Task # ${this.id(task)} [${this.name(task)}]`;
    },
  },
);
