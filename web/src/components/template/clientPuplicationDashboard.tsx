"use client";

import React, { useState } from "react";
import EntityCard from "../organisms/EntityCard";
import ModalPuplication from "./ModalPublication";
import { DeleteModal } from "./DeleteModal";
import { deletePublication } from "@/app/actions/publication/removePuplication";

interface Puplication {
  _id: string;
  title: string;
}

interface ClientPuplicationProps {
  puplications: Puplication[];
  searchQuery: string;
}

const ClientPuplicationDashboard: React.FC<ClientPuplicationProps> = ({
  puplications,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPublicationId, setSelectedTagId] = useState<string | null>(
    null
  );

  const openModal = (id: string) => {
    setSelectedTagId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTagId(null);
  };

  const handleDelete = async () => {
    if (!selectedPublicationId) return;
    await deletePublication(selectedPublicationId);
    closeModal();
  };

  const handleEdit = () => {};

  return (
    <div>
      <ModalPuplication />
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {puplications?.map((puplication) => (
          <EntityCard
            key={puplication._id}
            title={puplication.title}
            onDelete={() => openModal(puplication._id)}
            onEdit={() => handleEdit()}
          />
        ))}
      </div>

      <DeleteModal
        isVisible={isModalOpen}
        onConfirm={handleDelete}
        onCancel={closeModal}
        message="آیا از حذف مطمئن هستید؟ این عمل قابل بازگشت نیست."
      />
    </div>
  );
};

export default ClientPuplicationDashboard;
