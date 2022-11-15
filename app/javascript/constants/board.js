export const STATE = {
  NEW_TASK: 'new_task',
  IN_DEVELOPMENT: 'in_development',
  IN_QA: 'in_qa',
  IN_CODE_REVIEW: 'in_code_review',
  READY_FOR_RELEASE: 'ready_for_release',
  RELEASED: 'released',
  ARCHIVED: 'archived',
};
export const COLUMNS = [
  { key: STATE.NEW_TASK, value: 'New' },
  { key: STATE.IN_DEVELOPMENT, value: 'Dev' },
  { key: STATE.IN_QA, value: 'QA' },
  { key: STATE.IN_CODE_REVIEW, value: 'Code review' },
  { key: STATE.READY_FOR_RELEASE, value: 'Ready for release' },
  { key: STATE.RELEASED, value: 'Released' },
  { key: STATE.ARCHIVED, value: 'Archived' },
];

export const META_DEFAULT = { count: 0, totalCount: 0, currentPage: 0, perPage: 10 };

export const initialColumns = COLUMNS.map(({ key, value }) => ({
  id: key,
  title: value,
  cards: [],
  meta: META_DEFAULT,
}));

export const MODE = {
  ADD: 'add',
  EDIT: 'edit',
  NONE: 'none',
};
