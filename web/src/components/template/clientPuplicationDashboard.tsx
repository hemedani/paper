"use client";

import React, { useState } from "react";
import EntityCard from "../organisms/EntityCard";
import ModalPuplication from "./ModalPublication";
import { DeleteModal } from "./DeleteModal";
import { deletePublication } from "@/app/actions/publication/removePuplication";
import { useRouter } from "next/navigation";
import { ToastNotify } from "@/utils/helper";

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
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPublicationId, setSelectedPublicationId] = useState<
    string | null
  >(null);

  const openModal = (id: string) => {
    setSelectedPublicationId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPublicationId(null);
  };

  const handleDelete = async () => {
    if (!selectedPublicationId) return;
    await deletePublication(selectedPublicationId);
    ToastNotify("success", "انتشارات با موفقیت حذف شد");
    closeModal();
    router.refresh();
  };

  return (
    <div>
      <ModalPuplication />
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {puplications?.map((puplication) => (
          <EntityCard
            key={puplication._id}
            title={puplication.title}
            onDelete={() => openModal(puplication._id)}
            onEdit={() => {}}
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
