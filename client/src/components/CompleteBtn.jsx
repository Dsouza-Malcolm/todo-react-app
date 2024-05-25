import React from "react";

function CompleteBtn({ id, taskComplete }) {
  return (
    <button
      onClick={() => taskComplete(id)}
      className="bg-green-400 font-black text-base py-0.5 px-2 rounded-md hover:bg-green-500"
    >
      <span>&#10003;</span>
    </button>
  );
}

export default CompleteBtn;
