import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardContent, Typography, IconButton } from '@material-ui/core';
import { Edit } from '@material-ui/icons';

import TaskPresenter from 'presenters/TaskPresenter';
import UserPresenter from 'presenters/UserPresenter';

import useStyles from './useStyles';

function Task({ task, onClick }) {
  const styles = useStyles();

  const { expiredAt } = task;

  const handleClick = () => onClick(task);

  const action = (
    <IconButton onClick={handleClick}>
      <Edit />
    </IconButton>
  );

  return (
    <Card className={styles.root}>
      <CardHeader
        action={action}
        title={TaskPresenter.name(task)}
        className={styles.header}
        classes={{
          content: styles.content,
          title: styles.title,
          root: styles.headerRoot,
        }}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {TaskPresenter.description(task)}
        </Typography>
        {expiredAt && (
          <div className={styles.expiredAt}>
            <Typography color="textSecondary" component="h5" className={styles.expiredAtTitle}>
              Expires at:
            </Typography>
            <Typography color="textSecondary" component="span">
              {TaskPresenter.expiredDate(task)}
            </Typography>
          </div>
        )}

        <div className={styles.expiredAt}>
          <Typography color="textSecondary" component="h5" className={styles.expiredAtTitle}>
            Assignee:
          </Typography>
          <Typography color="textSecondary" component="span">
            {UserPresenter.fullName(task.assignee)}
          </Typography>
        </div>

        <div className={styles.expiredAt}>
          <Typography color="textSecondary" component="h5" className={styles.expiredAtTitle}>
            Author:
          </Typography>
          <Typography color="textSecondary" component="span">
            {UserPresenter.fullName(task.author)}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

Task.propTypes = {
  task: TaskPresenter.shape().isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Task;
