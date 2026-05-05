import auditLogsIcon from '../../../assets/icons/icon-audit.svg';
import briefcaseIcon from '../../../assets/icons/icon-briefcase.svg';
import chevronIcon from '../../../assets/icons/icon-chevron-down-topbar.svg';
import feesPricingIcon from '../../../assets/icons/icon-fees-pricing.svg';
import feesChargesIcon from '../../../assets/icons/icon-fees.svg';
import decisionModelsIcon from '../../../assets/icons/icon-handshake.svg';
import homeIcon from '../../../assets/icons/icon-home.svg';
import loanProductsIcon from '../../../assets/icons/icon-loan-product.svg';
import loanRequestsIcon from '../../../assets/icons/icon-loan-request.svg';
import logoutIcon from '../../../assets/icons/icon-logout.svg';
import savingsIcon from '../../../assets/icons/icon-piggy.svg';
import preferencesIcon from '../../../assets/icons/icon-preferences.svg';
import reportsIcon from '../../../assets/icons/icon-reports.svg';
import loansIcon from '../../../assets/icons/icon-sack.svg';
import savingsProductsIcon from '../../../assets/icons/icon-savings-product.svg';
import serviceAccountIcon from '../../../assets/icons/icon-service-account.svg';
import servicesIcon from '../../../assets/icons/icon-services.svg';
import settlementsIcon from '../../../assets/icons/icon-settlements.svg';
import systemsMessagesIcon from '../../../assets/icons/icon-systems-messages.svg';
import transactionsIcon from '../../../assets/icons/icon-transactions.svg';
import whitelistIcon from '../../../assets/icons/icon-user-check.svg';
import guarantorsIcon from '../../../assets/icons/icon-user-outline.svg';
import karmaIcon from '../../../assets/icons/icon-user-times.svg';
import usersIcon from '../../../assets/icons/icon-users.svg';

export type SidebarNavItem = {
  label: string;
  icon: string;
  to: string;
  linkClassName?: string;
};

export const sidebarChrome = {
  switchOrganizationIcon: briefcaseIcon,
  switchOrganizationChevron: chevronIcon,
  dashboardIcon: homeIcon,
  logoutIcon,
  appVersion: 'v1.2.0',
} as const;

const customerItems: SidebarNavItem[] = [
  { label: 'Users', icon: usersIcon, to: '/users' },
  { label: 'Guarantors', icon: guarantorsIcon, to: '/guarantors' },
  { label: 'Loans', icon: loansIcon, to: '/loans' },
  { label: 'Decision Models', icon: decisionModelsIcon, to: '/decision-models' },
  { label: 'Savings', icon: savingsIcon, to: '/savings' },
  { label: 'Loan Requests', icon: loanRequestsIcon, to: '/loan-requests' },
  { label: 'Whitelist', icon: whitelistIcon, to: '/whitelist' },
  { label: 'Karma', icon: karmaIcon, to: '/karma' },
];

const businessItems: SidebarNavItem[] = [
  { label: 'Organization', icon: briefcaseIcon, to: '/organization' },
  { label: 'Loan Products', icon: loanProductsIcon, to: '/loan-products' },
  { label: 'Savings Products', icon: savingsProductsIcon, to: '/savings-products' },
  { label: 'Fees and Charges', icon: feesChargesIcon, to: '/fees-and-charges' },
  { label: 'Transactions', icon: transactionsIcon, to: '/transactions' },
  { label: 'Services', icon: servicesIcon, to: '/services' },
  { label: 'Service Account', icon: serviceAccountIcon, to: '/service-account' },
  { label: 'Settlements', icon: settlementsIcon, to: '/settlements' },
  { label: 'Reports', icon: reportsIcon, to: '/reports' },
];

const settingItems: SidebarNavItem[] = [
  { label: 'Preferences', icon: preferencesIcon, to: '/preferences' },
  { label: 'Fees and Pricing', icon: feesPricingIcon, to: '/fees-and-pricing' },
  { label: 'Audit Logs', icon: auditLogsIcon, to: '/audit-logs' },
  {
    label: 'Systems Messages',
    icon: systemsMessagesIcon,
    to: '/systems-messages',
    linkClassName: 'sidebar__link--systems',
  },
];

export type SidebarSectionConfig = {
  title: string;
  items: SidebarNavItem[];
};

export const sidebarSections: SidebarSectionConfig[] = [
  { title: 'Customers', items: customerItems },
  { title: 'Businesses', items: businessItems },
  { title: 'Settings', items: settingItems },
];
