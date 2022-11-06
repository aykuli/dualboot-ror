import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardContent, Typography, IconButton } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import useStyles from './useStyles';

function Task({ task, onClick }) {
  const styles = useStyles();

  const { name, description, expiredAt } = task;

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
        title={name}
        className={styles.header}
        classes={{
          content: styles.content,
          title: styles.title,
        }}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
        {expiredAt && (
          <Typography sx={{ mb: 1.5 }} color="text.secondary" component="p">
            {`Expired at: ${expiredAt}`}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    expiredAt: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Task;
