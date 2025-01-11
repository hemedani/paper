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

export const ClientUserDashboard: React.FC<ClientDashboardProps> = ({
  users,
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const openModal = (id: string) => {
    setSelectedUserId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  const handleDelete = async () => {
    if (!selectedUserId) return;
    await deleteUser(selectedUserId);
    ToastNotify("success", "کاربر با موفقیت حذف شد");
    closeModal();
    router.refresh();
  };

  return (
    <div>
      <ModalUser />
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users?.map((user) => (
          <UserCard
            key={user._id}
            first_name={user.first_name}
            last_name={user.last_name}
            national_number={user.national_number}
            onDelete={() => openModal(user._id)}
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
