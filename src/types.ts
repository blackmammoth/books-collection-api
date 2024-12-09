export type BookSchema = {
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
};

export type UserSchema = {
  name: string;
  password: string;
  role: string;
}