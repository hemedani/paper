"use client";

import React, { useState } from "react";
import EntityCard from "../organisms/EntityCard";
import ModalPuplication from "./ModalPublication";

interface Puplication {
  _id: string;
  title: string;
}

interface ClientPuplicationProps {
  puplications: Puplication[];
  searchQuery: string;
}

const ClientPuplicationDashboard: React.FC<ClientPuplicationProps> = ({
  puplications,
}) => {
  const [puplicationList, setPuplicationList] = useState<Puplication[]>(puplications);

  const handleDelete = (id: string) => {
    setPuplicationList((prevPuplication) => prevPuplication.filter((puplication) => puplication._id !== id));
  };

  const handleEdit = (id: string) => {
    console.log(`ویرایش برچسب با آیدی ${id}`);
  };
  
  return (
    <div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {puplicationList?.map((puplication) => (
          <EntityCard
            key={puplication._id}
            title={puplication.title}
            onDelete={() => handleDelete(puplication._id)}
            onEdit={() => handleEdit(puplication._id)}
          />
        ))}
      </div>
      <ModalPuplication />
    </div>
  );
};

export default ClientPuplicationDashboard;
