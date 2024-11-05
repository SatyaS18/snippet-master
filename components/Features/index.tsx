function Features() {
  return (
    <div className="flex flex-col jusitfy-center md:items-center gap-2 mx-4">
      <p className="text-lg font-bold text-center md:text-2xl md:mb-4">
        Why choose Snippet Master ?
      </p>
      <ul className="mx-4 list list-disc">
        <li className="font-semibold text-lg md:text-xl md:leading-9 text-gray-800">
          Auto-Save Snippets
        </li>
        <li className="font-semibold text-lg md:text-xl md:leading-9 text-gray-800">
          Advanced Snippet Tagging
        </li>
        <li className="font-semibold text-lg md:text-xl md:leading-9 text-gray-800">
          Manage All Snippets at one place
        </li>
        <li className="font-semibold text-lg md:text-xl md:leading-9 text-gray-800">
          Multi-Language Support
        </li>
        <li className="font-semibold text-lg md:text-xl md:leading-9 text-gray-800">
          AI Enabled Code Completion
        </li>
      </ul>
    </div>
  );
}

export default Features;
