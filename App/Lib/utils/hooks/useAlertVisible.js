import { useState } from 'react';

const useAlertVisible = (defaultValue = false) => {
  const [isVisible, setVisible] = useState(defaultValue);

  const showAlert = () => setVisible(true);
  const hideAlert = () => setVisible(false);

  return {
    isVisible,
    showAlert,
    hideAlert
  };
};

export default useAlertVisible;
