import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import serverAPI from "@/api/axios";
import { useUser } from "@/contexts/UserContext";

const NewIssue = () => {
  const [loading, setLoading] = useState(false);
  const [issue, setIssue] = useState({
    relatedProject: "",
    title: "",
    description: "",
    targetResolutionDate: "",
    assignedTo: "",
    status: "",
    priority: "",
  });
  const [formError, setFormError] = useState("");

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const user = useUser().user;
  const router = useRouter();

  const fetchProjects = async () => {
    const res = await serverAPI.get("/api/v1/projects");
    setProjects(res.data.projects);
  };

  const fetchUsers = async () => {
    const res = await serverAPI.get("/api/v1/users");
    setUsers(res.data.users);
  };

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  const validateInputs =
    issue.relatedProject.trim().length > 0 &&
    issue.title.trim().length > 0 &&
    issue.description.trim().length > 0 &&
    issue.targetResolutionDate.trim().length > 0 &&
    issue.assignedTo.trim().length > 0 &&
    issue.status.trim().length > 0 &&
    issue.priority.trim().length > 0;

  const submitIssue = async (e) => {
    e.preventDefault();
    if (!loading && validateInputs) {
      try {
        setLoading(true);
        await serverAPI.post("/api/v1/issues", {
          ...issue,
          createdBy: user.id,
          relatedProject: Number(issue.relatedProject),
          assignedTo: Number(issue.assignedTo),
        });
        router.push("/issues");
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      setFormError("You must fill out all fields to submit issue.");
    }
  };

  const handleInputChange = (e) => {
    setIssue((prevIssue) => ({
      ...prevIssue,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="h-[100vh] w-full text-text">
      <form
        onSubmit={(e) => submitIssue(e)}
        className="px-4 pt-5 flex flex-col gap-4"
      >
        <header className="flex justify-center items-center gap-24">
          <h1 className="text-2xl font-bold">New Issue</h1>
          <div className="text-[16px] font-semibold">
            <Link
              href="/issues"
              className="bg-secondary hover:bg-secondary/80 px-4 py-2 text-background rounded-md"
            >
              Return
            </Link>
          </div>
        </header>

        <fieldset className="flex flex-col gap-4 items-center">
          <span className="text-sm text-red-400">{formError}</span>
          <section className="flex flex-col gap-2">
            <label htmlFor="relatedProject">Related Project: </label>
            <select
              className="text-background px-2 rounded-md"
              onChange={(e) => handleInputChange(e)}
              value={issue.project}
              name="relatedProject"
              id="relatedProject"
            >
              <option default value="">
                SELECT A PROJECT
              </option>
              {projects.map((project) => (
                <option value={project.id} key={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </section>

          <section className="flex flex-col gap-2">
            <label htmlFor="title">Title: </label>
            <input
              onChange={(e) => handleInputChange(e)}
              name="title"
              value={issue.title}
              className="px-2 py-1 resize-none rounded-md text-background"
              id="title"
              type="text"
              placeholder="title"
            />
          </section>

          <section className="flex flex-col gap-2">
            <label htmlFor="description">Description: </label>
            <textarea
              onChange={(e) => handleInputChange(e)}
              name="description"
              value={issue.description}
              className="px-2 py-1 resize-none rounded-md text-background"
              id="description"
              type="text"
              placeholder="description"
              rows={10}
            ></textarea>
          </section>

          <section className="flex flex-col gap-2">
            <label htmlFor="targetResolutionDate">
              Target Resolution Date:{" "}
            </label>
            <input
              onChange={(e) => handleInputChange(e)}
              name="targetResolutionDate"
              value={issue.targetResolutionDate}
              className="px-2 py-1 rounded-md text-background"
              id="targetResolutionDate"
              type="date"
              placeholder="target resolution date"
            />
          </section>

          <section className="flex flex-col gap-2">
            <label htmlFor="assignedTo">Assigned to: </label>
            <select
              className="px-2 py-1 rounded-md text-background"
              onChange={(e) => handleInputChange(e)}
              name="assignedTo"
              id="assignedTo"
              value={issue.assignedTo}
            >
              <option default value="">
                SELECT ASSIGNED USER
              </option>

              {users.map((user) => (
                <option
                  value={user.id}
                  key={user.id}
                >{`${user.name} (${user.id})`}</option>
              ))}
            </select>
          </section>

          <section className="flex flex-col gap-2">
            <label htmlFor="status">Status:</label>
            <select
              onChange={(e) => handleInputChange(e)}
              name="status"
              value={issue.status}
              className="px-2 py-1 rounded-md text-background"
              id="status"
            >
              <option value={null}>SELECT STATUS</option>
              <option value="open">Open</option>
              <option value="in progress">In Progress</option>
              <option value="needs review">Needs Review</option>
              <option value="under review">Under Review</option>
              <option value="closed">Closed</option>
            </select>
          </section>

          <section className="flex flex-col gap-2">
            <label htmlFor="priority">Priority: </label>
            <select
              onChange={(e) => handleInputChange(e)}
              name="priority"
              value={issue.priority}
              className="px-2 py-1 rounded-md text-background"
              id="priority"
            >
              <option value={null}>SELECT PRIORITY</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </section>
          <button className="bg-primary text-white rounded-md py-2 my-4 w-[280px]">
            Submit Issue
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default NewIssue;
