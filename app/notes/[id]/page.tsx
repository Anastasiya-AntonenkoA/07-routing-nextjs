import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

type Props = {
    params: Promise<{ id: string }>;
};

const NoteDetailsPage = async ({ params }: Props) => {
    const { id } = await params;
    const queryClient = new QueryClient();

    if (id) {
        await queryClient.prefetchQuery({
            queryKey: ["note", id],
            queryFn: () => fetchNoteById(id),
        });
    }

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState} key={id}>
            <NoteDetailsClient />
        </HydrationBoundary>
    );
};

export default NoteDetailsPage;