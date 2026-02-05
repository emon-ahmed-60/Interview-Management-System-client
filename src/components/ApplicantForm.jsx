import { useForm } from "react-hook-form";
import { useAddApplicant } from "../hooks/useApplicants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ApplicantForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { mutate } = useAddApplicant();

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Application submitted successfully!");
        reset();
      },
      onError: () => {
        toast.error("Failed to submit application!");
      }
    });
  };

  return (
    <div className="bg-secondary p-6 rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Job Application Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">

        <input
          placeholder="Full Name"
          {...register("name", { required: true })}
          className="p-2 rounded bg-bg border border-gray-600"
        />
        {errors.name && <span className="text-red-500">Name is required</span>}

        <input
          placeholder="Email"
          {...register("email", { required: true })}
          className="p-2 rounded bg-bg border border-gray-600"
        />
        {errors.email && <span className="text-red-500">Email is required</span>}

        <input
          placeholder="Phone"
          {...register("phone", { required: true })}
          className="p-2 rounded bg-bg border border-gray-600"
        />
        {errors.phone && <span className="text-red-500">Phone is required</span>}

        <select
          {...register("position", { required: true })}
          className="p-2 rounded bg-bg border border-gray-600"
        >
          <option className="bg-neutral" value="">Select Position</option>
          <option className="bg-neutral" value="Frontend Developer">Frontend Developer</option>
          <option className="bg-neutral" value="Backend Developer">Backend Developer</option>
          <option className="bg-neutral" value="Full Stack Developer">Full Stack Developer</option>
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
