export const EASE_OUT_EXPO: [number, number, number, number] = [
  0.16, 1, 0.3, 1,
];

export function revealTransition(delay = 0, reducedMotion = false) {
  return reducedMotion
    ? { duration: 0 }
    : { duration: 0.65, delay, ease: EASE_OUT_EXPO };
}

export function staggerContainer(
  reducedMotion = false,
  stagger = 0.1,
  delayChildren = 0,
) {
  return reducedMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren } },
      };
}

export function staggerItem(reducedMotion = false) {
  return reducedMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease: EASE_OUT_EXPO },
        },
      };
}
