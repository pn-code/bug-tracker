import React from "react";

const Role = () => {
    return (
        <div className="flex justify-between">
            <form>
                <h1>Manage User Roles</h1>
                <label htmlFor="">User: </label>
                <select name="" id="">
                    <option value="">User</option>
                </select>
                <label htmlFor="">Role: </label>
                <select name="" id="">
                    <option value="">Role</option>
                </select>
            </form>
            <div>
                <h1>All Users</h1>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </table>
            </div>
        </div>
    );
};

export default Role;
