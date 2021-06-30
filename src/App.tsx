import React from 'react';
import { History } from 'history';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  mountFunction as REPOSITORY_1_MOUNT_FUNCTION,
  unmountFunction as REPOSITORY_1_UNMOUNT_FUNCTION,
} from 'repository_1/app';
import {
  mountFunction as REPOSITORY_2_MOUNT_FUNCTION,
  unmountFunction as REPOSITORY_2_UNMOUNT_FUNCTION,
} from 'repository_2/app';
import useEventEmitter, { EventEmitter } from './hooks/useEventEmitter';
import MicroFrontend from './MicroFrontend';
import NotFound from './pages/NotFound';
import Header from './components/Header';

interface Props {
  history: History;
}

const RENDER_REPOSITORY_1 =
  (eventEmitter: EventEmitter) =>
  ({ history }: Props) =>
    (
      <MicroFrontend
        eventEmitter={eventEmitter}
        history={history}
        mountFunction={REPOSITORY_1_MOUNT_FUNCTION}
        unmountFunction={REPOSITORY_1_UNMOUNT_FUNCTION}
      />
    );
const RENDER_REPOSITORY_2 =
  (eventEmitter: EventEmitter) =>
  ({ history }: Props) =>
    (
      <MicroFrontend
        eventEmitter={eventEmitter}
        history={history}
        mountFunction={REPOSITORY_2_MOUNT_FUNCTION}
        unmountFunction={REPOSITORY_2_UNMOUNT_FUNCTION}
      />
    );

const App = (): JSX.Element => {
  const eventEmitter = useEventEmitter();

  return (
    <div data-testid="app">
      <Header />
      <div>
        <Switch>
          <Redirect exact from="/" to="/repository-1" />
          <Route path="/repository-1" component={RENDER_REPOSITORY_1(eventEmitter)} />
          <Route path="/repository-2" component={RENDER_REPOSITORY_2(eventEmitter)} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
