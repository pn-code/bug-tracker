import React from "react";

const UserRoleCard = ({ user }) => {
  return (
    <tr className="bg-gray-200">
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
    </tr>
  );
};

export default UserRoleCard;
