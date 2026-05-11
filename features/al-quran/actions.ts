"use server";

import { RawReciter, Reciter, Surah } from "./types";

export async function fetchReciters(): Promise<Reciter[]> {
    const res = await fetch(
        "https://www.mp3quran.net/api/v3/reciters?language=eng",
    );

    const { reciters } = await res.json();

    return reciters.map((reciter: RawReciter) => ({
        id: reciter.id,
        name: reciter.name,
        surah: reciter.moshaf[0].surah_total,
        server: reciter.moshaf[0].server,
        surah_list: reciter.moshaf[0].surah_list,
    }));
}

export async function fetchSurah(): Promise<Surah[]> {
    const res = await fetch(
        "https://www.mp3quran.net/api/v3/suwar?language=eng",
    );
    const { suwar } = await res.json();
    return suwar;
}
