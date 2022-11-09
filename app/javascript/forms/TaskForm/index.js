import { pick, propOr } from 'ramda';

export default {
  defaultAttributes(attributes) {
    return {
      name: '',
      description: '',
      ...attributes,
    };
  },

  attributesToSubmit(task) {
    const pertmittedKeys = ['id', 'name', 'description'];

    return {
      ...pick(pertmittedKeys, task),
      authorId: propOr(null, 'id', task.author),
      assigneeId: propOr(null, 'id', task.assignee),
      expiredAt: task.expiredAt,
    };
  },
};
