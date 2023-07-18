export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface IBooksResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: IBook[];
}
