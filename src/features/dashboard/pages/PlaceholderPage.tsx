import { useLocation } from 'react-router-dom';
import './PlaceholderPage.scss';

export default function PlaceholderPage() {
  const location = useLocation();
  const pageName = location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'Page';

  return (
    <section className="placeholder-page">
      <div className="placeholder-page__content">
        <h1 className="placeholder-page__title">Coming Soon</h1>
        <p className="placeholder-page__message">
          The <strong>{pageName}</strong> page is under development.
        </p>
        <p className="placeholder-page__subtext">
          This feature will be available in a future update.
        </p>
      </div>
    </section>
  );
}
