import { useCallback, useState } from 'react';

const useToggleMode = () => {
  const [show, setShow] = useState(false);

  const handleToggle = useCallback(() => {
    setShow((show) => !show);
  }, []);

  return { show, handleToggle };
};

export default useToggleMode;
