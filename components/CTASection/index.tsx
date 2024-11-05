export function CTASection() {
  return (
    <div className="flex flex-col mx-16 items-center mt-[120px] gap-6">
      <h2 className="font-bold max-sm:text-2xl text-3xl text-center">
        Organize Your Code Snippets
        <span className="text-theme px-1">with Grace!</span>
      </h2>
      <p className="text-center text-sm md:text-lg w-[450px] md:w-[600px] max-sm:w-full text-slate-500">
        With our advanced tagging and search features, you can quickly find the
        snippet you need, right when you need it. Spend less time in searching
        for code and more time in writing it.
      </p>

      <button
        className="block px-9 py-3 text-sm font-medium text-white transition duration-400 focus:outline-none"
        type="button"
      >
        Let's get started!
      </button>
    </div>
  );
}
