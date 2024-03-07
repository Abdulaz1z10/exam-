export interface IUserMe {
  age: number | null;
  avatar: string;
  description: FormDataEntryValue | null;
  first_name: string ;
  last_name: FormDataEntryValue | null | undefined;
  password: FormDataEntryValue | null;
  read_guides?: number;
  role?: string;
  todo_guides?: number;
  total_guides?: number;
  username: FormDataEntryValue | null;
  _id?: string | undefined;
}
