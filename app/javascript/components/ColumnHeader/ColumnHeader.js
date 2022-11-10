import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from '@material-ui/lab';
import { Typography } from '@material-ui/core';

import TaskPresenter from 'presenters/TaskPresenter';

import useStyles from './useStyles';

function ColumnHeader({ column, onLoadMore }) {
  const styles = useStyles();
  const {
    id,
    title,
    cards,
    meta: { totalCount, currentPage, totalPages },
  } = column;

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <Typography variant="h5" component="p" color="secondary" gutterBottom>
          {title}
        </Typography>
        <div className={styles.paginationWrap}>
          <div>
            ({cards.length}/{Number.isNaN(totalCount) ? '…' : totalCount})
          </div>
          {!!totalCount && (
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(page) => onLoadMore({ id, currentPage: page })}
              size="small"
            />
          )}
        </div>
      </div>
    </div>
  );
}

ColumnHeader.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    cards: PropTypes.arrayOf(TaskPresenter.shape()),
    meta: PropTypes.shape({
      totalCount: PropTypes.number,
      currentPage: PropTypes.number,
      totalPages: PropTypes.number,
    }),
  }).isRequired,
  onLoadMore: PropTypes.func.isRequired,
};

export default ColumnHeader;
