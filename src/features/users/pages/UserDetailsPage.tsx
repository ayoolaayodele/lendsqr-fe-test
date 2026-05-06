import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import activateIcon from '../../../assets/icons/icon-activate-user.svg';
import arrowLeftIcon from '../../../assets/icons/icon-arrow-left.svg';
import blacklistIcon from '../../../assets/icons/icon-blacklist-user.svg';
import Button from '../../../components/ui/Button/Button';
import Modal from '../../../components/ui/Modal/Modal';
import Spinner from '../../../components/ui/Spinner/Spinner';
import { formatPhoneNumber } from '../../../utils/formatters/phoneFormatter';
import UserDetailField from '../components/UserDetailField';
import UserDetailSection from '../components/UserDetailSection';
import UserProfileCard from '../components/UserProfileCard';
import { USER_DETAIL_TABS } from '../data/userDetailTabs';
import { useModal } from '../hooks/useModal';
import { useUserDetail } from '../hooks/useUserDetail';
import type { User } from '../types/user.types';
import './UserDetailsPage.scss';

const personalFields = (user: User) => [
  { label: 'FULL NAME', value: user.fullName },
  { label: 'PHONE NUMBER', value: formatPhoneNumber(user.phone) },
  { label: 'EMAIL ADDRESS', value: user.email },
  { label: 'BVN', value: user.bvn },
  { label: 'GENDER', value: user.gender },
  { label: 'MARITAL STATUS', value: user.maritalStatus },
  { label: 'CHILDREN', value: user.children },
  { label: 'TYPE OF RESIDENCE', value: user.typeOfResidence },
];

const educationFields = (user: User) => [
  { label: 'LEVEL OF EDUCATION', value: user.levelOfEducation },
  { label: 'EMPLOYMENT STATUS', value: user.employmentStatus },
  { label: 'SECTOR OF EMPLOYMENT', value: user.sectorOfEmployment },
  { label: 'DURATION OF EMPLOYMENT', value: user.durationOfEmployment },
  { label: 'OFFICE EMAIL', value: user.officeEmail },
  { label: 'MONTHLY INCOME', value: user.monthlyIncome },
  { label: 'LOAN REPAYMENT', value: user.loanRepayment },
];

const socialFields = (user: User) => [
  { label: 'TWITTER', value: user.twitter },
  { label: 'FACEBOOK', value: user.facebook },
  { label: 'INSTAGRAM', value: user.instagram },
];

export default function UserDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useUserDetail(id!);
  const [activeTab, setActiveTab] = useState('General Details');
  const { modal, openModal, closeModal } = useModal();

  if (isLoading) return <Spinner />;

  if (error || !user) {
    return (
      <section className="user-detail">
        <button className="user-detail__back" type="button" onClick={() => navigate('/users')}>
          <img src={arrowLeftIcon} alt="" />
          <span>Back to Users</span>
        </button>
        <div className="user-detail__error">
          <div className="user-detail__error-icon">!</div>
          <p className="user-detail__error-title">Error loading user</p>
          <p className="user-detail__error-message">
            {error?.message || 'User not found. Please try again.'}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="user-detail">
      <button className="user-detail__back" type="button" onClick={() => navigate('/users')}>
        <img src={arrowLeftIcon} alt="" />
        <span>Back to Users</span>
      </button>

      <div className="user-detail__header">
        <h1 className="user-detail__title">User Details</h1>
        <div className="user-detail__actions">
          <Button
            variant="outline"
            className="user-detail__btn--blacklist"
            onClick={() =>
              openModal({
                title: 'Blacklist User',
                message: `Are you sure you want to blacklist ${user.fullName}?`,
                variant: 'danger',
                icon: blacklistIcon,
                onConfirm: () => {
                  console.log('Blacklisted:', user.id);
                  closeModal();
                },
              })
            }
          >
            BLACKLIST USER
          </Button>
          <Button
            variant="outline"
            className="user-detail__btn--activate"
            onClick={() =>
              openModal({
                title: 'Activate User',
                message: `Are you sure you want to activate ${user.fullName}?`,
                variant: 'confirm',
                icon: activateIcon,
                onConfirm: () => {
                  console.log('Activated:', user.id);
                  closeModal();
                },
              })
            }
          >
            ACTIVATE USER
          </Button>
        </div>
      </div>

      <div className="user-detail__card">
        <UserProfileCard user={user} />
        <div className="user-detail__tabs">
          {USER_DETAIL_TABS.map((tab) => (
            <button
              key={tab}
              className={`user-detail__tab ${activeTab === tab ? 'user-detail__tab--active' : ''}`}
              type="button"
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'General Details' ? (
        <div className="user-detail__sections">
          <UserDetailSection title="Personal Information">
            {personalFields(user).map((f) => (
              <UserDetailField key={f.label} {...f} />
            ))}
          </UserDetailSection>

          <UserDetailSection title="Education and Employment">
            {educationFields(user).map((f) => (
              <UserDetailField key={f.label} {...f} />
            ))}
          </UserDetailSection>

          <UserDetailSection title="Socials">
            {socialFields(user).map((f) => (
              <UserDetailField key={f.label} {...f} />
            ))}
          </UserDetailSection>

          <UserDetailSection title="Guarantor" noGrid>
            {user.guarantors.map((g, i) => (
              <div key={i} className="user-detail__guarantor-grid">
                <UserDetailField label="FULL NAME" value={g.fullName} />
                <UserDetailField label="PHONE NUMBER" value={formatPhoneNumber(g.phone)} />
                <UserDetailField label="EMAIL ADDRESS" value={g.email} />
                <UserDetailField label="RELATIONSHIP" value={g.relationship} />
              </div>
            ))}
          </UserDetailSection>
        </div>
      ) : (
        <div className="user-detail__sections">
          <div className="user-detail__empty-tab">
            <p>No data available for {activeTab}</p>
          </div>
        </div>
      )}

      <Modal
        {...modal}
        onClose={closeModal}
        confirmLabel={modal.variant === 'danger' ? 'Blacklist' : 'Activate'}
      />
    </section>
  );
}
