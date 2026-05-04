
export interface Guarantor {
  fullName: string;
  phone: number;
  email: string;
  relationship: string;
}

export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phone: number;
  dateJoined: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
  fullName: string;
  bvn: number;
  gender: 'Male' | 'Female';
  maritalStatus: 'Single' | 'Married' | 'Divorced';
  children: string;
  typeOfResidence: string;
  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
  twitter: string;
  facebook: string;
  instagram: string;
  tier: number;
  accountBalance: string;
  accountNumber: number;
  bankName: string;
  guarantors: Guarantor[];
}

export interface StatCardConfig {
  icon: string;
  title: string;
  value: string;
  variant: 'users' | 'active-users' | 'users-loans' | 'users-savings';
}
