import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { NoteTag } from "@/types/note";
import fetchNotes from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const PER_PAGE = 12;

const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug[0].toLowerCase() === 'all' ? null : slug[0];

  const tagForFetch = tag === null ? undefined : (tag as NoteTag);
  const queryClient = new QueryClient();
  const searchWord = "";
  const page = 1;

    await queryClient.prefetchQuery({
    queryKey: ["notes", page, searchWord, PER_PAGE, tag],
    queryFn: () => fetchNotes(searchWord, page, tagForFetch ),
  });
    return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <h1>Notes by category: {tag || 'All'}</h1>
        <NotesClient tag={tag as NoteTag | null} />
      </div>
    </HydrationBoundary>
  );
};

export default NotesByCategory;