import classNames from 'classnames';
import './StatsCard.scss';

interface StatsCardProps {
  icon: string;
  title: string;
  value: string;
  variant: 'users' | 'active-users' | 'users-loans' | 'users-savings';
}

export default function StatsCard({ icon, title, value, variant }: StatsCardProps) {
  return (
    <div className="stats-card">
      <div className={classNames('stats-card__icon-wrap', `stats-card__icon-wrap--${variant}`)}>
        <img className="stats-card__icon" src={icon} alt="" />
      </div>
      <h3 className="stats-card__title">{title}</h3>
      <p className="stats-card__value">{value}</p>
    </div>
  );
}
