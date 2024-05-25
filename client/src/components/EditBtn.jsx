import React from "react";

function EditBtn({ handleEdit }) {
  return (
    <button
      onClick={handleEdit}
      className="bg-slate-950 text-white text-sm font-bold py-1 px-2 rounded-md"
    >
      <span>Edit</span>
    </button>
  );
}

export default EditBtn;
