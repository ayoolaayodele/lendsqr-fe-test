import type { ReactNode } from 'react';

interface UserDetailSectionProps {
  title: string;
  children: ReactNode;
  noGrid?: boolean;
}

export default function UserDetailSection({ title, children, noGrid }: UserDetailSectionProps) {
  return (
    <div className="user-detail__section">
      <h3 className="user-detail__section-title">{title}</h3>
      {noGrid ? children : <div className="user-detail__grid">{children}</div>}
    </div>
  );
}
