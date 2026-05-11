import { Card, CardContent } from "@/components/ui/card";
import { fetchSurah, fetchReciters } from "@/features/al-quran/actions";
import { notFound } from "next/navigation";
import QuranPlayerView from "@/features/al-quran/components/QuranPlayerView";

type Props = {
    params: Promise<{ reciter_id: string }>;
};

export default async function SurahPage({ params }: Props) {
    // 1. Resolve params and fetch necessary data
    const { reciter_id } = await params;
    
    const [reciters, allSurahs] = await Promise.all([
        fetchReciters(),
        fetchSurah(),
    ]);

    // 2. Find specific reciter
    const reciter = reciters.find((r) => r.id === Number(reciter_id));

    if (!reciter) {
        notFound();
    }

    // 3. Filter the master surah list
    const allowedIds = reciter.surah_list.split(",");
    const filteredSurahs = allSurahs.filter((surah) =>
        allowedIds.includes(surah.id.toString())
    );

    return (
        <Card className="max-w-6xl mx-auto">
            <CardContent className="p-6">
                {/* Pass off handling to Client View for state/interactions */}
                <QuranPlayerView 
                    reciter={reciter} 
                    filteredSurahs={filteredSurahs} 
                />
            </CardContent>
        </Card>
    );
}
