// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient, PostgrestError } from "@supabase/supabase-js";
import { IData } from "..";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let jobs: IData[] | null = [];
  let err: PostgrestError | null;

  if (req.query.title) {
    // if user inputs a search query
    const { data, error } = await supabase
      .from("jobs")
      .select("title, company")
      .ilike("title", `%${req.query.title}%`)
      .order("created_at", { ascending: false });
    jobs = data;
    err = error;
  } else {
    const { data, error } = await supabase
      .from("jobs")
      .select("title, company")
      .order("created_at", { ascending: false });
    jobs = data;
    err = error;
  }

  if (err) {
    res.status(500).json({ error: err.message });
  } else {
    res.status(200).json(jobs);
  }
}
