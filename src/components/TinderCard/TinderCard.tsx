import React, {
  useRef,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  forwardRef,
} from "react";
import { useSpring, animated } from "@react-spring/web";
import useWindowSize from "../.././hooks/useWindowSize";

/**
 * TinderCard component
 * @component
 * @param {Object} props - The component props
 * @param {boolean} [props.flickOnSwipe] - Whether to flick the card on swipe
 * @param {React.ReactNode} props.children - The content of the card
 * @param {Function} [props.onSwipe] - Callback function when the card is swiped
 * @param {Function} [props.onCardLeftScreen] - Callback function when the card leaves the screen
 * @param {string} [props.className] - Additional CSS class for the card
 * @param {string[]} [props.preventSwipe] - An array of directions to prevent swiping in
 * @param {"velocity" | "distance"} [props.swipeRequirementType] - The type of swipe requirement to check
 * @param {number} [props.swipeThreshold] - The swipe threshold to trigger the swipe action
 * @param {Function} [props.onSwipeRequirementFulfilled] - Callback function when the swipe requirement is fulfilled
 * @param {Function} [props.onSwipeRequirementUnfulfilled] - Callback function when the swipe requirement is not fulfilled
 * @returns {JSX.Element} The TinderCard component
 */

const settings = {
  maxTilt: 15,
  rotationPower: 50,
  swipeThreshold: 0.5,
};

const physics = {
  touchResponsive: {
    friction: 50,
    tension: 2000,
  },
  animateOut: {
    friction: 30,
    tension: 400,
  },
  animateBack: {
    friction: 10,
    tension: 100,
  },
};

const pythagoras = (x: number, y: number): number => {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};

const normalize = (vector: { x: number; y: number }) => {
  const length = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
  return { x: vector.x / length, y: vector.y / length };
};

const animateOut = async (
  gesture: { x: number; y: number },
  setSpringTarget: any,
  windowHeight: number,
  windowWidth: number,
) => {
  const diagonal = pythagoras(windowHeight, windowWidth);
  const velocity = pythagoras(gesture.x, gesture.y);
  const finalX = diagonal * gesture.x;
  const finalY = diagonal * gesture.y;
  const finalRotation = gesture.x * 45;
  const duration = diagonal / velocity;

  setSpringTarget.start({
    xyrot: [finalX, finalY, finalRotation],
    config: { duration: duration },
  });

  return await new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, duration),
  );
};

const animateBack = (setSpringTarget: any) => {
  return new Promise((resolve) => {
    setSpringTarget.start({
      xyrot: [0, 0, 0],
      config: physics.animateBack,
      onRest: resolve,
    });
  });
};

const getSwipeDirection = (property: { x: number; y: number }): string => {
  if (Math.abs(property.x) > Math.abs(property.y)) {
    if (property.x > settings.swipeThreshold) {
      return "right";
    } else if (property.x < -settings.swipeThreshold) {
      return "left";
    }
  } else {
    if (property.y > settings.swipeThreshold) {
      return "down";
    } else if (property.y < -settings.swipeThreshold) {
      return "up";
    }
  }
  return "none";
};

const AnimatedDiv = animated.div;

interface TinderCardProps {
  flickOnSwipe?: boolean;
  children: React.ReactNode;
  onSwipe?: (dir: string) => void;
  onCardLeftScreen?: (dir: string) => void;
  className?: string;
  preventSwipe?: string[];
  swipeRequirementType?: "velocity" | "distance";
  swipeThreshold?: number;
  onSwipeRequirementFulfilled?: (dir: string) => void;
  onSwipeRequirementUnfulfilled?: () => void;
}

const TinderCard = forwardRef<unknown, TinderCardProps>(
  (
    {
      flickOnSwipe = true,
      children,
      onSwipe,
      onCardLeftScreen,
      className,
      preventSwipe = [],
      swipeRequirementType = "velocity",
      swipeThreshold = settings.swipeThreshold,
      onSwipeRequirementFulfilled,
      onSwipeRequirementUnfulfilled,
    },
    ref,
  ) => {
    const { width, height } = useWindowSize();
    const [{ xyrot }, setSpringTarget] = useSpring(() => ({
      xyrot: [0, 0, 0],
      config: physics.touchResponsive,
    }));

    settings.swipeThreshold = swipeThreshold;

    useImperativeHandle(ref, () => ({
      async swipe(dir = "right") {
        if (onSwipe) onSwipe(dir);
        const power = 1.3;
        const disturbance = (Math.random() - 0.5) / 2;
        if (dir === "right") {
          await animateOut(
            { x: power, y: disturbance },
            setSpringTarget,
            width,
            height,
          );
        } else if (dir === "left") {
          await animateOut(
            { x: -power, y: disturbance },
            setSpringTarget,
            width,
            height,
          );
        } else if (dir === "up") {
          await animateOut(
            { x: disturbance, y: -power },
            setSpringTarget,
            width,
            height,
          );
        } else if (dir === "down") {
          await animateOut(
            { x: disturbance, y: power },
            setSpringTarget,
            width,
            height,
          );
        }
        if (onCardLeftScreen) onCardLeftScreen(dir);
      },
      async restoreCard() {
        await animateBack(setSpringTarget);
      },
    }));

    const handleSwipeReleased = useCallback(
      async (
        setSpringTarget: any,
        gesture: { dx: number; dy: number; vx: number; vy: number },
      ) => {
        const dir = getSwipeDirection({
          x: swipeRequirementType === "velocity" ? gesture.vx : gesture.dx,
          y: swipeRequirementType === "velocity" ? gesture.vy : gesture.dy,
        });

        if (dir !== "none") {
          if (flickOnSwipe) {
            if (!preventSwipe.includes(dir)) {
              if (onSwipe) onSwipe(dir);

              await animateOut(
                swipeRequirementType === "velocity"
                  ? {
                      x: gesture.vx,
                      y: gesture.vy,
                    }
                  : normalize({ x: gesture.dx, y: gesture.dy }),
                setSpringTarget,
                width,
                height,
              );
              if (onCardLeftScreen) onCardLeftScreen(dir);
              return;
            }
          }
        }

        animateBack(setSpringTarget);
      },
      [
        swipeRequirementType,
        flickOnSwipe,
        preventSwipe,
        onSwipe,
        onCardLeftScreen,
        width,
        height,
      ],
    );

    let swipeThresholdFulfilledDirection = "none";

    const gestureStateFromWebEvent = (
      ev: any,
      startPositon: { x: number; y: number },
      lastPosition: {
        dx: number;
        dy: number;
        vx: number;
        vy: number;
        timeStamp: number;
      },
      isTouch: boolean,
    ) => {
      let dx = isTouch
        ? ev.touches[0].clientX - startPositon.x
        : ev.clientX - startPositon.x;
      let dy = isTouch
        ? ev.touches[0].clientY - startPositon.y
        : ev.clientY - startPositon.y;

      if (startPositon.x === 0 && startPositon.y === 0) {
        dx = 0;
        dy = 0;
      }

      const vx =
        -(dx - lastPosition.dx) / (lastPosition.timeStamp - Date.now());
      const vy =
        -(dy - lastPosition.dy) / (lastPosition.timeStamp - Date.now());

      const gestureState = { dx, dy, vx, vy, timeStamp: Date.now() };
      return gestureState;
    };

    useLayoutEffect(() => {
      let startPositon = { x: 0, y: 0 };
      let lastPosition = { dx: 0, dy: 0, vx: 0, vy: 0, timeStamp: Date.now() };
      let isClicking = false;

      const onTouchStart = (ev: any) => {
        if (
          !(ev.srcElement as HTMLElement)?.className.includes("pressable") &&
          ev.cancelable
        ) {
          ev.preventDefault();
        }

        const gestureState = gestureStateFromWebEvent(
          ev,
          startPositon,
          lastPosition,
          true,
        );
        lastPosition = gestureState;
      };

      element.current?.addEventListener("touchstart", onTouchStart);

      const onMouseDown = (ev: MouseEvent) => {
        isClicking = true;
        const gestureState = gestureStateFromWebEvent(
          ev,
          startPositon,
          lastPosition,
          false,
        );
        lastPosition = gestureState;
        startPositon = { x: ev.clientX, y: ev.clientY };
      };

      element.current?.addEventListener("mousedown", onMouseDown);

      const handleMove = (gestureState: {
        dx: number;
        dy: number;
        vx: number;
        vy: number;
      }) => {
        if (onSwipeRequirementFulfilled || onSwipeRequirementUnfulfilled) {
          const dir = getSwipeDirection({
            x:
              swipeRequirementType === "velocity"
                ? gestureState.vx
                : gestureState.dx,
            y:
              swipeRequirementType === "velocity"
                ? gestureState.vy
                : gestureState.dy,
          });
          if (dir !== swipeThresholdFulfilledDirection) {
            swipeThresholdFulfilledDirection = dir;
            if (swipeThresholdFulfilledDirection === "none") {
              if (onSwipeRequirementUnfulfilled)
                onSwipeRequirementUnfulfilled();
            } else {
              if (onSwipeRequirementFulfilled) onSwipeRequirementFulfilled(dir);
            }
          }
        }

        let rot = gestureState.vx * 15;
        if (isNaN(rot)) rot = 0;
        rot = Math.max(Math.min(rot, settings.maxTilt), -settings.maxTilt);
        setSpringTarget.start({
          xyrot: [gestureState.dx, gestureState.dy, rot],
          config: physics.touchResponsive,
        });
      };

      const onMouseMove = (ev: MouseEvent) => {
        if (!isClicking) return;
        const gestureState = gestureStateFromWebEvent(
          ev,
          startPositon,
          lastPosition,
          false,
        );
        lastPosition = gestureState;
        handleMove(gestureState);
      };

      window.addEventListener("mousemove", onMouseMove);

      const onMouseUp = (ev: MouseEvent) => {
        if (!isClicking) return;
        isClicking = false;
        handleSwipeReleased(setSpringTarget, lastPosition);
        startPositon = { x: 0, y: 0 };
        lastPosition = { dx: 0, dy: 0, vx: 0, vy: 0, timeStamp: Date.now() };
      };

      window.addEventListener("mouseup", onMouseUp);

      const onTouchMove = (ev: TouchEvent) => {
        const gestureState = gestureStateFromWebEvent(
          ev,
          startPositon,
          lastPosition,
          true,
        );
        lastPosition = gestureState;
        handleMove(gestureState);
      };

      element.current?.addEventListener("touchmove", onTouchMove);

      const onTouchEnd = (ev: TouchEvent) => {
        handleSwipeReleased(setSpringTarget, lastPosition);
        startPositon = { x: 0, y: 0 };
        lastPosition = { dx: 0, dy: 0, vx: 0, vy: 0, timeStamp: Date.now() };
      };

      element.current?.addEventListener("touchend", onTouchEnd);

      return () => {
        element.current?.removeEventListener("touchstart", onTouchStart);
        element.current?.removeEventListener("touchmove", onTouchMove);
        element.current?.removeEventListener("touchend", onTouchEnd);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        element.current?.removeEventListener("mousedown", onMouseDown);
      };
    }, [
      handleSwipeReleased,
      setSpringTarget,
      onSwipeRequirementFulfilled,
      onSwipeRequirementUnfulfilled,
    ]);

    const element = useRef<HTMLDivElement>(null);

    return (
      <AnimatedDiv
        ref={element}
        className={className}
        style={{
          transform: xyrot.to(
            (x, y, rot) => `translate3d(${x}px, ${y}px, 0px) rotate(${rot}deg)`,
          ),
        }}
      >
        {children}z
      </AnimatedDiv>
    );
  },
);

export default TinderCard;
