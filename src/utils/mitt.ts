import mitt from "mitt";

type Events = {
  move: {
    isDown: boolean;
    isLeft: boolean;
  };
  unMove: undefined;
};

const emitter = mitt<Events>();

export default emitter;
