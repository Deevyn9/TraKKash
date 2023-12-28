import { getXataClient } from "@/xata";
import React from "react";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(5),
});

export default function FolderForm() {
  async function createFolder(formData: FormData) {
    "use server";
    const parsedForm = schema.parse({
      name: formData.get("name"),
    });
    const xataClient = getXataClient();
    await xataClient.db.folders.create(parsedForm);
  }
  return (
    <form
      className="mb-4 w-full flex gap-x-2 items-center"
      action={createFolder}
    >
      <div className="grow">
        <label
          className="text-gray-300 text-sm font-bold mb-2 hidden"
          htmlFor="name"
          aria-label="New Folder"
        >
          New Name
        </label>
        <input
          className="shadow appearance-none border-2 border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
          name="name"
          id="name"
          type="text"
          placeholder="my folder"
        />
      </div>
      <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus: shadow-outline w-32">
        Submit
      </button>
    </form>
  );
}
