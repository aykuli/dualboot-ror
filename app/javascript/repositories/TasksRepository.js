import { api_v1_tasks_path as apiV1TasksPath, api_v1_task_path as apiV1TaskPath } from '../routes/ApiRoutes';
import FetchHelper from '../../../utils/fetchHelper';

export default {
  index(params) {
    const path = apiV1TasksPath();
    return FetchHelper.get(path, params);
  },

  show(id) {
    const path = apiV1TaskPath(id);
    return FetchHelper.get(path);
  },

  update(id, task = {}) {
    const path = apiV1TaskPath(id);
    return FetchHelper.update(path, task);
  },

  create(task = {}) {
    const path = apiV1TasksPath();
    return FetchHelper.post(path, task);
  },

  destroy(id) {
    const path = apiV1TaskPath(id);
    return FetchHelper.delete(path);
  },
};
