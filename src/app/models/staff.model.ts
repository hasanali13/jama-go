export const STAFF_DEPARTMENTS = [
  { value: 'Technician', label: 'Technician' },
  { value: 'MoiDiaUpload', label: 'MOI DIA Upload' },
  { value: 'MoiDiaInspection', label: 'MOI DIA Inspection' },
  { value: 'Panels', label: 'Panels' },
] as const;

export type StaffDepartment = (typeof STAFF_DEPARTMENTS)[number]['value'];

export interface StaffMember {
  id: string;
  fullName: string;
  role: string;
  responsibility: string;
  department: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
}

export interface AdminStaffMember extends StaffMember {
  email: string | null;
  hasLoginAccount: boolean;
}

export interface CreateStaffRequest {
  fullName: string;
  email: string;
  password: string;
  department: StaffDepartment | null;
  isActive: boolean;
}

export interface UpdateStaffRequest {
  fullName: string;
  email: string;
  password?: string | null;
  department: StaffDepartment | null;
  isActive: boolean;
}
