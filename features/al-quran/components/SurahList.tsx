import React from "react";
import { Surah } from "../types";

interface SurahListProps {
    surahs: Surah[];
    activeSurahId?: number;
    onSelectSurah?: (surah: Surah) => void;
}

export default function SurahList({ 
    surahs, 
    activeSurahId, 
    onSelectSurah 
}: SurahListProps) {
    return (
        <div>
            <h2 className="text-2xl font-semibold px-2">Surah List</h2>
            <hr className="my-4 border-zinc-200 dark:border-zinc-800" />

            <div className="flex flex-col max-h-[600px] overflow-y-auto pr-2">
                {surahs.map((surah) => {
                    const isActive = surah.id === activeSurahId;
                    
                    return (
                        <div
                            key={surah.id}
                            onClick={() => onSelectSurah?.(surah)}
                            className={`flex justify-between w-full border-b border-zinc-100 dark:border-zinc-800 px-3 py-4 transition-all duration-200 cursor-pointer rounded-lg group mb-1 ${
                                isActive 
                                    ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800" 
                                    : "hover:bg-zinc-50 dark:hover:bg-zinc-900"
                            }`}
                        >
                            <div className="flex gap-x-3 items-center">
                                <span className={`font-medium text-sm w-6 ${
                                    isActive ? "text-emerald-600 font-bold" : "text-zinc-400"
                                }`}>
                                    {surah.id}
                                </span>
                                <p className={`font-semibold transition-colors ${
                                    isActive ? "text-emerald-700 dark:text-emerald-400" : "text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600"
                                }`}>
                                    {surah.name}
                                </p>
                            </div>

                            <div className="flex items-center text-xs">
                                <span className={`px-2 py-1 rounded-md font-medium transition-colors ${
                                    isActive
                                        ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                                }`}>
                                    {Number(surah.makkia) === 1 ? "Makkiah" : "Madinah"}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
