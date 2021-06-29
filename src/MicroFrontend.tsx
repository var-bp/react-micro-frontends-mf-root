import React, { useLayoutEffect, useRef } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { match } from 'react-router';
import { History } from 'history';

interface MicroFrontendProps {
  history: History;
  unmountFunction: (element: HTMLDivElement | null) => void;
  mountFunction: (
    element: HTMLDivElement | null,
    history: History,
    parentRouteMatch: match,
  ) => void;
}

const MicroFrontend = ({
  history,
  mountFunction,
  unmountFunction,
}: MicroFrontendProps): JSX.Element => {
  const mountPointRef = useRef<HTMLDivElement>(null);

  const parentRouteMatch = useRouteMatch();

  useLayoutEffect(() => {
    const mountPoint = mountPointRef.current;
    mountFunction(mountPoint, history, parentRouteMatch);
    return () => {
      unmountFunction(mountPoint);
    };
  }, [history, parentRouteMatch, mountFunction, unmountFunction]);

  return <div ref={mountPointRef} />;
};

export default MicroFrontend;
