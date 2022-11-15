import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardContent, Typography, IconButton } from '@material-ui/core';
import { Edit } from '@material-ui/icons';

import TaskPresenter from 'presenters/TaskPresenter';
import UserPresenter from 'presenters/UserPresenter';

import useStyles from './useStyles';

function Task({ task, onClick }) {
  const styles = useStyles();

  const action = (
    <IconButton onClick={() => onClick(task)}>
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
        <Typography variant="body1" color="textSecondary" component="p">
          {TaskPresenter.description(task)}
        </Typography>
        <div className={styles.taskInfo}>
          {task.expiredAt && (
            <div className={styles.taskInfoRow}>
              <Typography color="textSecondary" component="h5" variant="body2" className={styles.infoTitle}>
                Expires at:
              </Typography>
              <Typography color="textSecondary" component="span" variant="body2">
                {TaskPresenter.expiredDate(task)}
              </Typography>
            </div>
          )}

          {task.assignee && (
            <div className={styles.taskInfoRow}>
              <Typography color="textSecondary" component="h5" variant="body2" className={styles.infoTitle}>
                Assigned to:
              </Typography>
              <Typography color="textSecondary" component="span" variant="body2">
                {UserPresenter.fullName(task.assignee)}
              </Typography>
            </div>
          )}

          <div className={styles.taskInfoRow}>
            <Typography color="textSecondary" component="h5" variant="body2" className={styles.infoTitle}>
              Author:
            </Typography>
            <Typography color="textSecondary" component="span" variant="body2">
              {UserPresenter.fullName(task.author)}
            </Typography>
          </div>
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
