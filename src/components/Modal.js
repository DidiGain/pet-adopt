import { useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = () => {
  const ref = useRef(null);

  if (!ref.current) {
    ref.current = document.createElement('div');
  }

  useEffect(() => {
    const modal = document.getElementById('modal');
    modal.appendChild(re.current);

    return () => modal.removeChild(ref.current);
  }, []);

  return createPortal(<div>{children}</div>);
};

export default Modal;
