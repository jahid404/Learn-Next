"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { Reciter, Surah } from "../types";

interface Props {
    selectedSurah: Surah | null;
    reciter: Reciter;
}

export default function SurahPlayer({ selectedSurah, reciter }: Props) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // Construct safe MP3 path with required zero-padding (e.g. "001.mp3")
    const getSurahAudioUrl = () => {
        if (!selectedSurah) return "";
        const paddedId = String(selectedSurah.id).padStart(3, "0");
        // Ensure standard concatenation without duplicated slashes
        const base = reciter.server.endsWith("/")
            ? reciter.server
            : `${reciter.server}/`;
        return `${base}${paddedId}.mp3`;
    };

    const audioUrl = getSurahAudioUrl();

    // Automatically load and attempt playback when track switches
    useEffect(() => {
        if (audioRef.current && audioUrl) {
            audioRef.current.load();
            audioRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => {
                    // Handling potential blocking of auto-play policies by browsers safely
                    setIsPlaying(false);
                });
        }
    }, [audioUrl]);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    // Utility to turn "67.23" seconds into "1:07" format
    const formatDuration = (secs: number) => {
        if (!secs || isNaN(secs)) return "0:00";
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    // Progress percent handler
    const progressPercent = duration ? (currentTime / duration) * 100 : 0;

    // Clicking the track to skip time
    const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!audioRef.current || !duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickPos = (e.clientX - rect.left) / rect.width;
        audioRef.current.currentTime = clickPos * duration;
    };

    if (!selectedSurah) {
        return (
            <div className="flex items-center justify-center h-[400px] text-zinc-500 italic">
                Select a surah to begin playing
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center border-r border-zinc-100 dark:border-zinc-800 pr-0 md:pr-10 py-8 h-full">
            {/* Hidden Audio Backbone */}
            <audio
                ref={audioRef}
                src={audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                onError={() => setIsPlaying(false)}
            />

            {/* Decorative Album Art */}
            <div className="relative w-64 h-64 mb-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-linear-to-tr from-emerald-600 via-teal-700 to-cyan-900 rounded-[2.5rem] shadow-2xl shadow-emerald-500/10 rotate-3"></div>
                <div className="absolute inset-0 bg-linear-to-tr from-teal-700 to-emerald-800 rounded-[2.5rem] shadow-xl flex items-center justify-center overflow-hidden transition-transform hover:scale-[1.02] duration-300">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10"></div>
                    <div className="absolute inset-3 border-2 border-white/10 rounded-4xl"></div>
                    <span className="relative text-6xl font-black text-white drop-shadow-lg">
                        {selectedSurah.id}
                    </span>
                </div>
            </div>

            {/* Title & Info */}
            <div className="text-center space-y-2 mb-10 px-4">
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
                    {selectedSurah.name}
                </h2>
                <p className="text-emerald-600 dark:text-emerald-400 font-semibold tracking-wide text-sm uppercase">
                    {Number(selectedSurah.makkia) === 1 ? "Makkiah" : "Madinah"}{" "}
                    Revelations
                </p>
                <div className="pt-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs font-medium">
                        Recited by {reciter.name}
                    </span>
                </div>
            </div>

            {/* Custom Interactive Progress Bar */}
            <div className="w-full max-w-sm space-y-3 mb-10 px-4">
                <div
                    onClick={handleProgressBarClick}
                    className="relative w-full h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-full cursor-pointer overflow-hidden group transition-all hover:h-3"
                >
                    <div
                        className="absolute h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all"
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                    {/* Thumb on hover visualizer */}
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-teal-600 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ left: `calc(${progressPercent}% - 8px)` }}
                    ></div>
                </div>
                <div className="flex justify-between text-xs font-bold text-zinc-500 dark:text-zinc-400">
                    <span>{formatDuration(currentTime)}</span>
                    <span>{formatDuration(duration)}</span>
                </div>
            </div>

            {/* Controls Group */}
            <div className="flex items-center gap-8">
                {/* RW 10s */}
                <button
                    onClick={() =>
                        audioRef.current && (audioRef.current.currentTime -= 10)
                    }
                    className="text-zinc-400 hover:text-teal-600 dark:hover:text-emerald-400 transition-all active:scale-95"
                    title="Backward 10s"
                >
                    <svg
                        className="w-7 h-7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>

                {/* MAIN PLAY/PAUSE */}
                <Button
                    onClick={togglePlay}
                    variant="primary"
                    className="h-20 w-20 rounded-full shadow-xl shadow-teal-600/20 dark:shadow-teal-900/30 p-0 flex items-center justify-center bg-teal-600 hover:bg-teal-500 dark:bg-emerald-600 dark:hover:bg-emerald-500 border-0 active:scale-95 hover:scale-105 transition-transform"
                >
                    {isPlaying ? (
                        <svg
                            className="w-8 h-8 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <rect
                                x="6"
                                y="4"
                                width="4"
                                height="16"
                                rx="1"
                            ></rect>
                            <rect
                                x="14"
                                y="4"
                                width="4"
                                height="16"
                                rx="1"
                            ></rect>
                        </svg>
                    ) : (
                        <svg
                            className="w-8 h-8 text-white ml-1.5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M7 4.5v15l12-7.5z"></path>
                        </svg>
                    )}
                </Button>

                {/* FF 10s */}
                <button
                    onClick={() =>
                        audioRef.current && (audioRef.current.currentTime += 10)
                    }
                    className="text-zinc-400 hover:text-teal-600 dark:hover:text-emerald-400 transition-all active:scale-95"
                    title="Forward 10s"
                >
                    <svg
                        className="w-7 h-7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}
