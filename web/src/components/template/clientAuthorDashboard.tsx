"use client";

import { useState } from "react";
import EntityCard from "../organisms/EntityCard";
import { DeleteModal } from "./DeleteModal";
import { useRouter } from "next/navigation";
import { ToastNotify } from "@/utils/helper";
import { ModalAuthor } from "./ModalAuthor";
import { deleteAuthor } from "@/app/actions/author/removeAuthor";

interface Author {
  _id: string;
  first_name: string;
  last_name: string;
}

interface ClientDashboardProps {
  authors: Author[];
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ authors }) => {
  const router = useRouter();

  const [activeModal, setActiveModal] = useState<"edit" | "delete" | null>(
    null
  );
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

  const [hardCascade, setHardCascade] = useState<boolean>(false);

  const openModal = (type: "edit" | "delete", author: Author | null = null) => {
    setSelectedAuthor(author);
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedAuthor(null);
    setHardCascade(false);
  };

  const confirmDelete = async () => {
    if (selectedAuthor?._id) {
      await deleteAuthor(selectedAuthor._id, hardCascade);
      ToastNotify("success", "نویسنده با موفقیت حذف شد");
      router.refresh();
    }
    closeModal();
  };

  return (
    <div>
      <button
        className="absolute top-1 left-5 mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={() => openModal("edit")}
      >
        ایجاد نویسنده جدید
      </button>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {authors?.map((author) => (
          <EntityCard
            key={author._id}
            title={`${author.first_name} ${author.last_name}`}
            onDelete={() => openModal("delete", author)}
            onEdit={() => openModal("edit", author)}
          />
        ))}
      </div>

      {activeModal === "edit" && (
        <ModalAuthor
          isOpen
          onClose={closeModal}
          authorToEdit={selectedAuthor}
        />
      )}

      {activeModal === "delete" && (
        <DeleteModal
          isVisible
          onConfirm={confirmDelete}
          onCancel={closeModal}
          message="آیا مطمئن هستید که می‌خواهید این نویسنده را حذف کنید؟ این عمل قابل بازگشت نیست."
          isHardCascade={hardCascade}
          onHardCascadeChange={setHardCascade}
        />
      )}
    </div>
  );
};

export default ClientDashboard;
