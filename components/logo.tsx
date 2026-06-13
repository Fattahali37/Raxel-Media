import React from 'react';

export function Logo({ className }: { className?: string }) {
    return (
        <div className={`flex items-center select-none ${className}`}>
            <svg
                viewBox="0 0 540 90"
                className="h-10 w-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <text
                    x="10"
                    y="65"
                    fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
                    letterSpacing="0"
                >
                    {/* RAXEL: Bold, high-contrast anchor word */}
                    <tspan fontSize="72" fontWeight="800" fill="#FFFFFF">
                        RAXEL
                    </tspan>

                    {/* MEDIA: Scaled up and shifted up to align with the midpoint height */}
                    <tspan
                        fontSize="42"
                        fontWeight="700"
                        fill="#0fbf6a"
                        dy="-12"
                        dx="4"
                    >
                        MEDIA
                    </tspan>
                </text>
            </svg>
        </div>
    );
}