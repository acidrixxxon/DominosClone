import classNames from 'classnames';
import React from 'react';
import { TbArrowBigDown } from 'react-icons/tb';

import styles from './HoverHint.module.scss';

interface ComponentProps {
  text: string;
  active: boolean;
}

const HoverHint: React.FC<ComponentProps> = ({ text, active }) => {
  return (
    <div className={classNames(styles.hoverHint, { [styles.hoverHintActive]: active })}>
      {/* <div className={styles.hoverHint__arrow}></div> */}
      <TbArrowBigDown />
      <div className={styles.hoverHint__text}>{text}</div>
    </div>
  );
};

export default HoverHint;
