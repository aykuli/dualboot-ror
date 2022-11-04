import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

import { IconButton } from '@material-ui/core';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';

function ColumnHeader({ column, onLoadMore }) {
  const styles = useStyles();
  const {
    key,
    title,
    cards,
    meta: { totalCount, currentPage },
  } = column;

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <b>{title}</b> ({cards.length}/{totalCount || '…'})
      </div>
      <div className={styles.actions}>
        <IconButton aria-label="Load more" onClick={() => onLoadMore({ key, currentPage: currentPage + 1 })}>
          <SystemUpdateAltIcon fontSize="small" />
        </IconButton>
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
    }),
  }).isRequired,
  onLoadMore: PropTypes.func.isRequired,
};

export default ColumnHeader;
