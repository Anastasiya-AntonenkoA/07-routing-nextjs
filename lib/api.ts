import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const API_URL = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface NoteHttpResponse{
    notes: Note[];
    totalPages: number;
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
});

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
}

// export default async function fetchNotes(
//   page: number,
//   search: string,
//   perPage?: number
// ): Promise<{ notes: Note[]; totalPages: number }> {
//   const response = await api.get<{ notes: Note[]; totalPages: number }>("/notes", {
//     params: { page, search, ...(perPage ? { perPage } : {}) },
//   });
//   return response.data;
// }

export default async function fetchNotes(query: string, page: number, tag?: NoteTag): Promise<NoteHttpResponse> {
    const response = await axios.get<NoteHttpResponse>("", {
        params: {
            search: query,
            page: page,
            perPage: 12,
            tag: tag || undefined,
        },
        headers: {
        accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    }
    )
    return response.data;
}

export async function createNote(newNote: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> {
  const response = await api.post<Note>("/notes", newNote);
  return response.data;
}

export const deleteNote = async (id: string): Promise<Note> => {
    const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};