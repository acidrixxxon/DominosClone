import React from 'react';
import { FiMenu } from 'react-icons/fi';

const HamburgerIcon = React.memo(({ onClick }: { onClick: () => void }) => {
  return <FiMenu className='mobileNav__hamburger' onClick={onClick} />;
});

export default HamburgerIcon;
