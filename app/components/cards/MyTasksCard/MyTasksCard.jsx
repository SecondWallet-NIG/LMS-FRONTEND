const MyTasksCard = ({ header, data }) => {
  return (
    <main
      className={`w-full text-center rounded-xl p-2 lg:p-4 ${
        header === "all tasks"
          ? "bg-swBlue text-white"
          : header === "completed tasks"
          ? "bg-swYellow"
          : "bg-gray-200"
      }`}
    >
      <p className="capitalize">{header}</p>

      <p className="mt-5 text-3xl font-semibold">{data}</p>
    </main>
  );
};

export default MyTasksCard;
