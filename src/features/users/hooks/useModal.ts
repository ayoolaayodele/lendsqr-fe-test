import { useState, useCallback } from 'react';

interface ModalConfig {
  isOpen: boolean;
  title: string;
  message: string;
  variant: 'confirm' | 'danger';
  icon?: string;
}

export const useModal = () => {
  const [modal, setModal] = useState<ModalConfig & { onConfirm: () => void }>({
    isOpen: false,
    title: '',
    message: '',
    variant: 'confirm',
    onConfirm: () => {},
  });

  const openModal = useCallback(
    (config: Omit<typeof modal, 'isOpen'>) => setModal({ ...config, isOpen: true }),
    [],
  );

  const closeModal = useCallback(() => setModal((prev) => ({ ...prev, isOpen: false })), []);

  return { modal, openModal, closeModal };
};
