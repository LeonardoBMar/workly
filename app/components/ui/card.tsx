import React from "react";

type CardProps = {
    children: React.ReactNode;
};

export function Card({ children }: CardProps) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            {children}
        </div>
    );
}
