"use client";

import { useState } from "react";
import EntityCard from "../organisms/EntityCard";
import { DeleteModal } from "./DeleteModal";
import { useRouter } from "next/navigation";
import { ToastNotify } from "@/utils/helper";
import ModalKeyword from "./ModalKeyword";
import { deleteKeyword } from "@/app/actions/keyword/removeKeyword";
import {
  AdminEmptyState,
  AdminIcon,
  AdminPanel,
  btn,
} from "../organisms/admin/AdminUI";

interface Keyword {
  _id: string;
  name: string;
}

interface ClientDashboardProps {
  keywords: Keyword[];
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ keywords }) => {
  const router = useRouter();

  const [activeModal, setActiveModal] = useState<"edit" | "delete" | null>(null);
  const [selectedKeyword, setSelectedKeyword] = useState<Keyword | null>(null);

  const [hardCascade, setHardCascade] = useState<boolean>(false);

  const openModal = (type: "edit" | "delete", keyword: Keyword | null = null) => {
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
      ToastNotify("success", "کلمه کلیدی با موفقیت حذف شد");
      router.refresh();
    }
    closeModal();
  };

  return (
    <>
      <AdminPanel
        title="فهرست کلمات کلیدی"
        description={keywords?.length ? undefined : "هنوز کلمه کلیدی ثبت نشده است"}
        icon={AdminIcon.key}
        actions={
          <button
            type="button"
            onClick={() => openModal("edit")}
            className={btn.primary}
          >
            {AdminIcon.plus}
            ایجاد کلمه کلیدی جدید
          </button>
        }
        bodyClassName="p-4"
      >
        {keywords?.length ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {keywords.map((keyword) => (
              <EntityCard
                key={keyword._id}
                title={keyword.name}
                onDelete={() => openModal("delete", keyword)}
                onEdit={() => openModal("edit", keyword)}
              />
            ))}
          </div>
        ) : (
          <AdminEmptyState
            title="هیچ کلمه کلیدی‌ای یافت نشد"
            description="برای شروع، اولین کلمه کلیدی را ایجاد کنید یا عبارت جستجو را تغییر دهید."
            icon={AdminIcon.key}
            action={
              <button
                type="button"
                onClick={() => openModal("edit")}
                className={`${btn.primary} mt-1`}
              >
                {AdminIcon.plus}
                ایجاد کلمه کلیدی جدید
              </button>
            }
          />
        )}
      </AdminPanel>

      {activeModal === "edit" && (
        <ModalKeyword isOpen onClose={closeModal} keywordToEdit={selectedKeyword} />
      )}

      {activeModal === "delete" && (
        <DeleteModal
          isVisible
          onConfirm={confirmDelete}
          onCancel={closeModal}
          title="حذف کلمه کلیدی"
          subject={selectedKeyword?.name}
          message="این عملیات قابل بازگشت نیست و کلمه کلیدی برای همیشه حذف می‌شود."
          isHardCascade={hardCascade}
          onHardCascadeChange={setHardCascade}
        />
      )}
    </>
  );
};

export default ClientDashboard;
