import { Fragment } from "react";

interface IData {
  title: string;
  image: string | null;
  company: string;
}

export default function Home({ error, jobs }: any) {
  console.log("all jobs", jobs);
  return (
    <Fragment>
      <div></div>
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
