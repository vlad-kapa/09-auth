import { Note } from "@/types/note";
import { User } from "@/types/user";
import { nextServer } from "./api";

export interface NewNote {
  title: string;
  content: string;
  tag: string;
}
interface NoteResp {
  notes: Note[];
  totalPages: number;
}
interface fetchNotesProps {
  page: number;
  search?: string;
  tag?: string;
  perPage: number;
}
export default async function fetchNotes(
  page: number,
  searchQuery?: string,
  tag?: string
): Promise<NoteResp> {
  const params: fetchNotesProps = {
    page,
    perPage: 12,
  };

  if (searchQuery) params.search = searchQuery;
  if (tag) params.tag = tag;

  const res = await nextServer.get<NoteResp>("/notes", { params });
  return res.data;
}

export async function createNote(newNoteData: NewNote) {
  const resp = await nextServer.post<Note>("/notes", newNoteData);
  return resp.data;
}

export async function deleteNote(id: string) {
  const resp = await nextServer.delete<Note>(`/notes/${id}`);
  return resp.data;
}

export async function fetchNoteById(id: string) {
  const resp = await nextServer.get<Note>(`/notes/${id}`);
  return resp.data;
}
// AUTH LOGIC
export interface Credentials {
  email: string;
  password: string;
}
export async function register(credentials: Credentials) {
  const { data } = await nextServer.post<User>("/auth/register", credentials);
  return data;
}

export async function login(credentials: Credentials) {
  const { data } = await nextServer.post<User>("/auth/login", credentials);
  return data;
}

export const logout = async () => {
  await nextServer.post<User>("/auth/logout");
};

interface SessionStatus {
  success: boolean;
}

export const checkSession = async () => {
  const { data } = await nextServer.get<SessionStatus>("/auth/session");
  return data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};
interface UserToUpdate {
  email?: string;
  username?: string;
}

export const updateUser = async (updatedUser: UserToUpdate) => {
  const { data } = await nextServer.patch<User>("/users/me", updatedUser);
  return data;
};
