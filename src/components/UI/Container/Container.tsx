import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';

import './Container.scss';

interface ComponentProps {
  className?: any;
}

const Container: FC<PropsWithChildren<ComponentProps>> = ({ children, className }) => {
  return <div className={classNames('container', { [className]: className })}>{children}</div>;
};

export default Container;
