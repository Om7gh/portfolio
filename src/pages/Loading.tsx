import { usePorfolio } from "@/store/usePortfolio"
import { frame1, frame2, frame3, frame4, frame5, frame6 } from "@assets"
import { useEffect, useState } from "react"

const frames = [frame1, frame2, frame3, frame4, frame5, frame6]

function Loading({ onLoadingComplete }: { onLoadingComplete?: () => void }) {
    const [currentFrame, setCurrentFrame] = useState(0)
    const [progress, setProgress] = useState(0)
    const [loadingText, setLoadingText] = useState("Starting up...")
    const {setIsVisited} = usePorfolio()

    const loadingMessages = [
        "Starting up...",
        "Loading assets...",
        "Preparing workspace...",
        "Initializing components...",
        "Almost there...",
        "Welcome!"
    ]

    // Frame animation
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFrame((prevFrame) => (prevFrame + 1) % frames.length)
        }, 120)
        return () => clearInterval(interval)
    }, [])

    // Progress bar animation
    useEffect(() => {
        const duration = 3000
        const steps = 100
        const stepDuration = duration / steps

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    onLoadingComplete?.()
                    setIsVisited()
                    return 100
                }
                return prev + 1
            })
        }, stepDuration)

        return () => clearInterval(interval)
    }, [onLoadingComplete])

    // Update loading text based on progress
    useEffect(() => {
        const messageIndex = Math.min(
            Math.floor(progress / (100 / loadingMessages.length)),
            loadingMessages.length - 1
        )
        setLoadingText(loadingMessages[messageIndex])
    }, [progress])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#1d1d1f] via-[#2d2d30] to-[#1d1d1f]">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, #fff 1px, transparent 1px),
                                     radial-gradient(circle at 75% 75%, #fff 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }} />
            </div>

            {/* macOS-style loading card */}
            <div className="relative flex flex-col items-center p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                {/* Glassmorphism glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-50" />
                
                <div className="relative z-10 flex flex-col items-center">
                    {/* Apple-style logo area with animated character */}
                    <div className="relative mb-8">
                        {/* Glow behind character */}
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-400/30 to-purple-500/30 rounded-full blur-2xl scale-150" />
                        
                        {/* Character container */}
                        <div className="relative w-32 h-32 flex items-center justify-center">
                            <img
                                src={frames[currentFrame]}
                                alt="Loading character"
                                className="w-28 h-28 object-contain drop-shadow-2xl"
                                style={{
                                    filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.4))'
                                }}
                            />
                        </div>
                    </div>

                    {/* Portfolio title */}
                    <h1 className="text-2xl font-semibold text-white/90 mb-2 tracking-tight">
                        Omar Ghazi
                    </h1>
                    <p className="text-sm text-white/50 mb-8 font-light tracking-wide">
                        Portfolio
                    </p>

                    {/* macOS-style progress bar */}
                    <div className="w-64 mb-4">
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-100 ease-out"
                                style={{
                                    width: `${progress}%`,
                                    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)'
                                }}
                            />
                        </div>
                    </div>

                    {/* Loading text */}
                    <p className="text-xs text-white/40 font-light tracking-wider">
                        {loadingText}
                    </p>

                    {/* Progress percentage */}
                    <p className="text-xs text-white/30 mt-2 font-mono">
                        {progress}%
                    </p>
                </div>
            </div>

            {/* Bottom copyright text - macOS style */}
            <div className="absolute bottom-8 text-center">
                <p className="text-xs text-white/20 font-light">
                    © 2026 Omar Ghazi. All rights reserved.
                </p>
            </div>
        </div>
    )
}

export default Loading