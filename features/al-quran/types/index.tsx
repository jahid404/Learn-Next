export interface Reciter {
    id: number;
    name: string;
    surah: number;
    server: string;
    surah_list: string;
}

export interface RawReciter {
    id: string;
    name: string;
    letter: string;
    moshaf: Moshaf[];
}

export interface Moshaf {
    id: number;
    name: string;
    rewaya_id: number;
    server: string;
    surah_total: number;
    moshaf_type: number;
    surah_list: string;
}

export interface Surah {
    id: number;
    name: string;
    makkia: boolean;
}
