import { apiV1UsersPath, apiV1UserPath } from '../routes/ApiRoutes';
import FetchHelper from '../utils/fetchHelper';

export default {
  index(params) {
    const path = apiV1UsersPath();
    return FetchHelper.get(path, params);
  },

  show(id) {
    const path = apiV1UserPath(id);
    return FetchHelper.get(path);
  },

  update(id, task = {}) {
    const path = apiV1UserPath(id);
    return FetchHelper.put(path, task);
  },

  create(task = {}) {
    const path = apiV1UsersPath();
    return FetchHelper.post(path, task);
  },

  destroy(id) {
    const path = apiV1UserPath(id);
    return FetchHelper.delete(path);
  },
};
