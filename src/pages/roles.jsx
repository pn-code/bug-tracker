import UserRoleCard from "../components/UserRoleCard";
import serverAPI from "@/api/axios";
import { useEffect, useState } from "react";

const Role = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await serverAPI.get("/api/v1/users");
      if (res.status === 201) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-gray-100 h-[90vh] w-full flex px-4 pt-5 gap-10 lg:justify-between lg:gap-20 flex-col lg:flex-row">
      <form className="lg:w-[50%] flex flex-col gap-4">
        <h1 className="text-xl font-bold">Manage User Roles</h1>
        <label htmlFor="user">User: </label>
        <select name="user" id="user">
          {users.map((user) => (
            <option value={user.id}>{user.name}</option>
          ))}
        </select>
        <label htmlFor="role">Role: </label>
        <select name="role" id="role">
          <option value="user">User</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
        <button className="text-white bg-blue-400 hover:bg-blue-500 py-2 rounded-md">
          Submit
        </button>
      </form>
      <div className="w-full">
        <h1 className="text-xl font-bold">All Users</h1>
        <table className="w-full">
          <tr className="text-left">
            <th>User Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
          {users.map((user) => (
            <UserRoleCard user={user} key={user.id} />
          ))}
        </table>
      </div>
    </div>
  );
};

export default Role;
