import { memo } from 'react';
import { FiMenu } from 'react-icons/fi';

const HamburgerIcon = ({ onClick }: { onClick: () => void }) => {
  return <FiMenu className='mobileNav__hamburger' onClick={onClick} />;
};

export default memo(HamburgerIcon);
