import usersPinkIcon from '../../../assets/icons/icon-users-pink.svg';
import activeUsersIcon from '../../../assets/icons/icon-active-users.svg';
import usersLoansIcon from '../../../assets/icons/icon-users-loans.svg';
import usersSavingsIcon from '../../../assets/icons/icon-users-savings.svg';
import type { StatCardConfig } from '../types/user.types';


export const statsConfig: StatCardConfig[] = [
  {
    icon: usersPinkIcon,
    title: 'Users',
    value: '2,453',
    variant: 'users',
  },
  {
    icon: activeUsersIcon,
    title: 'Active Users',
    value: '2,453',
    variant: 'active-users',
  },
  {
    icon: usersLoansIcon,
    title: 'Users with Loans',
    value: '12,453',
    variant: 'users-loans',
  },
  {
    icon: usersSavingsIcon,
    title: 'Users with Savings',
    value: '102,453',
    variant: 'users-savings',
  },
];
