"use client";

import React, { useState } from "react";
import EntityCard from "../organisms/EntityCard";
import ModalPuplication from "./ModalPublication";
import { deletePublication } from "@/app/actions/publication/removePublication";

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
  const handleDelete = async (id: string) => {
    const isDeleted = await deletePublication(id)
  };

  const handleEdit = (id: string) => {
    console.log(`ویرایش برچسب با آیدی ${id}`);
  };

  return (
    <div>
      <ModalPuplication />
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {puplications?.map((puplication) => (
          <EntityCard
            key={puplication._id}
            title={puplication.title}
            onDelete={() => handleDelete(puplication._id)}
            onEdit={() => handleEdit(puplication._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ClientPuplicationDashboard;
