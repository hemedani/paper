"use client";

import { useState } from "react";
import EntityCard from "../organisms/EntityCard";
import { DeleteModal } from "./DeleteModal";
import { useRouter } from "next/navigation";
import { ToastNotify } from "@/utils/helper";
import ModalKeyword from "./ModalKeyword";
import { deleteKeyword } from "@/app/actions/keyword/removeKeyword";

interface Keyword {
  _id: string;
  name: string;
}

interface ClientDashboardProps {
  keywords: Keyword[];
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ keywords }) => {
  const router = useRouter();

  const [activeModal, setActiveModal] = useState<"edit" | "delete" | null>(
    null
  );
  const [selectedKeyword, setSelectedKeyword] = useState<Keyword | null>(null);

  const [hardCascade, setHardCascade] = useState<boolean>(false);

  const openModal = (
    type: "edit" | "delete",
    keyword: Keyword | null = null
  ) => {
    setSelectedKeyword(keyword);
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedKeyword(null);
    setHardCascade(false);
  };

  const confirmDelete = async () => {
    if (selectedKeyword?._id) {
      await deleteKeyword(selectedKeyword._id, hardCascade);
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
        ایجاد واژه جدید
      </button>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {keywords?.map((keyword) => (
          <EntityCard
            key={keyword._id}
            title={keyword.name}
            onDelete={() => openModal("delete", keyword)}
            onEdit={() => openModal("edit", keyword)}
          />
        ))}
      </div>

      {activeModal === "edit" && (
        <ModalKeyword
          isOpen
          onClose={closeModal}
          keywordToEdit={selectedKeyword}
        />
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
