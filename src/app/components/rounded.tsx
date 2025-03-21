"use client";
import { useState } from "react";
import SealGeneratorRound from "../GenerateImageRound";
const typeOptions2 = [
  { id: "round1", label: "篆書体 (てんしょたい)", fontClass: "var(--font-inter)" },
  { id: "round2", label: "印相体 (いんそうたい)", fontClass: "var(--font-roboto)" },
  { id: "round3", label: "古印体 (こいんたい)", fontClass: "var(--font-lora)" },
  { id: "round4", label: "楷書体 (かいしょたい)", fontClass: "var(--font-open-sans)" },
  { id: "round5", label: "隷書体 (れいしょたい)", fontClass: "var(--font-poppins)" },
  { id: "round6", label: "行書体 (ぎょうしょたい)", fontClass: "var(--font-inter)" },
];
export default function Rounded() {
  const [selectedType2, setSelectedType2] = useState<string>("round1");
  const [inputInner, setInputInner] = useState<string>("");
  const [inputWrap, setInputWrap] = useState<string>("");
  return (
    <div className="max-w-4xl mb-16 mt-16 mx-auto p-6 bg-gray-200 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Seal Customization</h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">書体 (Font Style)</h2>
        <div className="grid grid-cols-3 gap-x-4 gap-y-10">
          {typeOptions2.map((type) => (
            <label key={type.id} className="flex flex-col items-center gap-2 cursor-pointer">
              <div className="w-[8rem] h-[8rem]">
                <SealGeneratorRound
                  textInner={inputInner}
                  textWrap={inputWrap}
                  fontFamily="hot-tenshokk"
                  color={selectedType2 === type.id ? "#D32F2F" : "black"} // Dynamic color
                />
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="typeRounded"
                  value={type.id}
                  checked={selectedType2 === type.id}
                  onChange={() => setSelectedType2(type.id)}
                />
                {type.label}
              </div>
            </label>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">彫刻名 (Engraving Text)</h2>
        <div className="mb-2">
          <label className="block mb-1">彫刻名(回文)</label>
          <input
            type="text"
            value={inputWrap}
            onChange={(e) => setInputWrap(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">彫刻名(中文)</label>
          <input
            value={inputInner}
            onChange={(e) => setInputInner(e.target.value)}
            type="text"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  )
}