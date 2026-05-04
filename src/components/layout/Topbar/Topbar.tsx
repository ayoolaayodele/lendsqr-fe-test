import logoLendsqr from '../../../assets/icons/logo-lendsqr.svg';
import searchIcon from '../../../assets/icons/icon-search.svg';
import bellIcon from '../../../assets/icons/icon-bell.svg';
import chevronDownIcon from '../../../assets/icons/icon-chevron-down-field.svg';
import profileAvatar from '../../../assets/images/avatar-profile.png';
import Input from '../../ui/Input/Input';
import './Topbar.scss';

export default function Topbar() {
  return (
    <header className='topbar'>
      <div className='topbar__brand'>
        <img className='topbar__logo' src={logoLendsqr} alt='lendsqr' />
      </div>

      <form
        className='topbar__search'
        role='search'
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label className='sr-only' htmlFor='global-search'>
          Search for anything
        </label>
        <Input
          id='global-search'
          name='q'
          type='search'
          placeholder='Search for anything'
          autoComplete='off'
          className='topbar__search-input'
          rightSlot={
            <button type='submit' className='topbar__search-submit' aria-label='Search'>
              <img src={searchIcon} alt='' />
            </button>
          }
        />
      </form>

      <nav className='topbar__actions' aria-label='Account actions'>
        <a className='topbar__docs' href='https://docs.lendsqr.com/' target='_blank' rel='noreferrer'>
          Docs
        </a>
        <button className='topbar__icon-button' type='button' aria-label='Notifications'>
          <img src={bellIcon} alt='' />
        </button>
        <button className='topbar__profile' type='button' aria-label='Open profile menu'>
          <img className='topbar__avatar' src={profileAvatar} alt='' />
          <span className='topbar__profile-name'>Adedeji</span>
          <img className='topbar__chevron' src={chevronDownIcon} alt='' />
        </button>
      </nav>
    </header>
  );
}
