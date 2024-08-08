const TasksCard = ({ taskName, taskAmount }) => {
  return (
    <main className="w-full rounded-xl p-3 border-2 border-swDarkBlue bg-white text-swBlue">
      <p>{taskName}</p>
      <p className="mt-3 text-3xl font-medium">{taskAmount}</p>
    </main>
  );
};

export default TasksCard;
