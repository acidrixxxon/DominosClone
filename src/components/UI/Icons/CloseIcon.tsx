import { memo } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const CloseIcon = ({ closeHandler }: { closeHandler: () => void }) => {
  return <AiOutlineClose className='mobileNav__closeIcon' onClick={closeHandler} />;
};

export default memo(CloseIcon);
