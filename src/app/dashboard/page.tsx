import { getXataClient } from "@/xata";
import React from "react";
import FolderForm from "./FolderForm";

export default async function DashboardPage() {
  const xataClient = getXataClient();
  const folders = await xataClient.db.folders.getMany();
  return (
    <div>
      <h1 className="mb-4">dashboard page</h1>
      <FolderForm />
      <div className="mb-10"></div>
      {folders.map((folder) => (
        <p key={folder.id}>{folder.name}</p>
      ))}
    </div>
  );
}
