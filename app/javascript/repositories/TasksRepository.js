import routes from '../routes';
import FetchHelper from '../../../utils/fetchHelper';

export default {
  index(params) {
    const path = routes.api_v1_tasks_path();
    return FetchHelper.get(path, params);
  },

  show(id) {
    const path = routes.api_v1_task_path(id);
    return FetchHelper.get(path);
  },

  update(id, task = {}) {
    const path = routes.api_v1_task_path(id);
    return FetchHelper.update(path, task);
  },

  create(task = {}) {
    const path = routes.api_v1_tasks_path();
    return FetchHelper.post(path, task);
  },

  destroy(id) {
    const path = routes.api_v1_task_path(id);
    return FetchHelper.delete(path);
  },
};
