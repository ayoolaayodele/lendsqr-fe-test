import starFilledIcon from '../../../assets/icons/icon-star-filled.svg';
import starOutlineIcon from '../../../assets/icons/icon-star-outline.svg';
import userOutlineIcon from '../../../assets/icons/icon-user-outline.svg';
import type { User } from '../types/user.types';

interface UserProfileCardProps {
  user: User;
}

export default function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <div className="user-detail__profile">
      <div className="user-detail__avatar">
        <img src={userOutlineIcon} alt="" />
      </div>
      <div className="user-detail__info">
        <h2 className="user-detail__name">{user.fullName}</h2>
        <p className="user-detail__id">{user.id}</p>
      </div>
      <div className="user-detail__tier">
        <p className="user-detail__tier-label">User&apos;s Tier</p>
        <span className="user-detail__stars">
          {[1, 2, 3].map((star) => (
            <img key={star} src={star <= user.tier ? starFilledIcon : starOutlineIcon} alt="" />
          ))}
        </span>
      </div>
      <div className="user-detail__balance">
        <p className="user-detail__balance-amount">{user.accountBalance}</p>
        <p className="user-detail__balance-bank">
          {user.accountNumber}/{user.bankName}
        </p>
      </div>
    </div>
  );
}
