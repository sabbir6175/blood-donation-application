import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import ReactPaginate from "react-paginate";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";

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
      const response = await AxiosSecure.get("http://localhost:7000/users", {
        params: { status, page, limit },
        // headers: {
        //   authorization: `Bearer ${localStorage.getItem('access-token')}`
        // }
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
    mutationFn: (userId) =>
      AxiosSecure.put(`http://localhost:7000/users/block/${userId}`),
    onMutate: (userId) => {
      // Optimistically update the UI
      const previousData = data;
      const updatedData = {
        ...previousData,
        users: previousData.users.map((user) =>
          user._id === userId ? { ...user, status: "blocked" } : user
        ),
      };
      queryClient.setQueryData(["users"], updatedData);
    },
    onError: (error, userId, context) => {
      // Rollback if there's an error
      queryClient.setQueryData(["users"], context.previousData);
      console.error("Error blocking user:", error);
    },
    onSettled: () => {
      refetch(); // refetch data after mutation
    },
  });

  // Unblock user mutation
  const { mutate: unblockUser } = useMutation({
    mutationFn: (userId) =>
      AxiosSecure.put(`http://localhost:7000/users/unblock/${userId}`),
    onSuccess: () => refetch(),
    onError: (error) => console.error("Error unblocking user:", error),
  });

  // Make volunteer mutation
  const { mutate: makeVolunteer } = useMutation({
    mutationFn: (userId) =>
      AxiosSecure.put(`http://localhost:7000/users/make-volunteer/${userId}`),
    onSuccess: () => refetch(),
    onError: (error) => console.error("Error making volunteer:", error),
  });

  // Make admin mutation
  const { mutate: makeAdmin } = useMutation({
    mutationFn: (userId) =>
      AxiosSecure.put(`http://localhost:7000/users/make-admin/${userId}`),
    onSuccess: () => refetch(),
    onError: (error) => console.error("Error making admin:", error),
  });

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
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
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  // Loading and error handling
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="overflow-y-auto md:overflow-hidden">
      <div className="flex justify-between my-4">
        <h2 className="text-3xl font-extrabold">All Users</h2>
        <h2 className="text-3xl font-extrabold">
          Total Users: {data?.totalUsers}
        </h2>
      </div>

      <div className="my-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <table className="table table-xs  table-pin-rows table-pin-cols">
        <thead className=" text-lg font-bold text-black">
          <tr className="bg-red-500 p-10 m-10">
            <th>Photo</th>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.users?.map((user) => (
            <tr key={user._id} className="shadow hover:bg-slate-100">
              <td>
                <img
                  src={user.photoURL}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td className="">{user.email}</td>
              <td>{user.displayName}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <div className="dropdown">
                  <div className="flex gap-5">
                    <button className="btn btn-sm bg-red-600">
                      <HiDotsVertical></HiDotsVertical>
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="btn btn-sm"
                    >
                      <FaTrashAlt className="text-red-600"></FaTrashAlt>
                    </button>
                  </div>
                  <div className="menu -ml-36 dropdown-content bg-green-300 rounded-box z-[1] w-36 p-2 shadow">
                    {user.status === "active" && (
                      <button
                        className="block  py-2 text-red-500"
                        onClick={() => {
                          console.log("Blocking user:", user._id);
                          blockUser(user._id);
                        }}
                      >
                        Block
                      </button>
                    )}
                    {user.status === "blocked" && (
                      <button
                        className="block  py-2 text-green-500"
                        onClick={() => {
                          console.log("Unblocking user:", user._id);
                          unblockUser(user._id);
                        }}
                      >
                        Unblock
                      </button>
                    )}
                    {user.role !== "volunteer" && (
                      <button
                        className="block  py-2 text-blue-500"
                        onClick={() => {
                          console.log("Making user volunteer:", user._id);
                          makeVolunteer(user._id);
                        }}
                      >
                        Volunteer
                      </button>
                    )}
                    {user.role !== "admin" && (
                      <button
                        className="block  py-2 text-yellow-500"
                        onClick={() => {
                          console.log("Making user admin:", user._id);
                          makeAdmin(user._id);
                        }}
                      >
                        Admin
                      </button>
                    )}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="my-4">
        <ReactPaginate
          pageCount={data?.totalPages || 1}
          onPageChange={handlePageClick}
          containerClassName="flex justify-center space-x-2"
          pageClassName="px-4 py-2 border rounded cursor-pointer"
          activeClassName="bg-blue-500 text-white"
          disabledClassName="text-gray-400 cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default AllUser;
