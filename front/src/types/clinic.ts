export type Clinic = {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  isActive: boolean;
};

export type PaginatedResult<T> = {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
};