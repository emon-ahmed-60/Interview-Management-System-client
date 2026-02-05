import { useForm } from "react-hook-form";
import { useAddApplicant } from "../hooks/useApplicants";

export default function ApplicantForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { mutate } = useAddApplicant();

  const onSubmit = (data) => {
    mutate(data);
    reset();
  };

  // Example positions
  const positions = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
  ];

  return (
    <div className="bg-secondary p-6 rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Job Application Form</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">

        <input
          placeholder="Full Name"
          className="p-2 rounded bg-bg border border-gray-600"
          {...register("name", { required: true })}
        />
        {errors.name && <span className="text-red-500">Name is required</span>}

        <input
          placeholder="Email"
          className="p-2 rounded bg-bg border border-gray-600"
          {...register("email", { required: true })}
        />

        <input
          placeholder="Phone"
          className="p-2 rounded bg-bg border border-gray-600"
          {...register("phone", { required: true })}
        />

        <select
          {...register("position", { required: true })}
          className="p-2 rounded bg-bg border border-gray-600"
        >
          <option className="bg-neutral" value="">Select Position</option>
          {positions.map((pos, idx) => (
            <option className="bg-neutral" key={idx} value={pos}>{pos}</option>
          ))}
        </select>
        {errors.position && <span className="text-red-500">Position is required</span>}

        <button
          type="submit"
          className="bg-primary py-2 rounded hover:opacity-90"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
