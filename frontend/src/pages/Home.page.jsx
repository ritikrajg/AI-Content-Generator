import { Link } from "react-router-dom";
import ai from "../assests/ai.jpg";

const Home = () => {
  return (
    <>
      <div className="bg-gray-900">
        <div className="relative isolate overflow-hidden">
          <img
            src={ai}
            alt=" ai"
            className="absolute inset-0 -z-10 h-screen w-screen object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gray-900 bg-opacity-70"></div>
          <div className="mx-auto max-w-2xl h-screen w-screen flex justify-center items-center">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                AI Content Generator
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Our platform harnesses the power of Gemini AI to revolutionize
                the way you generate content. Whether you're seeking
                inspiration, looking for answers, or simply exploring new ideas,
                Content Genie Hub is here to assist you.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="/login"
                  className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-semibold leading-6 text-white"
                >
                  Register <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
