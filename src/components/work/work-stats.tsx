const stats: Array<{
  value: string;
  title: string;
}> = [
  {
    value: "3+",
    title: "Year of Experience",
  },
  {
    value: "15+",
    title: "Industries Served",
  },
  {
    value: "50+",
    title: "Projects delivered",
  },
  {
    value: "12",
    title: "Active clients",
  },
];

const WorkStats = () => {
  return (
    <section className="mt-16 px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 items-start md:items-center justify-center gap-8 sm:gap-16 /md:gap-[178px] /max-w-7xl mx-auto">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col justify-around h-full items-center gap-3 text-center flex-1 min-w-[130px]"
          >
            <h4 className="font-medium text-3xl sm:text-4xl md:text-5xl leading-tight text-[#FAFAFA]">
              {stat.value}
            </h4>
            <p className="text-base sm:text-lg md:text-xl leading-snug text-[#CFCFCF]">
              {stat.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkStats;
