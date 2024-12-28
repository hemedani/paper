"use client";

import React, { useState } from "react";
import UserCard from "../organisms/UserCard";
import { ModalUser } from "./ModalUser";

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

export const ClientUserDashboard: React.FC<ClientDashboardProps> = ({ users }) => {
  const [userList, setUserList] = useState<User[]>(users);
  
  return (
    <div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {userList?.map((user) => (
          <UserCard
            key={user._id}
            first_name={user.first_name}
            last_name={user.last_name}
            phone={user.mobile}
            email=""
          />
        ))}
      </div>
      <ModalUser  />
    </div>
  );
};

