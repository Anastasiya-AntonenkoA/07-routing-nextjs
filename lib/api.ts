import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const API_URL = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface NoteHttpResponse{
    notes: Note[];
    totalPages: number;
}

interface CreateNotePost {
  title: string;
  content: string;
  tag: NoteTag;
}

const api = axios.create({
  baseURL: `${API_URL}/notes`,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});

export default async function fetchNotes(
  query: string,
  page: number,
  tag?: NoteTag
): Promise<NoteHttpResponse> {
  const params: Record<string, string | number>  = {
    search: query,
    page,
    perPage: 12,
  };

  if (tag) {
    params.tag = tag;
  }

  const response = await api.get<NoteHttpResponse>("/", { params });
  return response.data;
}

export async function createNote({
  title,
  content,
  tag,
}: CreateNotePost): Promise<Note> {
  const response = await api.post<Note>("", { title, content, tag });
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(`/${id}`);
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/${id}`);
  return response.data;
}