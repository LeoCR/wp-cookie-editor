export interface IUserSttings {
  status?: 0 | 1;
  dateOfApproval?: string | null;
  settings?: {
    essentials?: boolean;
    analytics?: boolean;
    functionals?: boolean;
  };
}
