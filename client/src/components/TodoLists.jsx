import React, { useState } from "react";
import CompleteBtn from "./CompleteBtn";
import EditBtn from "./EditBtn";
import CreateTodo from "./CreateTodo";
import DeleteBtn from "./DeleteBtn";

function TodoLists({ id, todo, taskComplete, updateTodo, deleteTodo }) {
  const [editing, setEditing] = useState(false);

  const handleEdit = function () {
    setEditing(true);
  };

  const handleSave = (updatedTask) => {
    updateTodo(id, updatedTask);
    setEditing(false);
  };

  const handleDelete = () => {
    deleteTodo(id);
  };

  return (
    <div key={id}>
      {editing ? (
        <CreateTodo
          existingTask={todo}
          handleSave={handleSave}
          editing={editing}
        />
      ) : (
        <div
          className="bg-slate-100 rounded-lg p-5 flex flex-col gap-y-5"
          key={id}
        >
          <div className="relative">
            <h3 className="text-xl font-semibold text-center">{todo.title}</h3>
            <DeleteBtn handleDelete={handleDelete} />
          </div>
          <hr />
          <p className="">{todo.description}</p>
          <div className="flex flex-col gap-y-3">
            <p className="text-sm font-medium text-gray-700">
              Due Date: {todo.dueDate}
            </p>
          </div>
          <div className="flex justify-between items-end gap-x-6">
            <p className="text-sm bg-gray-300 rounded-md py-0.5 px-1 w-fit h-fit">
              {todo.status}
            </p>
            <div className="flex gap-x-4">
              <EditBtn handleEdit={handleEdit} />
              <CompleteBtn id={id} taskComplete={taskComplete} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoLists;
