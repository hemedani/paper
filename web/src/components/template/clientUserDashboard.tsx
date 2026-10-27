"use client";

import { useRouter } from "next/navigation";
import { DeleteModal } from "./DeleteModal";
import { useState } from "react";
import { deleteUser } from "@/app/actions/user/removeUser";
import { ToastNotify } from "@/utils/helper";
import UserCard from "@/components/organisms/user/UserCard";
import { AdminEmptyState, AdminIcon } from "@/components/organisms/admin/AdminUI";

interface User {
  _id: string;
  first_name: string;
  last_name: string;
  personnel_number: string;
  national_number: string;
  level: string;
}

interface ClientDashboardProps {
  users: User[];
  searchQuery: string;
}

const ClientUserDashboard: React.FC<ClientDashboardProps> = ({ users = [] }) => {
  const router = useRouter();

  const [activeModal, setActiveModal] = useState<"edit" | "delete" | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isHardCascade, setIsHardCascade] = useState(false);

  const openDelete = (user: User) => {
    setSelectedUser(user);
    setActiveModal("delete");
  };

  const closeModal = () => {
    setSelectedUser(null);
    setActiveModal(null);
    setIsHardCascade(false);
  };

  const handleDelete = async () => {
    if (!selectedUser?._id) return;

    try {
      await deleteUser(selectedUser._id, isHardCascade);
      ToastNotify("success", "کاربر با موفقیت حذف شد");
      router.refresh();
    } catch (error) {
      console.error("خطا در حذف کاربر:", error);
      ToastNotify("error", "مشکلی در حذف کاربر به وجود آمده است.");
    } finally {
      closeModal();
    }
  };

  if (users.length === 0) {
    return (
      <AdminEmptyState
        icon={AdminIcon.empty}
        title="کاربری پیدا نشد"
        description="با تغییر فیلتر سطح دسترسی یا ساخت یک کاربر جدید شروع کنید."
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 xl:grid-cols-3">
        {users.map((user) => (
          <UserCard
            key={user._id}
            id={user._id}
            first_name={user.first_name}
            last_name={user.last_name}
            national_number={user.national_number}
            level={user.level}
            onDelete={() => openDelete(user)}
          />
        ))}
      </div>

      {activeModal === "delete" && (
        <DeleteModal
          isVisible
          onConfirm={handleDelete}
          onCancel={closeModal}
          message={`آیا از حذف کاربر «${selectedUser?.first_name ?? ""} ${
            selectedUser?.last_name ?? ""
          }» مطمئن هستید؟ این عمل قابل بازگشت نیست.`}
          isHardCascade={isHardCascade}
          onHardCascadeChange={setIsHardCascade}
        />
      )}
    </>
  );
};

export default ClientUserDashboard;
