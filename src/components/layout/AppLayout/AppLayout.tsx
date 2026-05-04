import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';
import './AppLayout.scss';

export default function AppLayout() {
  return (
    <div className='app-layout'>
      <Topbar />
      <Sidebar />
      <main className='app-layout__main'>
        <div className='app-layout__content'>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
