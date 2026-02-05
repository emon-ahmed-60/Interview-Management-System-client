import ApplicantForm from "../components/ApplicantForm";
import {
  useApplicants,
  useUpdateApplicant,
  useDeleteApplicant,
} from "../hooks/useApplicants";

export default function Dashboard() {
  const { data } = useApplicants();
  const { mutate: updateApplicant } = useUpdateApplicant();
  const { mutate: deleteApplicant } = useDeleteApplicant();

  const statusColor = (status) => {
    if (status === "Selected") return "text-accent";
    if (status === "Rejected") return "text-red-500";
    return "text-yellow-400";
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ApplicantForm />

      <h2 className="text-xl font-semibold mb-4">Applicants</h2>

      {data?.length === 0 && (
        <p className="text-gray-400">No applications yet</p>
      )}

      {data?.map(app => (
        <div
          key={app._id}
          className="bg-secondary p-4 rounded mb-4 grid grid-cols-1 md:grid-cols-8 gap-3 items-center"
        >
          {/* Applicant Info */}
          <div className="md:col-span-2">
            <p className="font-semibold">{app.name}</p>
            <p className="text-sm text-gray-400">{app.position}</p>
          </div>

          {/* Interview Date */}
          <input
            type="date"
            value={app.interviewDate}
            onChange={(e) =>
              updateApplicant({
                id: app._id,
                updates: { interviewDate: e.target.value },
              })
            }
            className="bg-bg border border-gray-600 p-1 rounded"
          />

          {/* Interview Time */}
          <input
            type="time"
            value={app.interviewTime}
            onChange={(e) =>
              updateApplicant({
                id: app._id,
                updates: { interviewTime: e.target.value },
              })
            }
            className="bg-bg border border-gray-600 p-1 rounded"
          />

          {/* Marks */}
          <input
            type="number"
            min="0"
            max="100"
            placeholder="Marks"
            value={app.marks}
            onChange={(e) =>
              updateApplicant({
                id: app._id,
                updates: { marks: e.target.value },
              })
            }
            className="bg-bg border border-gray-600 p-1 rounded"
          />

          {/* Comment */}
          <textarea
            placeholder="Comment"
            value={app.comment}
            onChange={(e) =>
              updateApplicant({
                id: app._id,
                updates: { comment: e.target.value },
              })
            }
            className="bg-bg border border-gray-600 p-1 rounded text-sm"
          />

          {/* Status */}
          <select
            value={app.status}
            onChange={(e) =>
              updateApplicant({
                id: app._id,
                updates: { status: e.target.value },
              })
            }
            className={`bg-bg border border-gray-600 p-1 rounded ${statusColor(
              app.status
            )}`}
          >
            <option>Pending</option>
            <option>Selected</option>
            <option>Rejected</option>
          </select>

          {/* Delete */}
          <button
            onClick={() => deleteApplicant(app._id)}
            className="text-red-500 hover:underline text-sm"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
