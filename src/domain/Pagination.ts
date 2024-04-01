export interface Pagination {
  current_page: number
  last_page: number
  total_pages: number
  per_page: number
}

export const Paginate: Pagination = {
  current_page: 1,
  last_page: 1,
  total_pages: 1,
  per_page: 1
};