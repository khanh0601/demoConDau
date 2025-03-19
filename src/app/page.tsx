"use client";

import { useState } from "react";
import SealGenerator from "./GenerateImage";

const typeOptions = [
  { id: "type1", label: "篆書体 (てんしょたい)", fontClass: "var(--font-inter)" },
  { id: "type2", label: "印相体 (いんそうたい)", fontClass: "var(--font-roboto)" },
  { id: "type3", label: "古印体 (こいんたい)", fontClass: "var(--font-lora)" },
  { id: "type4", label: "楷書体 (かいしょたい)", fontClass: "var(--font-open-sans)" },
  { id: "type5", label: "隷書体 (れいしょたい)", fontClass: "var(--font-poppins)" },
  { id: "type6", label: "行書体 (ぎょうしょたい)", fontClass: "var(--font-inter)" },
];

const rowOptions = [
  { id: "row1", label: "1行 (1~3文字)", count: 1 },
  { id: "row2", label: "2行 (2×2文字)", count: 2 },
  { id: "row3", label: "3行 (3×3文字)", count: 3 },
  { id: "row4", label: "4行 (4×4文字)", count: 4 },
  { id: "row5", label: "5行 (5×5文字)", count: 5 },
  { id: "row6", label: "6行 (6×6文字)", count: 6 },
];

export default function SealForm() {
  const [selectedType, setSelectedType] = useState<string>("type1");
  const [selectedRow, setSelectedRow] = useState<number>(1);
  const [inputs, setInputs] = useState<string[]>(Array(1).fill(""));

  const handleRowChange = (count: number) => {
    setSelectedRow(count);
    setInputs(Array(count).fill(""));
  };

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value || ``;
    setInputs(newInputs);
  };

  const selectedFont = typeOptions.find((type) => type.id === selectedType)?.fontClass || "text-inter";
  const sealText = inputs.join(" ");

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Seal Customization</h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">書体 (Font Style)</h2>
        <div className="grid grid-cols-3 gap-x-4 gap-y-10">
          {typeOptions.map((type) => (
            <label key={type.id} className="flex flex-col items-center gap-2 cursor-pointer">
              <div className="w-[8rem] h-[8rem]">
              <SealGenerator
          text={sealText}
          fontFamily="Inter"
          color={selectedType === type.id ? "#D32F2F" : "black"} // Dynamic color
        />
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value={type.id}
                  checked={selectedType === type.id}
                  onChange={() => setSelectedType(type.id)}
                />
                {type.label}
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">彫刻行数 (Number of Rows)</h2>
        <div className="flex flex-col gap-2">
          {rowOptions.map((row) => (
            <label key={row.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="row"
                value={row.id}
                checked={selectedRow === row.count}
                onChange={() => handleRowChange(row.count)}
              />
              {row.label}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">彫刻名 (Engraving Text)</h2>
        {inputs.map((input, index) => (
          <div key={index} className="mb-2">
            <label className="block mb-1">{`${index + 1}行目`}</label>
            <input
              type="text"
              value={input}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter text for line ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Submit
      </button>
    </div>
  );
}
