import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialLight,
  oneDark,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useGlobalContext } from "@/context";
import { isDarkMode, truncateString } from "@/lib/utils";

interface CodeBlockProps {
  language: string;
  code: string;
}

function CodeBlock({ language, code }: CodeBlockProps) {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();

  const isDarkModeEnabled = isDarkMode(darkMode);

  return (
    <div
      className={`grow text-xs rounded-md overflow-hidden tet-sm ${
        isDarkModeEnabled ? "bg-[#282C34]" : "bg-zinc-50"
      }`}
    >
      <SyntaxHighlighter
        language={"javascript"}
        style={isDarkModeEnabled ? oneDark : materialLight}
      >
        {truncateString(code, 300)}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeBlock;
