import React from "react";

function DeleteBtn({ handleDelete, id }) {
  return (
    <button
      onClick={() => handleDelete(id)}
      className="text-sm font-bold py-1 px-2 rounded-md absolute top-0 right-0 text-gray-400 hover:text-red-500"
    >
      <span className="">&#10006;</span>
    </button>
  );
}

export default DeleteBtn;
