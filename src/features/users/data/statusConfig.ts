export const userStatusConfig = {
  Active: {
    label: 'Active',
    className: 'status--active',
    color: 'var(--color-status-active)',
    bgColor: 'var(--color-status-active-bg)',
  },
  Inactive: {
    label: 'Inactive',
    className: 'status--inactive',
    color: 'var(--color-status-inactive)',
    bgColor: 'var(--color-status-inactive-bg)',
  },
  Pending: {
    label: 'Pending',
    className: 'status--pending',
    color: 'var(--color-status-pending)',
    bgColor: 'var(--color-status-pending-bg)',
  },
  Blacklisted: {
    label: 'Blacklisted',
    className: 'status--blacklisted',
    color: 'var(--color-status-blacklisted)',
    bgColor: 'var(--color-status-blacklisted-bg)',
  },
} as const;

export type StatusConfig = (typeof userStatusConfig)[keyof typeof userStatusConfig];

export const statusOptions = Object.entries(userStatusConfig).map(([key, value]) => ({
  value: key,
  label: value.label,
}));
