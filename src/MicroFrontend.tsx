import React, { useLayoutEffect, useRef } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { match } from 'react-router';
import { History } from 'history';
import { EventEmitter } from './hooks/useEventEmitter';

interface MicroFrontendProps {
  eventEmitter: EventEmitter;
  history: History;
  unmountFunction: (element: HTMLDivElement | null) => void;
  mountFunction: (
    element: HTMLDivElement | null,
    history: History,
    eventEmitter: EventEmitter,
    parentRouteMatch: match,
  ) => void;
}

const MicroFrontend = ({ eventEmitter, history, mountFunction, unmountFunction }: MicroFrontendProps): JSX.Element => {
  const mountPointRef = useRef<HTMLDivElement>(null);

  const parentRouteMatch = useRouteMatch();

  useLayoutEffect(() => {
    const mountPoint = mountPointRef.current;
    mountFunction(mountPoint, eventEmitter, history, parentRouteMatch);
    return () => {
      unmountFunction(mountPoint);
    };
  }, [eventEmitter, history, parentRouteMatch, mountFunction, unmountFunction]);

  return <div ref={mountPointRef} />;
};

export default MicroFrontend;
