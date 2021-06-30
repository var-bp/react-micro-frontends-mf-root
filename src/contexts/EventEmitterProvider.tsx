import React, { createContext, FC } from 'react';

export const EventEmitterContext = createContext({});

interface Props {
  eventEmitter: any;
}

// eslint-disable-next-line react/prop-types
export const EventEmitterProvider: FC<Props> = ({ eventEmitter, children }) => (
  <EventEmitterContext.Provider value={eventEmitter}>{children}</EventEmitterContext.Provider>
);
