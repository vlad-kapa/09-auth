import { cookies } from "next/headers";
import { nextServer } from "./api";
import { Note } from "@/types/note";
import { User } from "@/types/user";

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const responce = await nextServer.get("/auth/session", {
    headers: { Cookie: cookieStore.toString() },
  });
  return responce;
};

interface NoteResp {
  notes: Note[];
  totalPages: number;
}
interface fetchNotesProps {
  params: { page: number; search?: string; tag?: string; perPage: number };
  headers: { Cookie: string };
}

export async function fetchNotes(
  page: number,
  searchQuery?: string,
  tag?: string
): Promise<NoteResp> {
  const cookieStore = cookies();
  const params: fetchNotesProps = {
    params: { page, perPage: 12 },
    headers: { Cookie: cookieStore.toString() },
  };

  if (searchQuery) params.params.search = searchQuery;
  if (tag) params.params.tag = tag;

  const res = await nextServer.get<NoteResp>("/notes", { params });
  return res.data;
}
export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });

  return response.data;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>("/users/me", {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};
