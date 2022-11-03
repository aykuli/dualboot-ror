import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';

function Task({ task }) {
  const styles = useStyles();
  console.log('task: ', task);

  return (
    <Card className={styles.root}>
      <CardHeader title={task.name} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {task.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default Task;
