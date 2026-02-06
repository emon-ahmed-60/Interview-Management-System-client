import { useState } from "react";
import ApplicantForm from "../components/ApplicantForm";
import {
  useApplicants,
  useUpdateApplicant,
  useDeleteApplicant,
} from "../hooks/useApplicants";
import { toast } from "react-toastify";

export default function Dashboard() {
  const { data, isLoading, refetch } = useApplicants();
  const { mutateAsync: updateApplicant } = useUpdateApplicant();
  const { mutateAsync: deleteApplicant } = useDeleteApplicant();

  const [editedData, setEditedData] = useState({});

  if (isLoading)
    return (
      <p className="text-center mt-[40vh]">
        <span className="loading loading-dots loading-xl"></span>
      </p>
    );

  const statusColor = (status) => {
    if (status === "Selected") return "text-accent";
    if (status === "Rejected") return "text-red-500";
    return "text-yellow-400";
  };

  const handleChange = (id, field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleUpdate = async (id) => {
    if (!editedData[id]) {
      toast.error("No changes to update");
      return;
    }

    try {
      await updateApplicant({ id, updates: editedData[id] });
      toast.success("Applicant updated successfully ✅");
      setEditedData((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      refetch();
    } catch {
      toast.error("Update failed ❌");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteApplicant(id);
      toast.success("Applicant deleted ❌");
      refetch();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ApplicantForm />

      <h2 className="text-xl font-semibold mb-4">Applicants</h2>

      {data?.map((app) => {
        const current = editedData[app._id] || app;

        return (
          <div
            key={app._id}
            className="
        bg-secondary rounded-lg mb-4
        grid grid-cols-1 md:grid-cols-8
        gap-5 items-center
        px-6 py-5
      "
          >
            {/* Name */}
            <div className="md:col-span-2">
              <p className="font-semibold text-base-100">{app.name}</p>
              <p className="text-sm text-gray-400">{app.position}</p>
            </div>

            {/* Date */}
            <input
              type="date"
              value={current.interviewDate || ""}
              onChange={(e) =>
                handleChange(app._id, "interviewDate", e.target.value)
              }
              className="
          bg-neutral border border-gray-600
          h-[42px] px-1 rounded
          text-[15px] text-base-100
          [color-scheme:dark]
        "
            />

            {/* Time */}
            <input
              type="time"
              value={current.interviewTime || ""}
              onChange={(e) =>
                handleChange(app._id, "interviewTime", e.target.value)
              }
              className="
          bg-neutral border border-gray-600
          h-[42px] px-2 rounded
          text-[15px] text-base-100
          [color-scheme:dark]
        "
            />

            {/* Marks */}
            <input
              type="number"
              min="0"
              max="100"
              placeholder="Marks"
              value={current.marks || ""}
              onChange={(e) => handleChange(app._id, "marks", e.target.value)}
              className="
          bg-neutral border border-gray-600
          h-[42px] px-3 rounded
          text-center text-[15px] text-base-100
          placeholder:text-center
          appearance-auto
        "
            />

            {/* Status */}
            <select
              value={current.status}
              onChange={(e) => handleChange(app._id, "status", e.target.value)}
              className={`
          bg-neutral border border-gray-600
          h-[42px] pl-3 rounded
          text-[15px]
          ${statusColor(current.status)}
        `}
            >
              <option className="text-yellow-400">Pending</option>
              <option className="text-accent">Selected</option>
              <option className="text-red-500">Rejected</option>
            </select>

            {/* Update */}
            <button
              onClick={() => handleUpdate(app._id)}
              className="
          bg-primary text-white
          h-[42px] px-4 rounded
          text-sm
        "
            >
              Update
            </button>

            {/* Delete */}
            <button
              onClick={() => handleDelete(app._id)}
              className="
          bg-primary text-white
          h-[42px] px-4 rounded
          text-sm
        "
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
