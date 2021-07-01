import React, { useLayoutEffect, useState, useEffect, useRef } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { match } from 'react-router';
import { History } from 'history';
import { EventEmitter } from './hooks/useEventEmitter';
import Spinner from './components/Spinner';
import Error from './pages/Error';

interface RemoteEntryData {
  mountFunction: (
    element: HTMLDivElement | null,
    eventEmitter: EventEmitter,
    history: History,
    parentRouteMatch: match,
  ) => void;
  unmountFunction: (element: HTMLDivElement | null) => void;
}

interface MicroFrontendProps {
  eventEmitter: EventEmitter;
  history: History;
  remoteEntry: Promise<RemoteEntryData>;
}

const defaultRemoteEntryData: RemoteEntryData = {
  mountFunction: () => {},
  unmountFunction: () => {},
};

const MicroFrontend = ({ eventEmitter, history, remoteEntry }: MicroFrontendProps): JSX.Element => {
  const mountPointRef = useRef<HTMLDivElement>(null);

  const parentRouteMatch = useRouteMatch();

  const [remoteEntryData, setRemoteEntryData] = useState(defaultRemoteEntryData);
  const [hasRemoteEntryError, setHasRemoteEntryError] = useState(false);
  const [isRemoteEntryLoading, setIsRemoteEntryLoading] = useState(true);

  useLayoutEffect(() => {
    const mountPoint = mountPointRef.current;
    const { mountFunction, unmountFunction } = remoteEntryData;
    mountFunction(mountPoint, eventEmitter, history, parentRouteMatch);
    return () => {
      unmountFunction(mountPoint);
    };
  }, [eventEmitter, history, parentRouteMatch, remoteEntryData]);

  useEffect(() => {
    const fetchRemoteEntry = async () => {
      try {
        setIsRemoteEntryLoading(true);
        const data = await remoteEntry;
        setIsRemoteEntryLoading(false);
        setHasRemoteEntryError(false);
        setRemoteEntryData(data);
      } catch (e) {
        setIsRemoteEntryLoading(false);
        setHasRemoteEntryError(true);
        setRemoteEntryData(defaultRemoteEntryData);
      }
    };
    fetchRemoteEntry();
  }, [remoteEntry]);

  if (isRemoteEntryLoading) return <Spinner />;

  if (hasRemoteEntryError) return <Error />;

  return <div ref={mountPointRef} />;
};

export default MicroFrontend;
