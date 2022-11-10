import React from 'react';
import { Card, CardHeader, CardContent, Typography, IconButton } from '@material-ui/core';
import { Edit } from '@material-ui/icons';

import TaskPresenter from 'presenters/TaskPresenter';
import UserPresenter from 'presenters/UserPresenter';

import { useTasksActions } from 'slices/useTasksActions';
import useStyles from './useStyles';

function Task({ task }) {
  const styles = useStyles();

  const { setEditingTask } = useTasksActions();

  const action = (
    <IconButton onClick={() => setEditingTask(task.id)}>
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

          <div className={styles.taskInfoRow}>
            <Typography color="textSecondary" component="h5" variant="body2" className={styles.infoTitle}>
              Assigned to:
            </Typography>
            <Typography color="textSecondary" component="span" variant="body2">
              {UserPresenter.fullName(task.assignee)}
            </Typography>
          </div>

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
};

export default Task;
