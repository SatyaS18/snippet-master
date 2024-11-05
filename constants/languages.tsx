import { SingleLanguageType } from "@/interfaces/context";
import {
  SiCsharp,
  SiGo,
  SiJavascript,
  SiKotlin,
  SiPhp,
  SiPython,
  SiRuby,
  SiRust,
  SiSwift,
  SiTypescript,
  SiHaskell,
  SiPerl,
  SiElixir,
  SiR,
  SiC,
  SiCplusplus,
  SiShell,
  SiNodedotjs,
} from "react-icons/si";

export const AVAILABLE_LANGUAGES: Array<SingleLanguageType> = [
  {
    id: "1",
    name: "Javascript",
    icon: <SiJavascript size={15} className="text-slate-400" />,
  },
  {
    id: "2",
    name: "Python",
    icon: <SiPython size={15} className="text-slate-400" />,
  },
  {
    id: "3",
    name: "C#",
    icon: <SiCsharp size={15} className="text-slate-400" />,
  },
  {
    id: "4",
    name: "Ruby",
    icon: <SiRuby size={15} className="text-slate-400" />,
  },
  {
    id: "5",
    name: "PHP",
    icon: <SiPhp size={15} className="text-slate-400" />,
  },
  {
    id: "6",
    name: "Swift",
    icon: <SiSwift size={15} className="text-slate-400" />,
  },
  {
    id: "7",
    name: "Go",
    icon: <SiGo size={15} className="text-slate-400" />,
  },
  {
    id: "8",
    name: "Kotlin",
    icon: <SiKotlin size={15} className="text-slate-400" />,
  },
  {
    id: "9",
    name: "Rust",
    icon: <SiRust size={15} className="text-slate-400" />,
  },
  {
    id: "10",
    name: "Typescript",
    icon: <SiTypescript size={15} className="text-slate-400" />,
  },
  {
    id: "11",
    name: "Haskell",
    icon: <SiHaskell size={15} className="text-slate-400" />,
  },
  {
    id: "12",
    name: "Perl",
    icon: <SiPerl size={15} className="text-slate-400" />,
  },
  {
    id: "13",
    name: "Shell",
    icon: <SiShell size={15} className="text-slate-400" />,
  },
  {
    id: "14",
    name: "C",
    icon: <SiC size={15} className="text-slate-400" />,
  },
  {
    id: "15",
    name: "C++",
    icon: <SiCplusplus size={15} className="text-slate-400" />,
  },
  {
    id: "16",
    name: "R",
    icon: <SiR size={15} className="text-slate-400" />,
  },
  {
    id: "17",
    name: "Elixir",
    icon: <SiElixir size={15} className="text-slate-400" />,
  },
  {
    id: "18",
    name: "Node",
    icon: <SiNodedotjs size={15} className="text-slate-400" />,
  },
];
