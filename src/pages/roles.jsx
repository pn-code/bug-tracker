import React from "react";
import UserRoleCard from "../components/UserRoleCard";

const Role = () => {
  return (
    <div className="bg-gray-100 h-[90vh] w-full flex px-4 pt-5 justify-between gap-20">
      <form className="w-[50%] flex flex-col gap-4">
        <h1 className="text-xl font-bold">Manage User Roles</h1>
        <label htmlFor="">User: </label>
        <select name="" id="">
          <option value="">User</option>
        </select>
        <label htmlFor="">Role: </label>
        <select name="" id="">
          <option value="">Role</option>
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
          <UserRoleCard />
        </table>
      </div>
    </div>
  );
};

export default Role;
