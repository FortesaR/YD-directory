import { auth } from "@/auth";
import SearchForm from "../../components/SearchForm";
import StartupCard , {StartupTypeCard}from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = {search: query || null};
  //  const posts = await client.fetch(STARTUPS_QUERY);
 const {data: posts} = await sanityFetch({query:STARTUPS_QUERY,params});
  // const posts =[{
  //   _createdAt: new Date(),
  //   views:55,
  //   author:{_id:1 ,name:"John Doe"},
  //   _id:1,
  //   description:"This is a sample description for the startup pitch.",
  //   image:'https://images.unsplash.com/photo-1689473483831-dc1228b13992?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   category:"Animals",
  //   title:"We love Animals",
  // }];
  return (
    <>

    <section className="pink_container">
      <h1 className="heading">Pitch Your Startup,<br /> Connect With Entrepreneurs </h1>
      <p className="sub-heading !max-w-3xl">Submit Ideas, Vote on Pitches ,and get Noticed in Virtual Competition</p>
      <SearchForm query="query"/>
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "Search for Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post:StartupTypeCard, index:number) => (
              <StartupCard key={post?._id} post={post}  />
            ))
          ) : (
            <p className="no-results"> No results found</p>
          )}
        </ul>
      </section>
      <SanityLive/>
    </>
  );
}