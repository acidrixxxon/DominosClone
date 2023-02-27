import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import ReactPortal from '../../common/ReactPortal/ReactPortal';
import './Modal.scss';

interface ComponentProps {
  children: React.ReactNode;
  renderCondition: boolean;
  onClose?: () => void;
  options?: {
    overlay?: {};
    content?: {};
  };
  className?: string;
  id?: string;
  ref?: React.RefObject<HTMLDivElement>;
}

const Modal: FC<ComponentProps> = ({ ref, id, children, renderCondition, onClose, options, className }) => {
  const defaultOptions = {
    overlay: options?.overlay
      ? options.overlay
      : {
          initial: {
            opacity: 0,
          },
          animate: {
            opacity: 1,
          },
          exit: {
            opacity: 0,
          },
        },
    content: options?.content
      ? options.content
      : {
          initial: {
            transform: 'scale(0)',
          },
          animate: {
            transform: 'scale(1)',
          },
          exit: {
            transform: 'scale(0.5)',
          },
        },
  };

  return (
    <AnimatePresence>
      {renderCondition && (
        <ReactPortal wrapperId='root'>
          <motion.div
            id={id}
            className={classNames('modal__overlay', className)}
            onClick={onClose}
            variants={defaultOptions.overlay}
            initial='initial'
            animate='animate'
            exit='exit'>
            <motion.div
              ref={ref}
              variants={defaultOptions.content}
              initial='initial'
              animate='animate'
              exit='exit'
              className='modal__content'
              onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
              <span className='modal__closeIcon' onClick={onClose}>
                <AiOutlineClose className='modal__closeIcon-btn' />
              </span>
              {children}
            </motion.div>
          </motion.div>
        </ReactPortal>
      )}
    </AnimatePresence>
  );
};

export default Modal;
