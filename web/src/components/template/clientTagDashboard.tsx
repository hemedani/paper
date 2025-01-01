"use client";

import React, { useState } from "react";
import EntityCard from "../organisms/EntityCard";
import ModalTag from "./ModalTag";
import SearchBox from "../molecules/SearchBox";
import { deleteTag } from "@/app/actions/tag/removeTag";

interface Tag {
  _id: string;
  name: string;
}

interface ClientDashboardProps {
  tags: Tag[];
  searchQuery: string;
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ tags }) => {
  const handleDelete = async (_id:string) => {
    const isDelete = await deleteTag(_id)
    console.log("isDelete",isDelete);
    
  }
  const handleEdit = (id: string) => {
    console.log(`ویرایش برچسب با آیدی ${id}`);
  };

  return (
    <div>
      <ModalTag />
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tags?.map((tag) => (
          <EntityCard
            key={tag._id}
            title={tag.name}
            onDelete={() => handleDelete(tag._id)}
            onEdit={() => handleEdit(tag._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ClientDashboard;
