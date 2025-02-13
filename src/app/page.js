import Link from "next/link";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-purple-900 flex items-center justify-center text-white h-[80vh] text-center py-20 px-5">
        <div>
          <h1 className="text-4xl font-bold">
            Share Your Thoughts with the World
          </h1>
          <p className="mt-3 text-lg">
            Create and publish your own blog in minutes.
          </p>
          <Link href="/create-blog">
            <button className="mt-5 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200">
              Create a Blog
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
