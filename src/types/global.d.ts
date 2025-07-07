export interface PageResult<T> {
  total: number;
  current: number;
  size: number;
  pages: number;
  records: T[];
}

export interface PageParams {
  current: number;
  size: number;
}
