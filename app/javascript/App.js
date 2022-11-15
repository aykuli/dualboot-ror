import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';

import store from 'store';
import theme from 'theme';
import TaskBoard from 'components/TaskBoard';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <TaskBoard />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
