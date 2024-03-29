export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationYear: string;
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

export interface signUpFormData {
  name: string;
  email: string;
  password: string;
}
export interface signInFormData {
  email: string;
  password: string;
}

export interface IReviewResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: [];
}

export interface bookReviewData {
  book: string;
  comment: string;
}

export interface ICreateBook {
  title: string;
  author: string;
  genre: string;
  publicationYear: string;
}
