export interface PageResponse<D> {
  content: D,
  totalElements: number,
  totalPages: number,
  size: number,
  pageable: { pageNumber: number}
}
