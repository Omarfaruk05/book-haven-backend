import { Model } from "mongoose";

export type IBook = {
  image: string;
  title: string;
  author: string;
  authorEmail: string;
  genre: string;
  publicationTime: Date;
  reviews: string[];
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
  title?: string;
  author?: string;
  genre?: string;
  createdAt?: string;
  publicationTime?: string;
};
