import { FC } from 'react';

import './Container.scss';

interface ComponentProps {
  children: React.ReactNode;
}

const Container: FC<ComponentProps> = ({ children }) => {
  return <div className='container'>{children}</div>;
};

export default Container;
