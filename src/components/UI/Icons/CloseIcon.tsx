import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const CloseIcon = React.memo(({ closeHandler }: { closeHandler: () => void }) => {
  return <AiOutlineClose className='mobileNav__closeIcon' onClick={closeHandler} />;
});

export default CloseIcon;
