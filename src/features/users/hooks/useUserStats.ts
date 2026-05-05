import { useMemo } from 'react';
import { statsConfig } from '../data/statsConfig';
import {useUsers} from './ useUsers';

export const useUserStats = () => {
  const { data: users = [], isLoading } = useUsers();

  const stats = useMemo(() => {
    // Show 0 or loading values while fetching
    if (isLoading || !users.length) {
      return statsConfig.map((stat) => ({
        ...stat,
        value: isLoading ? '...' : '0',
      }));
    }

    const totalUsers = users.length;
    const activeUsers = users.filter((u) => u.status === 'Active').length;

    const usersWithLoans = users.filter((u) => {
      const repayment = parseInt(u.loanRepayment.replace(/[₦,]/g, ''), 10);
      return repayment > 0;
    }).length;

    const usersWithSavings = users.filter((u) => {
      const balance = parseFloat(u.accountBalance.replace(/[₦,]/g, ''));
      return balance > 0;
    }).length;

    return [
      { ...statsConfig[0], value: totalUsers.toLocaleString() },
      { ...statsConfig[1], value: activeUsers.toLocaleString() },
      { ...statsConfig[2], value: usersWithLoans.toLocaleString() },
      { ...statsConfig[3], value: usersWithSavings.toLocaleString() },
    ];
  }, [users, isLoading]);

  return stats;
};
