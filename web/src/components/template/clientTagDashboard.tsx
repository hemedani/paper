"use client";

import React, { useState } from "react";
import EntityCard from "../organisms/EntityCard";
import ModalTag from "./ModalTag";
import SearchBox from "../molecules/SearchBox";

interface Tag {
  _id: string;
  name: string;
}

interface ClientDashboardProps {
  tags: Tag[];
  searchQuery: string;
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({
  tags,
}) => {
  const [tagList, setTagList] = useState<Tag[]>(tags);

  const handleDelete = (id: string) => {
    setTagList((prevTags) => prevTags.filter((tag) => tag._id !== id));
  };

  const handleEdit = (id: string) => {
    console.log(`ویرایش برچسب با آیدی ${id}`);
  };
  
  return (
    <div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tagList?.map((tag) => (
          <EntityCard
            key={tag._id}
            title={tag.name}
            onDelete={() => handleDelete(tag._id)}
            onEdit={() => handleEdit(tag._id)}
          />
        ))}
      </div>
      <ModalTag />
    </div>
  );
};

export default ClientDashboard;
