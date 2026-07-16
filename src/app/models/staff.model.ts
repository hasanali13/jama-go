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

export interface CreateStaffRequest {
  fullName: string;
  role: string;
  responsibility: string;
  department: string | null;
  displayOrder: number;
  isActive?: boolean;
}

export interface UpdateStaffRequest {
  fullName: string;
  role: string;
  responsibility: string;
  department: string | null;
  displayOrder: number;
  isActive: boolean;
}
