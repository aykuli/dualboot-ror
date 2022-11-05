import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

import { IconButton } from '@material-ui/core';
import { SystemUpdateAlt } from '@material-ui/icons';

function ColumnHeader({ column, onLoadMore }) {
  const styles = useStyles();
  const {
    key,
    title,
    cards,
    meta: { totalCount, currentPage, perPage },
  } = column;
  const count = cards.length;
  const isShowloadIcon = currentPage * perPage < totalCount;

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <b>{title}</b> ({count}/{totalCount || '…'})
      </div>
      <div className={styles.actions}>
        {isShowloadIcon && (
          <IconButton aria-label="Load more" onClick={() => onLoadMore({ key, currentPage: currentPage + 1 })}>
            <SystemUpdateAlt fontSize="small" />
          </IconButton>
        )}
      </div>
    </div>
  );
}

ColumnHeader.propTypes = {
  column: PropTypes.shape({
    key: PropTypes.string,
    title: PropTypes.string,
    cards: PropTypes.arrayOf(PropTypes.shape()),
    meta: PropTypes.shape({
      totalCount: PropTypes.number,
      currentPage: PropTypes.number,
      perPage: PropTypes.number,
    }),
  }).isRequired,
  onLoadMore: PropTypes.func.isRequired,
};

export default ColumnHeader;
