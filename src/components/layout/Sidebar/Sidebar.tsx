import classNames from 'classnames';
import { NavLink, useNavigate } from 'react-router-dom';
import { sidebarChrome, sidebarSections, type SidebarNavItem } from './sidebarNavConfig';
import './Sidebar.scss';

function SidebarLink({ item }: { item: SidebarNavItem }) {
  return (
    <NavLink className={classNames('sidebar__link', item.linkClassName)} to={item.to}>
      <img src={item.icon} alt='' />
      <span>{item.label}</span>
    </NavLink>
  );
}

function SidebarSection({ title, items }: { title: string; items: SidebarNavItem[] }) {
  return (
    <section className='sidebar__section'>
      <h2>{title}</h2>
      <nav aria-label={title}>
        {items.map((item) => (
          <SidebarLink key={item.label} item={item} />
        ))}
      </nav>
    </section>
  );
}

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className='sidebar'>
      <div className='sidebar__scroll'>
        <button className='sidebar__organization' type='button'>
          <img src={sidebarChrome.switchOrganizationIcon} alt='' />
          <span>Switch Organization</span>
          <img className='sidebar__organization-chevron' src={sidebarChrome.switchOrganizationChevron} alt='' />
        </button>

        <NavLink className='sidebar__link sidebar__link--dashboard' to='/dashboard'>
          <img src={sidebarChrome.dashboardIcon} alt='' />
          <span>Dashboard</span>
        </NavLink>

        {sidebarSections.map(({ title, items }) => (
          <SidebarSection key={title} title={title} items={items} />
        ))}
      </div>

      <footer className='sidebar__bottom'>
        <hr className='sidebar__bottom-rule' />

        <button
          className='sidebar__logout'
          type='button'
          onClick={() => {
            navigate('/login');
          }}
        >
          <img src={sidebarChrome.logoutIcon} alt='' />
          <span>Logout</span>
        </button>

        <p className='sidebar__version'>{sidebarChrome.appVersion}</p>
      </footer>
    </aside>
  );
}
