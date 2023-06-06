import UserRoleCard from "../components/UserRoleCard";
import serverAPI from "@/api/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/contexts/UserContext";

const Role = () => {
  const user = useUser().user;
  const router = useRouter();

  useEffect(() => {
    if (user?.role != "admin") {
      router.push("/");
    }
  }, [router, user?.role]);

  const [users, setUsers] = useState([]);

  const [managedUser, setManagedUser] = useState({
    id: "",
    role: "",
  });

  const updateUserRole = async (e) => {
    e.preventDefault();
    try {
      const res = await serverAPI.put(`/api/v1/users/${managedUser.id}`, {
        role: managedUser.role,
      });

      if (res.status === 200) {
        const updatedUsers = users.map(user => user.id === res.data.user.id ? res.data.user : user)
        setUsers(updatedUsers)
      } else {
        console.log("An error has occurred!")
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setManagedUser((prevManagedUser) => ({
      ...prevManagedUser,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
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

    fetchUsers();
  }, []);

  return (
    <div className="h-[90vh] text-text w-full flex px-4 pt-5 gap-10 lg:justify-between lg:gap-20 flex-col lg:flex-row">
      <h1 className="text-2xl font-bold">Manage User Roles</h1>
      <form
        onSubmit={(e) => updateUserRole(e)}
        className="lg:w-[50%] flex flex-col gap-4"
      >
        <label htmlFor="id">User: </label>
        <select onChange={(e) => handleInputChange(e)} name="id" id="id">
          <option value="">SELECT A USER</option>
          {users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <label htmlFor="role">Role: </label>
        <select
          onChange={(e) => handleInputChange(e)}
          name="role"
          id="role"
          value={managedUser.role}
        >
          <option value="" default>
            SELECT A ROLE
          </option>
          <option value="user">User</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
        <button className="text-white bg-primary hover:bg-primary/80 py-2 rounded-md w-[280px] mt-2">
          Submit
        </button>
      </form>
      <div className="w-full">
        <h1 className="text-xl font-bold">All Users</h1>
        <table className="w-full">
          <tr className="text-left bg-primary">
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
