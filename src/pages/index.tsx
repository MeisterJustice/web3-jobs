import Image from "next/image";
import { Fragment, useState } from "react";

export interface IData {
  title: string;
  company: string;
}

export default function Home({
  error,
  jobs = [],
}: {
  jobs: IData[];
  error: string;
}) {
  const [data, setData] = useState(jobs);
  const [search, setSearch] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:3000/api/jobs?title=${search}`
    );
    const data = await response.json();
    setData(data);
  };

  const handleChange = async (value: string) => {
    if (value) {
      setSearch(value);
    } else {
      setSearch(value);
      const response = await fetch(`http://localhost:3000/api/jobs`);
      const data = await response.json();
      setData(data);
    }
  };

  if (error) {
    return (
      <div className="h-70vh lg:h-60vh w-full bg-slate-900 flex flex-col justify-center items-center">
        <h1 className="text-white text-4xl md:text-7xl font-bold">
          An Error Occured
        </h1>
        <p className="text-slate-300 mt-5 text-xl">Please try again later!</p>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="h-70vh lg:h-60vh w-full bg-slate-900 flex flex-col justify-center items-center">
        <h1 className="text-white text-4xl md:text-7xl font-bold">Web3 Jobs</h1>
        <p className="text-slate-300 text-center mt-5 text-xl">
          Find great Web3 jobs at startups that use blockchain technology.
        </p>
      </div>

      <section className="pt-20 container px-5 lg:px-0 lg:mx-auto">
        <h5 className="text-3xl font-semibold">Search jobs</h5>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Search job title"
            value={search}
            onChange={(e) => handleChange(e.target.value)}
            className="mt-3 h-20 border placeholder:text-2xl text-2xl font-medium text-slate-800 border-gray-300 px-5 w-full lg:w-60% rounded focus-visible:border-none"
          />
        </form>
      </section>

      <section className="mt-16 pb-16 container px-5 lg:px-0 lg:mx-auto">
        <div className=" bg-slate-100">
          <div className=" bg-black px-5 lg:px-16 py-10 text-slate-300">
            <div className="text-3xl font-semibold">We are HireChain</div>
            <div className="mt-3 text-lg">
              The missing link between companies and talent in web3
            </div>
          </div>

          {data.map((item, i) => (
            <div key={i}>
              {item.title && (
                <div className="flex gap-5 px-5 lg:px-16 border-b py-10">
                  <div>
                    <div className="h-10 w-10 lg:h-14 lg:w-14 rounded-full bg-blue-200 flex justify-center items-center">
                      <div className="lg:text-xl text-base text-slate-900">
                        {item.company.slice(0, 2)}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl lg:text-3xl font-semibold">
                      {item.title}
                    </h2>
                    <h3 className="lg:text-2xl text-lg mt-1">{item.company}</h3>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </Fragment>
  );
}

// Use getServerSideProps to fetch data before page render
export async function getServerSideProps() {
  let jobs: IData[] = [];
  let error = "";

  try {
    const response = await fetch("http://localhost:3000/api/jobs");
    const data = await response.json();
    jobs = data;
  } catch (err: any) {
    console.log("error", err);
    error = "An error occurred";
  }

  return {
    props: {
      error,
      jobs,
    },
  };
}
