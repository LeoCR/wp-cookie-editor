export interface IUserSttings {
  status?: 0 | 1;
  dateOfApproval?: string | null;
  settings: {
    analytics: boolean;
    functionals: boolean;
  };
}
