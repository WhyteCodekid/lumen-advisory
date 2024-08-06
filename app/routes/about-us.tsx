import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import PublicLayout from "~/components/layouts/public";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <PublicLayout>
        <div className="flex justify-center items-center flex-col">
          <h1 className="font-bold text-3xl text-blue-600">Welcome to Remix</h1>
          <ul>
            <li>
              <a
                target="_blank"
                href="https://remix.run/tutorials/blog"
                rel="noreferrer"
              >
                15m Quickstart Blog Tutorial
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://remix.run/tutorials/jokes"
                rel="noreferrer"
              >
                Deep Dive Jokes App Tutorial
              </a>
            </li>
            <li>
              <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
                Remix Docs
              </a>
            </li>
          </ul>
        </div>

        <div className="h-screen"></div>
      </PublicLayout>
    </>
  );
}

export const loader: LoaderFunction = async () => {
  const baseAPI = process.env.BACKEND_API_BASE_URL;

  return {
    baseAPI,
  };
};
