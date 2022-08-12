function mainLoop(func_frameRender) {
  const proto_mainLoop = {};
  let isDebugging = false;
  let animating = false;

  function isAnimating() {
    return animating === true;
  }

  function setIsAnimating(value) {
    animating = value;
  }

  function tic() {
    if (!isAnimating()) {
      return;
    }

    func_frameRender();
    window.requestAnimationFrame(tic);
  }

  proto_mainLoop.setDebug = (bVal = false) => {
    isDebugging = bVal;
  }

  proto_mainLoop.start = () => {
    if (isAnimating()) {
      return;
    }

    setIsAnimating(true);
    tic();

    if (isDebugging) {
      report("Main loop started");
    }
  };

  proto_mainLoop.stop = () => {
    if (!isAnimating()) {
      return;
    }

    setIsAnimating(false);

    if (isDebugging) {
      report("Main loop stopped");
    }
  };

  proto_mainLoop.next = () => {
    window.requestAnimationFrame(func_frameRender);
  };

  return proto_mainLoop;
}
