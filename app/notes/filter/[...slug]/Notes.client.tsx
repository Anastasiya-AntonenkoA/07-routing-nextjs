"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import fetchNotes from "@/lib/api";
import { NotesClientProps } from "@/types/note";
import css from "./page.module.css"
import SearchBox from "../../../../components/SearchBox/SearchBox";
import Pagination from "../../../../components/Pagination/Pagination";
import NoteList from "../../../../components/NoteList/NoteList";
import NoteForm from "../../../../components/NoteForm/NoteForm";
import Modal from "../../../../components/Modal/Modal";

const PER_PAGE = 12;

export default function NotesClient({ tag }: NotesClientProps) {
    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 500);
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["notes", page, debouncedSearch, PER_PAGE, tag],
        queryFn: () => fetchNotes(debouncedSearch, page, tag ?? undefined),
        placeholderData: (prev) => prev,
    }); 
    
    const notes = data?.notes ?? [];
    const totalPages = data?.totalPages ?? 1;

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setPage(1);
    };
  
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
          <SearchBox value={search} onChange={handleSearchChange} />
          {totalPages > 1 && (
              <Pagination
                  totalPages={totalPages}
                  page={page}
                  onChange={setPage}
              />
          )}
          <button className={css.button} onClick={() => setIsModalOpen(true)}>Create notes</button>
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}
      <NoteList notes={notes} />
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)}/>
        </Modal>
      )}
    </div>
  );
}