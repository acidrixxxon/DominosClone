export const addIngridientAnimations = {
  initial: { height: 0, opacity: 0, marginBottom: 0 },
  animate: {
    height: 'auto',
    opacity: 1,
    margin: '10px 0 20px',
    transition: {
      margin: {
        duration: 0.1,
        delay: 0,
      },
      height: {
        duration: 0.2,
      },
      opacity: {
        duration: 0.25,
        delay: 0.25,
      },
    },
  },
  exit: {
    margin: 0,
    height: 0,
    opacity: 0,
    transition: {
      margin: {
        delay: 0.1,
        duration: 0.05,
      },
      height: {
        delay: 0.1,
        duration: 0.15,
      },
      opacity: {
        duration: 0.1,
      },
    },
  },
};

export const AddIngridientQtyAnimations = {
  initial: { opacity: 1 },
  animate: { opacity: 0 },
};

export const AddIngridientQtyAnimations1 = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};
