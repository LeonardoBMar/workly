"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Plus, User, Phone, Mail, ChevronDown } from "lucide-react"
import type { Client } from "../_hooks/use-clients"

interface ClientSelectProps {
    value: Client | null
    onChange: (client: Client | null) => void
    onCreateClient: (clientData: Omit<Client, "id">) => Promise<Client>
    onSearchClients: (search: string) => Promise<Client[]>
    isLoading?: boolean
}

export function ClientSelect({
    value,
    onChange,
    onCreateClient,
    onSearchClients,
    isLoading,
}: ClientSelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState("")
    const [clients, setClients] = useState<Client[]>([])
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [newClientData, setNewClientData] = useState({
        name: "",
        phone: "",
        email: "",
    })
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
                setShowCreateForm(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    useEffect(() => {
        if (search.trim()) {
            const debounce = setTimeout(async () => {
                const results = await onSearchClients(search)
                setClients(results)
            }, 300)
            return () => clearTimeout(debounce)
        } else {
            setClients([])
        }
    }, [search, onSearchClients])

    const handleCreateClient = async () => {
        if (!newClientData.name.trim()) return

        try {
            const newClient = await onCreateClient(newClientData)
            onChange(newClient)
            setShowCreateForm(false)
            setNewClientData({ name: "", phone: "", email: "" })
            setSearch("")
            setIsOpen(false)
        } catch (error) {
            console.error("Error creating client:", error)
        }
    }

    const handleSelectClient = (client: Client) => {
        onChange(client)
        setIsOpen(false)
        setSearch("")
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <label className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground mb-2">
                <User className="w-4 h-4" />
                Cliente
            </label>

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-3 py-2 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm flex items-center justify-between"
            >
                <span className={value ? "text-foreground" : "text-muted-foreground"}>
                    {value ? value.name : "Selecione ou crie um cliente..."}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-80 overflow-hidden flex flex-col">
                    <div className="p-2 border-b border-border">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Pesquisar cliente..."
                                className="w-full pl-9 pr-3 py-2 border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                                autoFocus
                            />
                        </div>
                    </div>

                    <div className="overflow-y-auto flex-1">
                        {isLoading ? (
                            <div className="p-4 text-center text-sm text-muted-foreground">
                                Carregando...
                            </div>
                        ) : clients.length > 0 ? (
                            <div className="p-1">
                                {clients.map((client) => (
                                    <button
                                        key={client.id}
                                        type="button"
                                        onClick={() => handleSelectClient(client)}
                                        className="w-full text-left px-3 py-2 rounded-md hover:bg-secondary transition-colors"
                                    >
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-muted-foreground" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-foreground truncate">
                                                    {client.name}
                                                </p>
                                                {(client.phone || client.email) && (
                                                    <p className="text-xs text-muted-foreground truncate">
                                                        {client.phone && client.phone}
                                                        {client.phone && client.email && " • "}
                                                        {client.email && client.email}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : search.trim() ? (
                            <div className="p-4">
                                {!showCreateForm ? (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowCreateForm(true)
                                            setNewClientData({ ...newClientData, name: search })
                                        }}
                                        className="w-full flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                        <span className="text-sm font-medium">
                                            Criar cliente "{search}"
                                        </span>
                                    </button>
                                ) : (
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-semibold text-foreground">Novo Cliente</h4>
                                        <div>
                                            <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1">
                                                <User className="w-3 h-3" />
                                                Nome *
                                            </label>
                                            <input
                                                type="text"
                                                value={newClientData.name}
                                                onChange={(e) =>
                                                    setNewClientData({ ...newClientData, name: e.target.value })
                                                }
                                                placeholder="Nome completo"
                                                className="w-full px-2 py-1.5 border border-border rounded text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1">
                                                <Phone className="w-3 h-3" />
                                                Telefone
                                            </label>
                                            <input
                                                type="tel"
                                                value={newClientData.phone}
                                                onChange={(e) =>
                                                    setNewClientData({ ...newClientData, phone: e.target.value })
                                                }
                                                placeholder="(00) 00000-0000"
                                                className="w-full px-2 py-1.5 border border-border rounded text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1">
                                                <Mail className="w-3 h-3" />
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                value={newClientData.email}
                                                onChange={(e) =>
                                                    setNewClientData({ ...newClientData, email: e.target.value })
                                                }
                                                placeholder="email@exemplo.com"
                                                className="w-full px-2 py-1.5 border border-border rounded text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setShowCreateForm(false)}
                                                className="flex-1 px-3 py-1.5 bg-secondary text-secondary-foreground rounded text-sm font-medium hover:bg-secondary/80 transition-colors"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleCreateClient}
                                                disabled={!newClientData.name.trim()}
                                                className="flex-1 px-3 py-1.5 bg-primary text-primary-foreground rounded text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Criar
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="p-4 text-center text-sm text-muted-foreground">
                                Digite para pesquisar clientes
                            </div>
                        )}
                    </div>
                </div>
            )}

            {value && (
                <div className="mt-2 p-2 bg-secondary/50 rounded-md">
                    <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{value.name}</p>
                            {value.phone && (
                                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                    <Phone className="w-3 h-3" />
                                    {value.phone}
                                </p>
                            )}
                            {value.email && (
                                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                    <Mail className="w-3 h-3" />
                                    {value.email}
                                </p>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => onChange(null)}
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Alterar
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
