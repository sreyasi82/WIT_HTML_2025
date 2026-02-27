import "./Help.css"
const Help = () => {
  return (
    <div className="container" id="help_container">
      <article>
        <h5> Task Management Overview </h5>
        <span>
            The Todo application lets you create, update, track, and organize tasks with clear status, priority, and user assignment.
        </span>
        <h5>Adding a Task</h5>
        <span>
            <ul>
                <li>Enter a description.</li>
                <li>Select a status: Scheduled, In Progress, or Completed.</li>
                <li>Choose a priority: High, Medium, or Low.</li>
                <li>Assign a targate date.</li>
                <li>Assign the task to a user.</li>
                <li>Save to add it to the task list</li>
            </ul>
        </span>
        <h5>Editing a Task</h5>
        <span>You can update any task’s description, status, priority, targate date or assigned user at any time.</span>
        <h5>Deleting a Task</h5>
        <span>Select a task and choose the delete option. Deleted tasks are removed permanently.</span>
        <h5>Viewing or Updating by Task ID</h5>
        <span>Enter a task’s unique ID to quickly view or modify its details.</span>
        <h5>Viewing All Tasks</h5> 
        <span>Access the full list of tasks to review statuses, priorities, and assignments in one place.
        </span>
      </article>
    </div>
  );
};

export default Help;