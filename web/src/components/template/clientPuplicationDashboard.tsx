"use client";

import React, { useState } from "react";
import EntityCard from "../organisms/EntityCard";
import ModalPublication from "./ModalPublication";
import { DeleteModal } from "./DeleteModal";
import { deletePublication } from "@/app/actions/publication/removePuplication";
import { useRouter } from "next/navigation";
import { ToastNotify } from "@/utils/helper";
import {
  AdminEmptyState,
  AdminIcon,
  AdminPanel,
  btn,
} from "../organisms/admin/AdminUI";

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

  const [activeModal, setActiveModal] = useState<"edit" | "delete" | null>(null);
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
      ToastNotify("success", "ناشر با موفقیت حذف شد");
      router.refresh();
    }
    closeModal();
  };

  return (
    <>
      <AdminPanel
        title="فهرست ناشران"
        description={publications?.length ? undefined : "هنوز ناشری ثبت نشده است"}
        icon={AdminIcon.news}
        actions={
          <button
            type="button"
            onClick={() => openModal("edit")}
            className={btn.primary}
          >
            {AdminIcon.plus}
            ایجاد ناشر جدید
          </button>
        }
        bodyClassName="p-4"
      >
        {publications?.length ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {publications.map((publication) => (
              <EntityCard
                key={publication._id}
                title={publication.title}
                onDelete={() => openModal("delete", publication)}
                onEdit={() => openModal("edit", publication)}
              />
            ))}
          </div>
        ) : (
          <AdminEmptyState
            title="هیچ ناشری یافت نشد"
            description="برای شروع، اولین ناشر را ایجاد کنید یا عبارت جستجو را تغییر دهید."
            icon={AdminIcon.news}
            action={
              <button
                type="button"
                onClick={() => openModal("edit")}
                className={`${btn.primary} mt-1`}
              >
                {AdminIcon.plus}
                ایجاد ناشر جدید
              </button>
            }
          />
        )}
      </AdminPanel>

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
          title="حذف ناشر"
          subject={selectedPublication?.title}
          message="این عملیات قابل بازگشت نیست و ناشر برای همیشه حذف می‌شود."
          isHardCascade={isHardCascade}
          onHardCascadeChange={setIsHardCascade}
        />
      )}
    </>
  );
};

export default ClientPublicationDashboard;
