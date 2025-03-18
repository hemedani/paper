"use client";

import React, { useState } from "react";
import EntityCard from "../organisms/EntityCard";
import ModalPublication from "./ModalPublication";
import { DeleteModal } from "./DeleteModal";
import { deletePublication } from "@/app/actions/publication/removePuplication";
import { useRouter } from "next/navigation";
import { ToastNotify } from "@/utils/helper";

interface Publication {
  _id: string;
  title: string;
}

interface ClientPublicationProps {
  publications: Publication[];
}

const ClientPublicationDashboard: React.FC<ClientPublicationProps> = ({
  publications,
}) => {
  const router = useRouter();

  const [activeModal, setActiveModal] = useState<"edit" | "delete" | null>(
    null
  );
  const [selectedPublication, setSelectedPublication] =
    useState<Publication | null>(null);

  // State for hard cascade
  const [isHardCascade, setIsHardCascade] = useState(false);

  const openModal = (
    type: "edit" | "delete",
    publication: Publication | null = null
  ) => {
    setSelectedPublication(publication);
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedPublication(null);
    setIsHardCascade(false); // Reset hard cascade
  };

  const confirmDelete = async () => {
    if (selectedPublication?._id) {
      await deletePublication(selectedPublication._id, isHardCascade);
      ToastNotify("success", "انتشارات با موفقیت حذف شد");
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
        ایجاد انتشارات جدید
      </button>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {publications?.map((publication) => (
          <EntityCard
            key={publication._id}
            title={publication.title}
            onDelete={() => openModal("delete", publication)}
            onEdit={() => openModal("edit", publication)}
          />
        ))}
      </div>

      {/* Modal for Create/Edit */}
      {activeModal === "edit" && (
        <ModalPublication
          isOpen
          onClose={closeModal}
          publicationToEdit={selectedPublication}
        />
      )}

      {/* Modal for Delete */}
      {activeModal === "delete" && (
        <DeleteModal
          isVisible
          onConfirm={confirmDelete}
          onCancel={closeModal}
          message="آیا از حذف مطمئن هستید؟ این عمل قابل بازگشت نیست."
          isHardCascade={isHardCascade}
          onHardCascadeChange={setIsHardCascade}
        />
      )}
    </div>
  );
};

export default ClientPublicationDashboard;
