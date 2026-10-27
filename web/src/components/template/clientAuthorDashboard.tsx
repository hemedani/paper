"use client";

import { useState } from "react";
import EntityCard from "../organisms/EntityCard";
import { DeleteModal } from "./DeleteModal";
import { useRouter } from "next/navigation";
import { ToastNotify } from "@/utils/helper";
import { ModalAuthor } from "./ModalAuthor";
import { deleteAuthor } from "@/app/actions/author/removeAuthor";
import {
  AdminEmptyState,
  AdminIcon,
  AdminPanel,
  btn,
} from "../organisms/admin/AdminUI";

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

  const [activeModal, setActiveModal] = useState<"edit" | "delete" | null>(null);
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
    <>
      <AdminPanel
        title="فهرست نویسندگان"
        description={authors?.length ? undefined : "هنوز نویسنده‌ای ثبت نشده است"}
        icon={AdminIcon.user}
        actions={
          <button
            type="button"
            onClick={() => openModal("edit")}
            className={btn.primary}
          >
            {AdminIcon.plus}
            ایجاد نویسنده جدید
          </button>
        }
        bodyClassName="p-4"
      >
        {authors?.length ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {authors.map((author) => (
              <EntityCard
                key={author._id}
                title={`${author.first_name} ${author.last_name}`}
                onDelete={() => openModal("delete", author)}
                onEdit={() => openModal("edit", author)}
              />
            ))}
          </div>
        ) : (
          <AdminEmptyState
            title="هیچ نویسنده‌ای یافت نشد"
            description="برای شروع، اولین نویسنده را ایجاد کنید یا عبارت جستجو را تغییر دهید."
            icon={AdminIcon.user}
            action={
              <button
                type="button"
                onClick={() => openModal("edit")}
                className={`${btn.primary} mt-1`}
              >
                {AdminIcon.plus}
                ایجاد نویسنده جدید
              </button>
            }
          />
        )}
      </AdminPanel>

      {activeModal === "edit" && (
        <ModalAuthor isOpen onClose={closeModal} authorToEdit={selectedAuthor} />
      )}

      {activeModal === "delete" && (
        <DeleteModal
          isVisible
          onConfirm={confirmDelete}
          onCancel={closeModal}
          title="حذف نویسنده"
          subject={
            selectedAuthor
              ? `${selectedAuthor.first_name} ${selectedAuthor.last_name}`
              : undefined
          }
          message="این عملیات قابل بازگشت نیست و نویسنده برای همیشه حذف می‌شود."
          isHardCascade={hardCascade}
          onHardCascadeChange={setHardCascade}
        />
      )}
    </>
  );
};

export default ClientDashboard;
