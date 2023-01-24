import { createPortal } from 'react-dom';

interface Props {
  children: JSX.Element;
  wrapperId: string;
}

const ReactPortal: React.FC<Props> = ({ children, wrapperId }) => {
  return createPortal(children, document.getElementById(wrapperId) as Element);
};

export default ReactPortal;
