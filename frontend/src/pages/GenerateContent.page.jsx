import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { generateContentApi } from "../apis/aiApi";
import { profileApi } from "../apis/usersApi";
import Loader from "../components/Loader.component";
import StatusMessage from "../components/StatusMessage.component";

const Content = () => {
  const [initialPrompt, setInitialPrompt] = useState("A prompt is required");
  const queryClient = useQueryClient();
  const [generatedContent, setGeneratedContent] = useState("");
  const mutation = useMutation({
    mutationFn: generateContentApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
    },
  });
  // Formik setup for handling form data
  const formik = useFormik({
    initialValues: {
      prompt: "",
    },
    validationSchema: Yup.object({
      prompt: Yup.string().required("A prompt is required"),
    }),
    onSubmit: (values) => {
      setInitialPrompt(values.prompt);
      mutation.mutate(values);
    },
  });

  const userQuery = useQuery({
    queryFn: profileApi,
    queryKey: ["profile"],
  });
  useEffect(() => {
    if (mutation.isSuccess) {
      setGeneratedContent(mutation?.data?.content);
    }
  }, [mutation]);
  if (userQuery.isLoading) return <Loader />;
  if (userQuery.isError)
    return (
      <StatusMessage
        type={"loading"}
        message={userQuery?.error?.response?.data?.message}
      />
    );
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-900 flex justify-center items-center p-6">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-2xl w-full p-6">
        <h4 className="text-3xl font-extrabold text-gray-800 mb-2 text-center">
          Hello, {userQuery?.data?.user?.username}
        </h4>
        <p className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Get help with writing, planning, learning, and more from Gemini AI
        </p>

        {/* Static display for Plan and Credits */}
        <div className="flex flex-wrap gap-2">
          <div className="mb-3">
            <span className="text-sm font-semibold bg-green-300 px-4 py-1 rounded-md">
              Plan :{" "}
              {userQuery?.data?.user?.subscriptionPlan
                ? userQuery?.data?.user?.subscriptionPlan
                : "Trial"}
            </span>
          </div>
          <div className="mb-3">
            <span className="text-sm font-semibold bg-green-300 px-4 py-1 rounded-md">
              Credits : {userQuery?.data?.user?.apiRequestCount} /{" "}
              {userQuery?.data?.user?.monthlyRequestCount}
            </span>
          </div>
          <Link to="/history" className="text-blue-600">
            <strong>View history</strong>
          </Link>
        </div>

        {/* Form for generating content */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Prompt input field */}
          <div>
            <label
              htmlFor="prompt"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Enter a prompt of your idea
            </label>
            <input
              id="prompt"
              type="text"
              {...formik.getFieldProps("prompt")}
              className="px-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter a topic or idea"
            />
            {formik.touched.prompt && formik.errors.prompt && (
              <div className="text-red-500 mt-1">{formik.errors.prompt}</div>
            )}
          </div>
          {mutation?.isPending && (
            <StatusMessage
              type={"loading"}
              message={"Loading Please Wait..."}
            />
          )}
          {mutation?.isSuccess && (
            <StatusMessage type={"success"} message={"Content Generated 🎉"} />
          )}
          {mutation?.isError && (
            <>
              <StatusMessage
                type={"error"}
                message={mutation?.error?.response?.data?.message}
              />
              <Link to="/plans">
                <button className=" mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-500 to-lime-500 hover:from-lime-600 hover:to-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500">
                  Buy Credits
                </button>
              </Link>
            </>
          )}
          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={initialPrompt === formik.values.prompt ? true : false}
          >
            Generate Content
          </button>
        </form>

        {/* Display generated content */}
        {generatedContent && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Generated Content:
            </h3>
            <p className="text-gray-900 overflow-auto">
              <ReactMarkdown children={generatedContent} />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;
