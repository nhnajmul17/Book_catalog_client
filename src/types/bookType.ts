/* eslint-disable @typescript-eslint/no-explicit-any */
export type IBook = {
  _id: number;
  title: string;
  author: string;
  genre: string;
  image: string;
  publicationDate: string;
  addedBy: string;
  reviews: string[];
  book?: any;
};
