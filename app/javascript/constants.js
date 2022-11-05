export const STATES = [
  { key: 'new_task', value: 'New' },
  { key: 'in_development', value: 'Dev' },
  { key: 'in_qa', value: 'QA' },
  { key: 'in_code_review', value: 'Code review' },
  { key: 'ready_for_release', value: 'Ready for release' },
  { key: 'released', value: 'Released' },
  { key: 'archived', value: 'Archived' },
];

export const META_DEFAULT = { count: 0, totalCount: 0, currentPage: 0, perPage: 10 };

export const initialBoard = {
  columns: STATES.map(({ key, value }) => ({
    key,
    title: value,
    cards: [],
    meta: META_DEFAULT,
  })),
};

export const MODE = {
  ADD: 'add',
  EDIT: 'edit',
  NONE: 'none',
};
