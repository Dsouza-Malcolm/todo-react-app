import React from "react";

function NavBar({ taskIds, fetchTaskById }) {
  return (
    <header className="flex justify-between items-center">
      <h2 className="text-3xl font-bold py-4 ">Todo List</h2>
      <div>
        <select
          onChange={(e) => fetchTaskById(e.target.value)}
          className="text-sm input border-gray-300 border-2 rounded-lg py-0.5 px-1"
        >
          <option value="">All Tasks</option>
          {taskIds.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}

export default NavBar;
