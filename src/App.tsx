import React from 'react';
import { History } from 'history';
import { Switch, Route, Redirect } from 'react-router-dom';
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
    <MicroFrontend eventEmitter={eventEmitter} history={history} remoteEntry={import('repository_1/app')} />;
const RENDER_REPOSITORY_2 =
  (eventEmitter: EventEmitter) =>
  ({ history }: Props) =>
    <MicroFrontend eventEmitter={eventEmitter} history={history} remoteEntry={import('repository_2/app')} />;

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
