import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllUser = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const AxiosSecure = useAxiosSecure();
  const usersPerPage = 10;
  const queryClient = useQueryClient();

  // Fetch users
  const { data, refetch, isLoading, isError, error } = useQuery({
    queryKey: [
      "users",
      { status: statusFilter, page: currentPage + 1, limit: usersPerPage },
    ],
    queryFn: async ({ queryKey }) => {
      const [, { status, page, limit }] = queryKey;
      const response = await AxiosSecure.get("/admin/users", {
        params: { status, page, limit },
      });
      return response.data;
    },
    keepPreviousData: true,
  });

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // Block user mutation with optimistic update
  const { mutate: blockUser } = useMutation({
    mutationFn: (userId) => AxiosSecure.put(`/users/block/${userId}`),
    onMutate: (userId) => {
      const previousData = data;
      const updatedData = {
        ...previousData,
        users: previousData.users.map((user) =>
          user._id === userId ? { ...user, status: "blocked" } : user
        ),
      };
      queryClient.setQueryData(["users"], updatedData);
      return { previousData };
    },
    onError: (error, userId, context) => {
      queryClient.setQueryData(["users"], context.previousData);
      console.error("Error blocking user:", error);
    },
    onSettled: () => {
      refetch();
    },
  });

  // Unblock user mutation
  const { mutate: unblockUser } = useMutation({
    mutationFn: (userId) => AxiosSecure.put(`/users/unblock/${userId}`),
    onSuccess: () => refetch(),
    onError: (error) => console.error("Error unblocking user:", error),
  });

  // Make volunteer mutation
  const { mutate: makeVolunteer } = useMutation({
    mutationFn: (userId) => AxiosSecure.put(`/users/make-volunteer/${userId}`),
    onSuccess: () => refetch(),
    onError: (error) => console.error("Error making volunteer:", error),
  });

  // Make admin mutation
  const { mutate: makeAdmin } = useMutation({
    mutationFn: (userId) => AxiosSecure.put(`/users/make-admin/${userId}`),
    onSuccess: () => refetch(),
    onError: (error) => console.error("Error making admin:", error),
  });

  // Delete user
  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete the user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        AxiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  // Loading and error handling
  if (isLoading) {
    return (
      <div className="py-10 text-lg font-medium text-center">Loading...</div>
    );
  }

  if (isError) {
    return (
      <div className="py-10 text-lg font-medium text-center text-red-600">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen p-2 md:p-4 bg-slate-50">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-between mb-6 md:flex-row">
        <h2 className="mb-3 text-2xl font-extrabold md:text-3xl md:mb-0">
          Total Users: {data?.totalUsers}
        </h2>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md sm:overflow-x-auto md:overflow-visible">
        <table className="table w-full table-xs table-pin-rows">
          <thead className="text-base text-black">
            <tr className="text-sm bg-gradient-to-r from-red-200 to-green-100 md:text-base">
              <th className="py-2">Photo</th>
              <th className="py-2">Email</th>
              <th className="py-2">Name</th>
              <th className="py-2">Role</th>
              <th className="py-2">Status</th>
              <th className="py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.users?.map((user) => (
              <tr key={user._id} className="hover:bg-slate-100">
                <td>
                  <img
                    src={user.photoURL}
                    alt="Avatar"
                    className="object-cover w-10 h-10 rounded-full"
                  />
                </td>
                <td>{user.email}</td>
                <td>{user.displayName}</td>
                <td className="capitalize">{user.role}</td>
                <td
                  className={`font-semibold ${
                    user.status === "blocked"
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                >
                  {user.status}
                </td>
                <td>
                  <div className="flex justify-center gap-2">
                    <div className="dropdown dropdown-left">
                      <button className="text-white bg-green-400 btn btn-sm">
                        <HiDotsVertical />
                      </button>
                      <ul className="menu dropdown-content bg-green-100 rounded-md w-36 p-2 shadow z-[1]">
                        {user.status === "active" && (
                          <li>
                            <button
                              className="text-red-500"
                              onClick={() => blockUser(user._id)}
                            >
                              Block
                            </button>
                          </li>
                        )}
                        {user.status === "blocked" && (
                          <li>
                            <button
                              className="text-green-500"
                              onClick={() => unblockUser(user._id)}
                            >
                              Unblock
                            </button>
                          </li>
                        )}
                        {user.role !== "volunteer" && (
                          <li>
                            <button
                              className="text-blue-500"
                              onClick={() => makeVolunteer(user._id)}
                            >
                              Make Volunteer
                            </button>
                          </li>
                        )}
                        {user.role !== "admin" && (
                          <li>
                            <button
                              className="text-yellow-500"
                              onClick={() => makeAdmin(user._id)}
                            >
                              Make Admin
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>

                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="bg-red-100 btn btn-sm hover:bg-red-200"
                    >
                      <FaTrashAlt className="text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="flex flex-col items-center justify-between mt-10 md:flex-row">
        <p className="mb-4 text-sm text-gray-500 md:mb-0">
          Showing {currentPage * usersPerPage + 1}–
          {Math.min((currentPage + 1) * usersPerPage, data?.totalUsers)} of{" "}
          {data?.totalUsers} users
        </p>

        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={data?.totalPages || 1}
          onPageChange={handlePageClick}
          containerClassName="flex flex-wrap justify-center md:justify-end items-center gap-2 select-none"
          pageClassName="px-4 py-2 border border-gray-300 rounded-md hover:bg-green-100 cursor-pointer transition"
          activeClassName="bg-green-500 text-white border-green-500"
          previousClassName="px-4 py-2 border border-gray-300 rounded-md hover:bg-green-100 cursor-pointer transition"
          nextClassName="px-4 py-2 border border-gray-300 rounded-md hover:bg-green-100 cursor-pointer transition"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default AllUser;
