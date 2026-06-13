import React from 'react';

export function FooterLogo({ className }: { className?: string }) {
    return (
        <div className={`flex items-center select-none opacity-80 hover:opacity-100 transition-opacity duration-200 ${className}`}>
            <svg
                viewBox="0 0 540 90"
                className="h-8 w-auto" /* Slightly lower profile for footer hierarchy */
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <text
                    x="10"
                    y="65"
                    fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
                    letterSpacing="0"
                >
                    {/* RAXEL: Stays crisp and clean */}
                    <tspan fontSize="72" fontWeight="800" fill="#FFFFFF">
                        RAXEL
                    </tspan>

                    {/* MEDIA: Retains the midpoint alignment but optimized for sub-navigation spaces */}
                    <tspan
                        fontSize="42"
                        fontWeight="700"
                        fill="#0ca35a" /* Slightly deeper green so it doesn't pull focus from footer content */
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