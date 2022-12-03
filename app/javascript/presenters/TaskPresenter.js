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
    twoDigit(value) {
      return `${value < 10 ? '0' : ''}${value}`;
    },
    dateObject(task) {
      const isoDate = new Date(this.expiredAt(task));
      const year = isoDate.getFullYear();
      const month = isoDate.getMonth();
      const date = isoDate.getDate();

      return { year, month, date };
    },
    expiredDate(task) {
      if (!this.expiredAt(task)) {
        return null;
      }

      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      const date = new Date(this.expiredAt(task));
      return date.toLocaleDateString(undefined, options);
    },
    dateInputExpiredAt(task) {
      if (!this.expiredAt(task)) {
        return null;
      }

      const { year, month, date } = this.dateObject(task);
      return `${year}-${this.twoDigit(month)}-${this.twoDigit(date)}`;
    },
    isInvalid(task) {
      return !(this.name(task) && this.description(task) && this.assignee(task));
    },
    title(task) {
      return `Task #${this.id(task)} [${this.name(task)}]`;
    },
  },
);
