import React from 'react';
import { History } from 'history';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  mountFunction as REPOSITORY_1_MOUNT_FUNCTION,
  unmountFunction as REPOSITORY_1_UNMOUNT_FUNCTION,
} from 'repository_1/app';
// import {
//   mountFunction as REPOSITORY_2_MOUNT_FUNCTION,
//   unmountFunction as REPOSITORY_2_UNMOUNT_FUNCTION,
// } from 'repository_2/app';
import MicroFrontend from './MicroFrontend';
import NotFound from './NotFound';
import Header from './Header';

interface Props {
  history: History;
}

const REPOSITORY_1 = ({ history }: Props) => (
  <MicroFrontend
    history={history}
    mountFunction={REPOSITORY_1_MOUNT_FUNCTION}
    unmountFunction={REPOSITORY_1_UNMOUNT_FUNCTION}
  />
);
// const REPOSITORY_2 = ({ history }: Props) => (
//   <MicroFrontend
//     history={history}
//     mountFunction={REPOSITORY_2_MOUNT_FUNCTION}
//     unmountFunction={REPOSITORY_2_UNMOUNT_FUNCTION}
//   />
// );

const App = (): JSX.Element => {
  return (
    <div data-testid="app">
      <Header />
      <div>
        <Switch>
          <Redirect exact from="/" to="/repository-1" />
          <Route path="/repository-1" component={REPOSITORY_1} />
          {/* <Route path="/repository-2" component={REPOSITORY_2} /> */}
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
