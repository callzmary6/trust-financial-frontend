import { FC } from 'react';
import styles from '../styles/components/ConfirmModal.module.scss';

interface ConfirmModalProps {
  onConfirm: () => void;
  text?: string;
  disabled?: boolean;
  onCloseModal?: () => void;
}

const ConfirmModal: FC<ConfirmModalProps> = ({ 
  onConfirm, 
  onCloseModal,
  text
}) => {

  function handleLogout() {
    onConfirm();
    onCloseModal?.();
  }
  return (
    <div className={styles.confirmModal}>
      <p>
        {text}
      </p>

      <div>
        <button 
          className={styles.secondary}
          onClick={onCloseModal}
        >
          No
        </button>
        <button 
          className={styles.danger}
          onClick={handleLogout}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;