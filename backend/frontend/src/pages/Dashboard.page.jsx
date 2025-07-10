import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteUserApi, profileApi, updateUserApi } from "../apis/usersApi";
import { useAuth } from "../AuthContext/AuthContext";
import Loader from "../components/Loader.component";
import StatusMessage from "../components/StatusMessage.component";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const { logout } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  //Update User
  const userUpdate = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
    },
  });
  //Delete User
  const deleteUser = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      logout();
      navigate("/");
    },
  });
  //User Proflie
  const userProfile = useQuery({
    queryFn: profileApi,
    queryKey: ["profile"],
  });

  useEffect(() => {
    if (userProfile.isSuccess) {
      setUsername(userProfile.data?.user?.username || "");
    }
  }, [userProfile.isSuccess, userProfile.data?.user?.username]);
  const remainingCredit =
    userProfile?.data?.user?.monthlyRequestCount -
    userProfile?.data?.user?.apiRequestCount;
  const trialExpries = new Date(
    userProfile?.data?.user?.trialExpires
  ).toDateString();

  if (userProfile?.isLoading) return <Loader />;
  if (userProfile?.isError)
    return (
      <StatusMessage
        type={"loading"}
        message={userProfile?.error?.response?.data?.message}
      />
    );
  const handleUpdate = () => {
    userUpdate.mutate({ username });
  };
  const handleDelete = () => {
    deleteUser.mutate();
  };
  return (
    <div className="mx-auto p-4 bg-gray-900 w-full">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        User Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Section */}
        <div className="mb-6 bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                id="email"
                name="email"
                value={userProfile?.data?.user?.email}
                disabled
              />
            </div>
            <button
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={username === userProfile?.data?.user?.username}
              onClick={handleUpdate}
            >
              Update
            </button>
            <button
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-red-500 to-amber-500 hover:from-amber-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              onClick={() => {
                const response = prompt(
                  'All Paid Services will be cancelled you wont be able to access it again.\nAre you sure? You want to Delete your Account?\nIf Yes Type "YES" Or Type "NO" (in uppercase)'
                );
                if (response === "YES") {
                  alert("Account deletion confirmed. Meet You Again!");
                  handleDelete();
                } else {
                  alert("Account deletion canceled. Well Are You Okay?");
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>

        {/* Credit Usage Section */}
        <div className="mb-6 bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Credit Usage</h2>
          <div>
            <p className="mb-4">
              Monthly Credit: {userProfile?.data?.user?.monthlyRequestCount}
            </p>
            <p className="mb-4">
              Credit Used: {userProfile?.data?.user?.apiRequestCount}
            </p>
            <p className="mb-4">Credit Remaining: {remainingCredit}</p>
            <p className="mb-4">
              Next Billing Date:{" "}
              {new Date(
                userProfile?.data?.user?.nextBillingDate
              ).toDateString() || "No Billing Date"}
            </p>
          </div>
        </div>

        {/* Payment and Plans Section */}
        <div className="mb-6 bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Payment & Plans</h2>
          <div>
            <p className="mb-4">
              Current Plan :{" "}
              {userProfile?.data?.user?.subscriptionPlan || "Trial"}
            </p>
            <p className="mb-4">
              Total Credits :{" "}
              {userProfile?.data?.user?.monthlyRequestCount || "Trial"}
            </p>
            <Link
              to="/plans"
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Upgrade Plan
            </Link>
          </div>
        </div>

        {/* Trial Information Section */}
        <div className="mb-6 bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Trial Information</h2>
          <div className="mb-2">
            <p className="mb-4">
              Trial Status:{" "}
              {userProfile?.data?.user?.trialActive ? (
                <span className="text-green-500">Active</span>
              ) : (
                <span className="text-red-500">Inactice</span>
              )}
            </p>
            <p className="mb-4">Expires on: {trialExpries}</p>
            <Link
              to="/plans"
              className=" py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Upgrade to Premium
            </Link>
          </div>
        </div>

        {/* History Section */}
        <div className="mb-6 bg-white p-4 shadow rounded-lg col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            Payment History
          </h2>
          {userProfile?.data?.user?.payments?.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {userProfile?.data?.user?.payments.map((payment) => {
                return (
                  <li
                    key={payment._id}
                    className="px-2 py-4 hover:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    <div className="flex flex-col sm:flex-row justify-between">
                      <div className="mb-2 sm:mb-0">
                        <p className="text-sm font-medium text-indigo-600">
                          {payment?.subscriptionPlan}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(payment.createdAt).toDateString()}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p
                          className={`text-sm font-semibold ${
                            payment?.status === "succeeded"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {payment?.status}
                        </p>
                        <p className="text-sm text-gray-700 ml-4">
                          {payment?.amount}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <h1>No Payment History</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
