import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';
import Modal from '../Modal/Modal';
import filterIcon from '../../../assets/icons/icon-filter.svg';
import kebabIcon from '../../../assets/icons/icon-kebab-vertical.svg';
import eyeIcon from '../../../assets/icons/icon-eye.svg';
import blacklistIcon from '../../../assets/icons/icon-blacklist-user.svg';
import activateIcon from '../../../assets/icons/ icon-activate-user.svg';
import calendarIcon from '../../../assets/icons/icon-calendar.svg';
import prevIcon from '../../../assets/icons/icon-prev.svg';
import nextIcon from '../../../assets/icons/icon-next.svg';

import 'react-datepicker/dist/react-datepicker.css';

import './DataTable.scss';

interface Column<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: 'text' | 'select' | 'date';
  filterOptions?: { value: string; label: string }[];
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowAction?: (item: T) => void;
}

export default function DataTable<T extends { id: string; username?: string }>({
  columns,
  data,
  onRowAction,
}: DataTableProps<T>) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [activeRow, setActiveRow] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const filterRef = useRef<HTMLDivElement>(null);

  // Modal state
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    variant: 'confirm' | 'danger';
    onConfirm: () => void;
    icon?: string;
  }>({
    isOpen: false,
    title: '',
    message: '',
    variant: 'confirm',
    onConfirm: () => {},
  });

  // Close filter when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setShowFilter(false);
      }
    };
    if (showFilter) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showFilter]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const handleFilterSubmit = () => {
    setShowFilter(false);
    setPage(1);
  };

  const handleReset = () => {
    setFilters({});
    setShowFilter(false);
    setPage(1);
  };

  // Apply filters
  const filteredData = data.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;

      // Special handling for date fields
      if (key === 'dateJoined' && value) {
        const itemDate = new Date(item[key as keyof T] as string);
        const filterDate = new Date(value);
        return (
          itemDate.getFullYear() === filterDate.getFullYear() &&
          itemDate.getMonth() === filterDate.getMonth() &&
          itemDate.getDate() === filterDate.getDate()
        );
      }

      const itemValue = String(item[key as keyof T] ?? '').toLowerCase();
      return itemValue.includes(value.toLowerCase());
    });
  });

  // Apply sorting
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey as keyof T];
    const bVal = b[sortKey as keyof T];
    if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  // Apply pagination
  const start = (page - 1) * perPage;
  const paginatedData = sortedData.slice(start, start + perPage);
  const totalPages = Math.ceil(filteredData.length / perPage);

  return (
    <div className="data-table">
      <div className="data-table__table-wrap">
        <table className="data-table__table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key as string}
                  className="data-table__th"
                  onClick={() => col.sortable && handleSort(col.key as string)}
                >
                  <div className="data-table__th-content">
                    {col.label.toUpperCase()}
                    {col.filterable && (
                      <button
                        className="data-table__th-filter-btn"
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowFilter(!showFilter);
                        }}
                      >
                        <img className="data-table__th-icon" src={filterIcon} alt="Filter" />
                      </button>
                    )}
                  </div>
                </th>
              ))}
              <th className="data-table__th" />
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr key={item.id} className="data-table__tr">
                {columns.map((col) => (
                  <td key={col.key as string} className="data-table__td">
                    {col.render ? col.render(item) : String(item[col.key as keyof T] ?? '')}
                  </td>
                ))}
                <td className="data-table__td data-table__td--actions">
                  <button
                    className="data-table__action-btn"
                    type="button"
                    onClick={() => setActiveRow(activeRow === item.id ? null : item.id)}
                  >
                    <img src={kebabIcon} alt="Actions" />
                  </button>

                  {activeRow === item.id && (
                    <div className="data-table__action-menu">
                      <button
                        className="data-table__action-menu-item"
                        type="button"
                        onClick={() => {
                          setActiveRow(null);
                          onRowAction?.(item);
                        }}
                      >
                        <img src={eyeIcon} alt="" />
                        View Details
                      </button>
                      <button
                        className="data-table__action-menu-item"
                        type="button"
                        onClick={() => {
                          setActiveRow(null);
                          setModalConfig({
                            isOpen: true,
                            title: 'Blacklist User',
                            message: `Are you sure you want to blacklist ${item.username || 'this user'}? This action will restrict their access.`,
                            variant: 'danger',
                            icon: blacklistIcon,
                            onConfirm: () => {
                              console.log('Blacklisted:', item.id);
                              setModalConfig((prev) => ({ ...prev, isOpen: false }));
                            },
                          });
                        }}
                      >
                        <img src={blacklistIcon} alt="" />
                        Blacklist User
                      </button>
                      <button
                        className="data-table__action-menu-item"
                        type="button"
                        onClick={() => {
                          setActiveRow(null);
                          setModalConfig({
                            isOpen: true,
                            title: 'Activate User',
                            message: `Are you sure you want to activate ${item.username || 'this user'}? This will restore their full access.`,
                            variant: 'confirm',
                            icon: activateIcon,
                            onConfirm: () => {
                              console.log('Activated:', item.id);
                              setModalConfig((prev) => ({ ...prev, isOpen: false }));
                            },
                          });
                        }}
                      >
                        <img src={activateIcon} alt="" />
                        Activate User
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Filter Popup */}
        {showFilter && (
          <div className="filter-popup" ref={filterRef} onClick={(e) => e.stopPropagation()}>
            {columns
              .filter((col) => col.filterable)
              .map((col) => (
                <div key={col.key as string} className="filter-popup__field">
                  <label className="filter-popup__label">{col.label}</label>
                  {col.filterType === 'select' && col.filterOptions ? (
                    <select
                      className="filter-popup__select"
                      value={filters[col.key as string] || ''}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          [col.key as string]: e.target.value,
                        }))
                      }
                    >
                      <option value="">Select</option>
                      {col.filterOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : col.filterType === 'date' ? (
                    <div className="filter-popup__input-wrap">
                      <DatePicker
                        selected={
                          filters[col.key as string] ? new Date(filters[col.key as string]) : null
                        }
                        onChange={(date: Date | null) =>
                          setFilters((prev) => ({
                            ...prev,
                            [col.key as string]: date ? date.toISOString() : '',
                          }))
                        }
                        dateFormat="MMM d, yyyy"
                        placeholderText="Date"
                        className="filter-popup__input filter-popup__input--date"
                      />
                      <img className="filter-popup__date-icon" src={calendarIcon} alt="" />
                    </div>
                  ) : (
                    <div className="filter-popup__input-wrap">
                      <input
                        className="filter-popup__input"
                        type="text"
                        placeholder={col.label}
                        value={filters[col.key as string] || ''}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            [col.key as string]: e.target.value,
                          }))
                        }
                      />
                    </div>
                  )}
                </div>
              ))}

            <div className="filter-popup__actions">
              <button
                className="filter-popup__btn filter-popup__btn--reset"
                type="button"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                className="filter-popup__btn filter-popup__btn--filter"
                type="button"
                onClick={handleFilterSubmit}
              >
                Filter
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="data-table__pagination">
        <div className="data-table__showing">
          Showing
          <select
            className="data-table__showing-select"
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          out of {filteredData.length}
        </div>

        <div className="data-table__pagination-controls">
          <button
            className="data-table__page-btn"
            type="button"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            <img src={prevIcon} alt="Previous" />
          </button>

          <div className="data-table__page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                className={classNames('data-table__page-number', {
                  active: num === page,
                })}
                type="button"
                onClick={() => setPage(num)}
              >
                {num}
              </button>
            ))}
          </div>

          <button
            className="data-table__page-btn"
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            <img src={nextIcon} alt="Next" />
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
        title={modalConfig.title}
        message={modalConfig.message}
        variant={modalConfig.variant}
        onConfirm={modalConfig.onConfirm}
        icon={modalConfig.icon}
        confirmLabel={modalConfig.variant === 'danger' ? 'Blacklist' : 'Activate'}
      />
    </div>
  );
}
