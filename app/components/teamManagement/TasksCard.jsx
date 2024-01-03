const TasksCard = ({ taskName, taskAmount }) => {
  return (
    <main className="w-full rounded-xl p-5 border-2 border-swDarkBlue bg-swDarkBlueOutline">
      <p>{taskName}</p>
      <p className="mt-5 text-3xl font-medium">{taskAmount}</p>
    </main>
  );
};

export default TasksCard;
