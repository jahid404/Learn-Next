"use client";

import React, { useState } from "react";
import { Reciter, Surah } from "../types";
import SurahPlayer from "./SurahPlayer";
import SurahList from "./SurahList";

interface Props {
    reciter: Reciter;
    filteredSurahs: Surah[];
}

export default function QuranPlayerView({ reciter, filteredSurahs }: Props) {
    const [selectedSurah, setSelectedSurah] = useState<Surah | null>(
        filteredSurahs[0] || null,
    );

    return (
        <div className="grid grid-cols-12 gap-8">
            {/* player section (Left Column) */}
            <div className="col-span-12 md:col-span-7 lg:col-span-8 flex flex-col justify-center">
                <SurahPlayer selectedSurah={selectedSurah} reciter={reciter} />
            </div>

            {/* list section (Right Column) */}
            <div className="col-span-12 md:col-span-5 lg:col-span-4">
                <SurahList
                    surahs={filteredSurahs}
                    activeSurahId={selectedSurah?.id}
                    onSelectSurah={setSelectedSurah}
                />
            </div>
        </div>
    );
}
