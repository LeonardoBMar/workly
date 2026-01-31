import { useState, useEffect, useCallback } from "react";

export interface Service {
    id: string;
    name: string;
    description?: string;
    price: string;
    duration: number;
}

export function useServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchServices = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/services");

            if (!response.ok) {
                throw new Error("Failed to fetch services");
            }

            const data = await response.json();
            setServices(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            console.error("Error fetching services:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchServices();
    }, [fetchServices]);

    return {
        services,
        isLoading,
        error,
        fetchServices,
    };
}
