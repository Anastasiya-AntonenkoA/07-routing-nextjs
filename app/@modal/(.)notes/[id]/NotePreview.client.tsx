"use client";

import css from "./NotePreview.module.css";
import Modal from "@/components/Modal/Modal";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const NotePreview = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {data: note, isLoading, error} = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
    retry: false,
  });

  const handleClose = () => router.back();

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <p className={css.loading}>Loading, please wait...</p>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal onClose={handleClose}>
        <div className={css.errorContainer}>
          <h2>Error loading note</h2>
          <p>Failed to load note with ID: **{id}**.</p>
          <p>Details: {error instanceof Error ? error.message : "Unknown error"}</p>
          <button onClick={handleClose} className={css.backBtn}>
            Close
          </button>
        </div>
      </Modal>
    );
  }
  
  if (!note) {
    return (
      <Modal onClose={handleClose}>
        <div className={css.errorContainer}>
          <h2>Note not found</h2>
          <p>Note with ID:: **{id}** is missing or has been deleted.</p>
          <button onClick={handleClose} className={css.backBtn}>
            Close
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <button onClick={handleClose} className={css.backBtn}>
              Back
            </button>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreview;