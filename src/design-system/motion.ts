/**
 * Motion tokens for the page's reveal transitions — longer and softer than a
 * typical snappy landing page. Scrolling itself is left to the browser.
 */
export const motion = {
  reveal: {
    duration: 1.1,
    ease: [0.16, 1, 0.3, 1] as const, // easeOutExpo
    distance: 36,
  },
  stagger: 0.12,
} as const;
