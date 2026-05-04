import { useEffect, type ReactNode } from 'react';
import classNames from 'classnames';
import './Modal.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'confirm' | 'danger';
  onConfirm: () => void;
  icon?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'confirm',
  onConfirm,
  icon,
}: ModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {icon && <img className="modal__icon" src={icon} alt="" />}
        <h3 className="modal__title">{title}</h3>
        <p className="modal__message">{message}</p>
        <div className="modal__actions">
          <button className="modal__btn modal__btn--cancel" type="button" onClick={onClose}>
            {cancelLabel}
          </button>
          <button
            className={classNames('modal__btn', {
              'modal__btn--danger': variant === 'danger',
              'modal__btn--confirm': variant === 'confirm',
            })}
            type="button"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
