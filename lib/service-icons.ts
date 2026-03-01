'use client';

import {
  Scissors,
  Sparkles,
  Hand,
  Paintbrush,
  Heart,
  Smile,
  Star,
  Droplets,
  Zap,
  Crown,
  Flower2,
  Eye,
  Package,
  type LucideIcon,
} from 'lucide-react';

export const SERVICE_ICONS: {
  name: string;
  icon: LucideIcon;
  label: string;
}[] = [
  { name: 'Scissors', icon: Scissors, label: 'Corte' },
  { name: 'Sparkles', icon: Sparkles, label: 'Estética' },
  { name: 'Hand', icon: Hand, label: 'Manicure' },
  { name: 'Paintbrush', icon: Paintbrush, label: 'Coloração' },
  { name: 'Heart', icon: Heart, label: 'Bem-estar' },
  { name: 'Smile', icon: Smile, label: 'Facial' },
  { name: 'Star', icon: Star, label: 'Destaque' },
  { name: 'Droplets', icon: Droplets, label: 'Hidratação' },
  { name: 'Zap', icon: Zap, label: 'Depilação' },
  { name: 'Crown', icon: Crown, label: 'Premium' },
  { name: 'Flower2', icon: Flower2, label: 'Spa' },
  { name: 'Eye', icon: Eye, label: 'Sobrancelha' },
];

export function getServiceIcon(
  iconName: string | null | undefined,
): LucideIcon {
  if (!iconName) return Package;
  const found = SERVICE_ICONS.find((i) => i.name === iconName);
  return found?.icon ?? Package;
}
