import { useState } from "react";
import { FaCheck, FaTrash, FaCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import { useTaskStore } from "../stores/useTaskStore";
import { useLanguageStore } from "../stores/useLanguageStore";
import { translations } from "../data/translations";

// Task Component: Renders a single task item with a checkbox and title
export const Task = ({ task }) => {
  // Access translations
  const currentLanguage = useLanguageStore((state) => state.currentLanguage);
  const text = translations[currentLanguage];
  // Access Zustand actions
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  // Local state to toggle date visibility
  const [showDates, setShowDates] = useState(false);
  return (
    <li className="flex flex-col items-start sm:items-center justify-between p-2 border border-gray-200 rounded-md gap-2">
      {/* Task Checkbox and Title */}
      <label className="flex justify-start gap-2 cursor-pointer flex-1 w-full">
        {/* Task Checkbox */}
        <input
          type="checkbox"
          // Dynamically set checkbox state based on task.completed
          checked={task.completed}
          // Calls toggleTask function when checkbox is toggled
          onChange={() => toggleTask(task.id)}
          className="hidden peer"
        />
        {/* Custom Checkbox */}{" "}
        <div className="w-5 h-5 bg-gray-200 border-2 border-gray-300 rounded peer-checked:bg-pink-500 peer-checked:border-pink-500 relative">
          {task.completed && <FaCheck className="text-white" />}
        </div>
        {/* Task Title */}
        <span
          // Add line-through and gray color if task is completed. otherwise no additional styles for incomplete task
          className={`${task.completed ? "line-through text-gray-500" : ""}`}
        >
          {task.title}
        </span>
      </label>

      {/* Dates Section */}
      {showDates && (
        <div className="flex flex-col w-full justify-between items-start items-center">
          {/* Task Timestamp */}
          <span className="text-sm text-gray-400">
            {text.created}:{" "}
            {format(new Date(task.createdAt), "MMM dd, yyyy, h:mm a")}
          </span>

          {/* Task Due Date */}
          {task.dueDate && (
            <span className="text-sm text-darkAccent font-bold">
              {text.due}: {format(new Date(task.dueDate), "MMM dd, yyyy")}
            </span>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center w-full">
        {/* Toggle Dates Button */}
        <button
          onClick={() => setShowDates(!showDates)}
          aria-label={showDates ? text.hideDates : text.showDates}
          className="text-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <FaCalendarAlt />
        </button>

        {/* Delete button */}
        <button
          // Call deleteTask with task ID
          onClick={() => deleteTask(task.id)}
          aria-label={`${text.deleteTask}: ${task.title}`}
          className="text-accent hover:scale-110 hover:brightness-125 focus:outline-none focus:ring-2 focus:ring-red-500 ml-auto"
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );
};
