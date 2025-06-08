export interface PageResult<T> {
  records: T[];
  total: number;
  size: number;
  current: number;
  optimizeCountSql: boolean;
  searchCount: boolean;
  maxLimit: number | null;
  countId: string | null;
  pages: number;
}