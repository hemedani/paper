"use client";

import { useState } from "react";
import EntityCard from "../organisms/EntityCard";
import { DeleteModal } from "./DeleteModal";
import { deleteTag } from "@/app/actions/tag/removeTag";
import ModalTag from "./ModalTag";

interface Tag {
  _id: string;
  name: string;
}

interface ClientDashboardProps {
  tags: Tag[];
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);

  const openModal = (id: string) => {
    setSelectedTagId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTagId(null), 300); // برای حذف کامل داده پس از اتمام انیمیشن
  };

  const confirmDelete = async () => {
    if (selectedTagId) {
      await deleteTag(selectedTagId);
      closeModal();
    }
  };

  const handleEdit = () => {
  };

  return (
    <div>
      <ModalTag />
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tags?.map((tag) => (
          <EntityCard
            key={tag._id}
            title={tag.name}
            onDelete={() => openModal(tag._id)}
            onEdit={() => handleEdit()}
          />
        ))}
      </div>

      <DeleteModal
        isVisible={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={closeModal}
        message="آیا مطمئن هستید که می‌خواهید این برچسب را حذف کنید؟ این عمل قابل بازگشت نیست."
      />
    </div>
  );
};

export default ClientDashboard;
