"use client";

import { useState } from "react";
import EntityCard from "../organisms/EntityCard";
import { DeleteModal } from "./DeleteModal";
import { deleteTag } from "@/app/actions/tag/removeTag";
import { useRouter } from "next/navigation";
import { ToastNotify } from "@/utils/helper";
import { remove } from "@/app/actions/category/remove";
import CreateUpdateModal from "./CreateUpdateModal";
import {
  AdminEmptyState,
  AdminIcon,
  AdminPanel,
  btn,
} from "../organisms/admin/AdminUI";

interface TData {
  _id: string;
  name: string;
}

interface ClientDashboardProps {
  data: TData[];
  model: "tag" | "category";
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ data, model }) => {
  const router = useRouter();

  const [activeModal, setActiveModal] = useState<"edit" | "delete" | null>(null);
  const [selectedItem, setSelectedItem] = useState<TData | null>(null);

  const [hardCascade, setHardCascade] = useState<boolean>(false);

  const openModal = (type: "edit" | "delete", item: TData | null = null) => {
    setSelectedItem(item);
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedItem(null);
    setHardCascade(false);
  };

  const persianModel = model === "tag" ? "برچسب" : "دسته بندی (وبلاگ)";
  const listTitle = model === "tag" ? "فهرست برچسب‌ها" : "فهرست دسته‌بندی‌ها";
  const icon = model === "tag" ? AdminIcon.tag : AdminIcon.folder;

  const confirmDelete = async () => {
    if (selectedItem?._id) {
      const removedItem =
        model === "tag"
          ? await deleteTag(selectedItem._id, hardCascade)
          : await remove(selectedItem._id, hardCascade);

      if (removedItem.succes) {
        ToastNotify("success", `${persianModel} با موفقیت حذف شد`);
      } else {
        ToastNotify(
          "error",
          `مشکلی در حذف ${persianModel} وجود دارد - ${removedItem.body.message}}`
        );
      }

      router.refresh();
    }
    closeModal();
  };

  return (
    <>
      <AdminPanel
        title={listTitle}
        description={data?.length ? undefined : "هنوز موردی ثبت نشده است"}
        icon={icon}
        actions={
          <button
            type="button"
            onClick={() => openModal("edit")}
            className={btn.primary}
          >
            {AdminIcon.plus}
            ایجاد {persianModel} جدید
          </button>
        }
        bodyClassName="p-4"
      >
        {data?.length ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {data.map((item) => (
              <EntityCard
                key={item._id}
                title={item.name}
                onDelete={() => openModal("delete", item)}
                onEdit={() => openModal("edit", item)}
              />
            ))}
          </div>
        ) : (
          <AdminEmptyState
            title={`هیچ ${persianModel}ی یافت نشد`}
            description={`برای شروع، اولین ${persianModel} را ایجاد کنید یا عبارت جستجو را تغییر دهید.`}
            icon={icon}
            action={
              <button
                type="button"
                onClick={() => openModal("edit")}
                className={`${btn.primary} mt-1`}
              >
                {AdminIcon.plus}
                ایجاد {persianModel} جدید
              </button>
            }
          />
        )}
      </AdminPanel>

      {activeModal === "edit" && (
        <CreateUpdateModal
          isOpen
          onClose={closeModal}
          itemToEdit={selectedItem}
          model={model}
        />
      )}

      {activeModal === "delete" && (
        <DeleteModal
          isVisible
          onConfirm={confirmDelete}
          onCancel={closeModal}
          title={`حذف ${persianModel}`}
          subject={selectedItem?.name}
          message="این عملیات قابل بازگشت نیست و مورد برای همیشه حذف می‌شود."
          isHardCascade={hardCascade}
          onHardCascadeChange={setHardCascade}
        />
      )}
    </>
  );
};

export default ClientDashboard;
