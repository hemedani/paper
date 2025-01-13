"use client";

import { useState } from "react";
import EntityCard from "../organisms/EntityCard";
import { DeleteModal } from "./DeleteModal";
import { deleteTag } from "@/app/actions/tag/removeTag";
import ModalTag from "./ModalTag";
import { useRouter } from "next/navigation";
import { ToastNotify } from "@/utils/helper";

interface Tag {
  _id: string;
  name: string;
}

interface ClientDashboardProps {
  tags: Tag[];
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ tags }) => {
  const router = useRouter();

  const [activeModal, setActiveModal] = useState<"edit" | "delete" | null>(
    null
  );
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  const [hardCascade, setHardCascade] = useState<boolean>(false);

  const openModal = (type: "edit" | "delete", tag: Tag | null = null) => {
    setSelectedTag(tag);
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedTag(null);
    setHardCascade(false);
  };

  const confirmDelete = async () => {
    if (selectedTag?._id) {
      await deleteTag(selectedTag._id, hardCascade);
      ToastNotify("success", "برچسب با موفقیت حذف شد");
      router.refresh();
    }
    closeModal();
  };

  return (
    <div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={() => openModal("edit")}
      >
        ایجاد برچسب جدید
      </button>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tags?.map((tag) => (
          <EntityCard
            key={tag._id}
            title={tag.name}
            onDelete={() => openModal("delete", tag)}
            onEdit={() => openModal("edit", tag)}
          />
        ))}
      </div>

      {activeModal === "edit" && (
        <ModalTag isOpen onClose={closeModal} tagToEdit={selectedTag} />
      )}

      {activeModal === "delete" && (
        <DeleteModal
          isVisible
          onConfirm={confirmDelete}
          onCancel={closeModal}
          message="آیا مطمئن هستید که می‌خواهید این برچسب را حذف کنید؟ این عمل قابل بازگشت نیست."
          isHardCascade={hardCascade}
          onHardCascadeChange={setHardCascade}
        />
      )}
    </div>
  );
};

export default ClientDashboard;
