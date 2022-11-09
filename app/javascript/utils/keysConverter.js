import humps from 'humps';

export const decamelize = (obj, options = {}) => humps.decamelizeKeys(obj, options);
export const camelize = (obj, options = {}) => humps.camelizeKeys(obj, options);
