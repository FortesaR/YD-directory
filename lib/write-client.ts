import "server-only";

import { createClient } from "next-sanity";
import { dataset, projectId ,apiVersion,token} from "@/sanity/env";
// import { apiVersion, dataset, projectId, token } from "../";

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

if (!writeClient.config().token) {
  throw new Error("Write token not found.");
}