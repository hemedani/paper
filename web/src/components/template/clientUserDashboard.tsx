"use client";

import { useRouter } from "next/navigation";
import UserCard from "../organisms/UserCard";
import { DeleteModal } from "./DeleteModal";
import { ModalUser } from "./ModalUser";
import { useState } from "react";
import { deleteUser } from "@/app/actions/user/removeUser";
import { ToastNotify } from "@/utils/helper";

interface User {
  _id: string;
  first_name: string;
  last_name: string;
  father_name: string;
  mobile: string;
  gender: string;
  birth_date: string;
  personnel_number: string;
  national_number: string;
  address: string;
  level: string;
  isVerified: string[];
}

interface ClientDashboardProps {
  users: User[];
  searchQuery: string;
}

const ClientUserDashboard: React.FC<ClientDashboardProps> = ({ users }) => {
  const router = useRouter();

  const [activeModal, setActiveModal] = useState<"edit" | "delete" | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const openModal = (type: "edit" | "delete", user: User | null = null) => {
    setSelectedUser(user);
    setActiveModal(type);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setActiveModal(null);
  };

  const handleDelete = async () => {
    if (!selectedUser?._id) return;

    await deleteUser(selectedUser._id);
    ToastNotify("success", "کاربر با موفقیت حذف شد");
    closeModal();
    router.refresh();
  };

  return (
    <div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={() => openModal("edit")}
      >
        ایجاد کاربر جدید
      </button>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users?.map((user) => (
          <UserCard
            key={user._id}
            first_name={user.first_name}
            last_name={user.last_name}
            national_number={user.national_number}
            onDelete={() => openModal("delete", user)}
            onEdit={() => openModal("edit", user)}
          />
        ))}
      </div>

      {/* مدال ایجاد/ویرایش */}
      {activeModal === "edit" && (
        <ModalUser isOpen onClose={closeModal} userToEditId={selectedUser?.national_number} />
      )}

      {/* مدال حذف */}
      {activeModal === "delete" && (
        <DeleteModal
          isVisible
          onConfirm={handleDelete}
          onCancel={closeModal}
          message="آیا از حذف کاربر مطمئن هستید؟ این عمل قابل بازگشت نیست."
        />
      )}
    </div>
  );
};

export default ClientUserDashboard;
