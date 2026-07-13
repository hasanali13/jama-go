export interface CreateContactRequest {
  fullName: string;
  email: string;
  phone: string | null;
  service: string;
  message: string;
}

export interface ContactSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  service: string;
  message: string;
  status: string;
  createdAt: string;
}
