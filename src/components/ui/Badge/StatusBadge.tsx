import classNames from 'classnames';
import './StatusBadge.scss';

interface StatusBadgeProps {
  status: string;
  color: string;
  bgColor: string;
  className?: string;
}

export default function StatusBadge({ status, color, bgColor, className }: StatusBadgeProps) {
  return (
    <span
      className={classNames('status-badge', className)}
      style={{
        color: color,
        backgroundColor: bgColor,
      }}
    >
      {status}
    </span>
  );
}
