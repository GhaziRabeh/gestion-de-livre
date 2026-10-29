
export interface Book {
  id: number;
  title: string;
  year: number;
  image: string | null;
  author: {
    id: number;
    name: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface PaginatedBooks {
  data: Book[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}
