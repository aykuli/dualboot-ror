import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';

import store from 'store';
import TaskBoard from 'containers/TaskBoard';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <TaskBoard />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
