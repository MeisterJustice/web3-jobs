import Image from "next/image";
import { Fragment, useState } from "react";

interface IData {
  title: string;
  image: string;
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

  return (
    <Fragment>
      <div className="h-70vh lg:h-60vh w-full bg-slate-900 flex flex-col justify-center items-center">
        <h1 className="text-white text-4xl md:text-7xl font-bold">Web3 Jobs</h1>
        <p className="text-slate-300 mt-5 text-xl">
          Find great Web3 jobs at startups that use blockchain technology.
        </p>
      </div>

      <section className="pt-20 container mx-auto">
        <h5 className="text-3xl font-semibold">Search jobs</h5>
        <form>
          <input
            type="search"
            placeholder="Search job title"
            className="mt-3 h-20 border border-gray-300 px-5 w-full lg:w-60% rounded focus-visible:border-none"
          />
        </form>
      </section>

      <section className="mt-16 pb-16 container mx-auto">
        <div className=" bg-slate-100">
          <div className=" bg-black px-16 py-10 text-slate-300">
            <div className="text-3xl font-semibold">We are HireChain</div>
            <div className="mt-3 text-lg">
              The missing link between companies and talent in web3
            </div>
          </div>

          {data.map((item, i) => (
            <div key={i}>
              {item.title && (
                <div className="flex gap-5 px-16 border-b py-10">
                  <div className="h-14 w-14 rounded-full bg-blue-200 flex justify-center items-center">
                    <div className="text-xl text-slate-900">L</div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-semibold">{item.title}</h2>
                    <h3 className="text-2xl mt-1">{item.company}</h3>
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
