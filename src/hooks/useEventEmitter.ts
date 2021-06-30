import EventEmitter3 from 'eventemitter3';

const eventEmitterInstance = new EventEmitter3();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EventEmitter = any;

const useEventEmitter = (): EventEmitter => {
  return eventEmitterInstance;
};

export default useEventEmitter;
