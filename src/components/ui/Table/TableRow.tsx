import { useState } from 'react';
import classNames from 'classnames';
import Modal from '../Modal/Modal';
import kebabIcon from '../../../assets/icons/icon-kebab-vertical.svg';
import eyeIcon from '../../../assets/icons/icon-eye.svg';
import blacklistIcon from '../../../assets/icons/icon-blacklist-user.svg';
import activateIcon from '../../../assets/icons/icon-activate-user.svg';

interface Column<T> {
  key: keyof T | string;
  render?: (item: T) => React.ReactNode;
}

interface TableRowProps<T extends { id: string; username?: string }> {
  item: T;
  columns: Column<T>[];
  onRowAction?: (item: T) => void;
}

export default function TableRow<T extends { id: string; username?: string }>({
  item,
  columns,
  onRowAction,
}: TableRowProps<T>) {
  const [active, setActive] = useState(false);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    variant: 'confirm' | 'danger';
    onConfirm: () => void;
    icon?: string;
  }>({ isOpen: false, title: '', message: '', variant: 'confirm', onConfirm: () => {} });

  return (
    <>
      <tr
        className="data-table__tr"
        onClick={() => onRowAction?.(item)}
        style={{ cursor: 'pointer' }}
      >
        {columns.map((col) => (
          <td
            key={col.key as string}
            className={classNames('data-table__td', {
              'data-table__td--org': col.key === 'organization',
              'data-table__td--date': col.key === 'dateJoined',
            })}
          >
            {col.render ? col.render(item) : String(item[col.key as keyof T] ?? '')}
          </td>
        ))}
        <td className="data-table__td data-table__td--actions" onClick={(e) => e.stopPropagation()}>
          <button
            className="data-table__action-btn"
            type="button"
            onClick={() => setActive(!active)}
          >
            <img src={kebabIcon} alt="Actions" />
          </button>
          {active && (
            <div className="data-table__action-menu">
              <button
                className="data-table__action-menu-item"
                type="button"
                onClick={() => {
                  setActive(false);
                  onRowAction?.(item);
                }}
              >
                <img src={eyeIcon} alt="" /> View Details
              </button>
              <button
                className="data-table__action-menu-item"
                type="button"
                onClick={() => {
                  setActive(false);
                  setModal({
                    isOpen: true,
                    title: 'Blacklist User',
                    variant: 'danger',
                    icon: blacklistIcon,
                    message: `Are you sure you want to blacklist ${item.username || 'this user'}?`,
                    onConfirm: () => {
                      console.log('Blacklisted:', item.id);
                      setModal((p) => ({ ...p, isOpen: false }));
                    },
                  });
                }}
              >
                <img src={blacklistIcon} alt="" /> Blacklist User
              </button>
              <button
                className="data-table__action-menu-item"
                type="button"
                onClick={() => {
                  setActive(false);
                  setModal({
                    isOpen: true,
                    title: 'Activate User',
                    variant: 'confirm',
                    icon: activateIcon,
                    message: `Are you sure you want to activate ${item.username || 'this user'}?`,
                    onConfirm: () => {
                      console.log('Activated:', item.id);
                      setModal((p) => ({ ...p, isOpen: false }));
                    },
                  });
                }}
              >
                <img src={activateIcon} alt="" /> Activate User
              </button>
            </div>
          )}
        </td>
      </tr>
      <Modal
        {...modal}
        onClose={() => setModal((p) => ({ ...p, isOpen: false }))}
        confirmLabel={modal.variant === 'danger' ? 'Blacklist' : 'Activate'}
      />
    </>
  );
}
