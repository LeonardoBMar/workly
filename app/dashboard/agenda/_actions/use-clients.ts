import { useState, useCallback } from "react";

export interface Client {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    notes?: string;
}

export function useClients() {
    const [clients, setClients] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchClients = useCallback(async (search: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            if (search) params.append("search", search);

            const response = await fetch(`/api/clients?${params.toString()}`);

            if (!response.ok) {
                throw new Error("Failed to search clients");
            }

            const data = await response.json();
            setClients(data);
            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            console.error("Error searching clients:", err);
            return [];
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createClient = useCallback(async (clientData: Omit<Client, "id">) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/clients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(clientData),
            });

            if (!response.ok) {
                throw new Error("Failed to create client");
            }

            const newClient = await response.json();
            setClients((prev) => [...prev, newClient]);
            return newClient;
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            console.error("Error creating client:", err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        clients,
        isLoading,
        error,
        searchClients,
        createClient,
    };
}
