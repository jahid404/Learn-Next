import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchReciters } from "@/features/al-quran/actions";
import { Reciter } from "@/features/al-quran/types";
import Link from "next/link";

export default async function QuranPage() {
    const reciters = await fetchReciters();

    return (
        <div className="flex flex-col gap-6 max-w-lg w-full mx-auto">
            <Card>
                <CardHeader>
                    <div className="flex justify-center items-center">
                        <div>
                            <CardTitle className="text-center">
                                Al-Quran Player
                            </CardTitle>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                                Audio Player with Surah, Verse and Reciters
                            </p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Reciters */}
                    <div className="max-h-[500px] overflow-y-auto">
                        <div className="flex flex-col flex-wrap w-full">
                            {reciters.map((reciter: Reciter, index: number) => (
                                <Link
                                    key={reciter.id}
                                    href={`/al-quran/${reciter.id}`}
                                    className="flex justify-between w-full border-b border-gray-700 px-2 py-4 hover:bg-gray-50/25"
                                >
                                    <div className="flex gap-x-2">
                                        <span>{index + 1}</span>
                                        <p>{reciter.name}</p>
                                    </div>

                                    <div className="flex gap-x-2">
                                        <p>Surah</p>
                                        <p className="font-bold">
                                            {reciter.surah}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
