import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { NoteTag } from "@/types/note";
import fetchNotes from "@/lib/api";
import NoteList from '@/components/NoteList/NoteList';

type Props = {
  params: Promise<{ slug: string[] }>;
};

const NotesByCategory = async ({ params }: Props) => {
    const { slug } = await params;
    const tag = slug[0] === 'all' ? undefined : slug[0];
    const queryClient = new QueryClient();
    const searchWord = "";
    const page = 1;
    const notesData = await fetchNotes("", 1, tag as NoteTag | undefined);

    await queryClient.prefetchQuery({
    queryKey: ["notes", searchWord, page, tag],
    queryFn: () => fetchNotes(searchWord, page, tag as NoteTag | undefined),
  });

    return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <h1>Notes List</h1>
        <NoteList notes={notesData.notes} />
      </div>
    </HydrationBoundary>
  );
};

export default NotesByCategory;