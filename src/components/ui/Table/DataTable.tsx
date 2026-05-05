import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import calendarIcon from '../../../assets/icons/icon-calendar.svg';
import filterIcon from '../../../assets/icons/icon-filter.svg';
import nextIcon from '../../../assets/icons/icon-next.svg';
import prevIcon from '../../../assets/icons/icon-prev.svg';
import './DataTable.scss';
import TableRow from './TableRow';
import { useTableFilters } from './hooks/useTableFilters';
import { useTablePagination } from './hooks/useTablePagination';
import { useTableSort } from './hooks/useTableSort';

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
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const { filters, localFilters, handleFilterChange, handleFilterImmediate, resetFilters } =
    useTableFilters();
  const { sortKey, sortDir, handleSort } = useTableSort();

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setShowFilter(false);
    };
    if (showFilter) document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [showFilter]);

  const filteredData = data.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;

      if (key === 'dateJoined' && value) {
        const itemDate = new Date(item[key as keyof T] as string);
        const filterDate = new Date(value);
        if (/^\d{4}$/.test(value)) return itemDate.getFullYear() === parseInt(value);
        if (/^[A-Za-z]+\s\d{4}$/.test(value)) {
          const itemMonth = itemDate.toLocaleString('default', { month: 'short' });
          const itemYear = itemDate.getFullYear().toString();
          const [filterMonth] = value.split(' ');
          return itemMonth === filterMonth && itemYear === value.split(' ')[1];
        }
        return (
          itemDate.getFullYear() === filterDate.getFullYear() &&
          itemDate.getMonth() === filterDate.getMonth() &&
          itemDate.getDate() === filterDate.getDate()
        );
      }

      if (key === 'phone') {
        const raw = String(item[key as keyof T] ?? '');
        return (
          (raw.startsWith('0') ? raw : `0${raw}`).includes(value.toLowerCase()) ||
          raw.includes(value.toLowerCase())
        );
      }

      const itemValue = String(item[key as keyof T] ?? '').toLowerCase();
      const col = columns.find((c) => c.key === key);
      return col?.filterType === 'select'
        ? itemValue === value.toLowerCase()
        : itemValue.includes(value.toLowerCase());
    });
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey as keyof T];
    const bVal = b[sortKey as keyof T];
    return (aVal < bVal ? -1 : 1) * (sortDir === 'asc' ? 1 : -1);
  });

  const { page, perPage, totalPages, start, pageNumbers, setPage, setPerPage } = useTablePagination(
    filteredData.length,
  );
  const paginatedData = sortedData.slice(start, start + perPage);

  return (
    <div className="data-table">
      <div className="data-table__table-wrap">
        <table className="data-table__table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key as string}
                  className={classNames('data-table__th', {
                    'data-table__th--org': col.key === 'organization',
                    'data-table__th--date': col.key === 'dateJoined',
                  })}
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
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <TableRow key={item.id} item={item} columns={columns} onRowAction={onRowAction} />
              ))
            ) : (
              <tr>
                <td className="data-table__td data-table__td--empty" colSpan={columns.length + 1}>
                  <div className="data-table__empty-state">
                    <p className="data-table__empty-title">No users found</p>
                    <p className="data-table__empty-message">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

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
                      value={localFilters[col.key as string] || ''}
                      onChange={(e) => handleFilterImmediate(col.key as string, e.target.value)}
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
                          localFilters[col.key as string]
                            ? new Date(localFilters[col.key as string])
                            : null
                        }
                        onChange={(date: Date | null) =>
                          handleFilterImmediate(col.key as string, date ? date.toISOString() : '')
                        }
                        dateFormat="MMM d, yyyy"
                        placeholderText="Date"
                        className="filter-popup__input filter-popup__input--date"
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode="select"
                        yearDropdownItemNumber={10}
                      />
                      <img className="filter-popup__date-icon" src={calendarIcon} alt="" />
                    </div>
                  ) : (
                    <div className="filter-popup__input-wrap">
                      <input
                        className="filter-popup__input"
                        type="text"
                        placeholder={col.label}
                        value={localFilters[col.key as string] || ''}
                        onChange={(e) => handleFilterChange(col.key as string, e.target.value)}
                      />
                    </div>
                  )}
                </div>
              ))}

            <div className="filter-popup__actions">
              <button
                className="filter-popup__btn filter-popup__btn--reset"
                type="button"
                onClick={resetFilters}
              >
                Reset
              </button>
              <button
                className="filter-popup__btn filter-popup__btn--filter"
                type="button"
                onClick={() => setShowFilter(false)}
              >
                Filter
              </button>
            </div>
          </div>
        )}
      </div>

      {filteredData.length > 0 && (
        <div className="data-table__pagination">
          <div className="data-table__showing">
            Showing
            <select
              className="data-table__showing-select"
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
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
              {pageNumbers.map((num, idx) =>
                num === '...' ? (
                  <span key={`e-${idx}`} className="data-table__page-ellipsis">
                    ...
                  </span>
                ) : (
                  <button
                    key={num}
                    className={classNames('data-table__page-number', {
                      active: num === page,
                    })}
                    type="button"
                    onClick={() => setPage(num as number)}
                  >
                    {num}
                  </button>
                ),
              )}
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
      )}
    </div>
  );
}
