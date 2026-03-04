'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CircleHelpIcon } from '@/app/components/icons/CircleHelpIcon';
import { SettingsIcon } from '@/app/components/icons/SettingsIcon';
import { ClockIcon } from '@/app/components/icons/ClockIcon';
import { HomeIcon } from '@/app/components/icons/Home';
import { CalendarDaysIcon } from '@/app/components/icons/Calendar';
import { UsersIcon } from '@/app/components/icons/Users';
import { BoxIcon } from '@/app/components/icons/Package';
import { LinkIcon } from '@/app/components/icons/Link';
import { MessageCircleIcon } from '@/app/components/icons/MessageCircleIcon';
import { CreditCardIcon } from '@/app/components/icons/CreditCard';
import { FileTextIcon } from '@/app/components/icons/FileText';
import { BarChart3Icon } from '@/app/components/icons/BarChart3';
import { PanelLeftCloseIcon } from '@/app/components/icons/PanelLeftCloseIcon';
import { PanelLeftOpenIcon } from '@/app/components/icons/PanelLeftOpenIcon';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

const menuItems = [
  { icon: HomeIcon, label: 'Início', href: '/dashboard' },
  { icon: CalendarDaysIcon, label: 'Agenda', href: '/dashboard/agenda' },
  { icon: UsersIcon, label: 'Clientes', href: '/dashboard/clientes' },
  { icon: BoxIcon, label: 'Serviços', href: '/dashboard/servicos' },
  { icon: LinkIcon, label: 'Sua Pagina', href: '/dashboard/link' },
  { icon: MessageCircleIcon, label: 'WhatsApp', href: '/dashboard/whatsapp' },
  { icon: ClockIcon, label: 'Horários', href: '/dashboard/settings?tab=hours' },
  {
    icon: CreditCardIcon,
    label: 'Plano e Faturamento',
    href: '/dashboard/billing',
  },
];

type ProductItemType = {
  icon: any;
  label: string;
  href: string;
  hasMore?: boolean;
  subItems?: { icon: any; label: string; href: string }[];
};

const productItems: ProductItemType[] = [
  {
    icon: CreditCardIcon,
    label: 'Financeiro',
    href: '#',
    hasMore: true,
    subItems: [
      { icon: FileTextIcon, label: 'Faturas', href: '/dashboard/faturas' },
      {
        icon: BarChart3Icon,
        label: 'Relatórios',
        href: '/dashboard/relatorios',
      },
    ],
  },
];

function SubItem({
  sub,
  isActive,
}: {
  sub: { icon: any; label: string; href: string };
  isActive: boolean;
}) {
  const iconRef = useRef<any>(null);

  return (
    <li>
      <Link
        href={sub.href}
        onMouseEnter={() => iconRef.current?.startAnimation?.()}
        onMouseLeave={() => iconRef.current?.stopAnimation?.()}
        className={cn(
          'group flex items-center gap-3 rounded-lg py-2 pr-3 pl-11 text-sm font-medium transition-colors',
          isActive
            ? 'bg-indigo-50/50 font-semibold text-indigo-700'
            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900',
        )}
      >
        <sub.icon
          ref={iconRef}
          size={16}
          className={cn(
            'shrink-0 transition-transform duration-200 group-hover:scale-110',
            isActive
              ? 'text-indigo-600'
              : 'text-slate-400 group-hover:text-slate-600',
          )}
        />
        {sub.label}
      </Link>
    </li>
  );
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isCollapsed?: boolean;
  onCollapseToggle?: () => void;
}

function NavItem({
  item,
  isCollapsed,
  isActive,
}: {
  item: (typeof menuItems)[0];
  isCollapsed: boolean;
  isActive: boolean;
}) {
  const iconRef = useRef<any>(null);

  return (
    <li>
      <Link
        href={item.href}
        title={isCollapsed ? item.label : undefined}
        onMouseEnter={() => iconRef.current?.startAnimation?.()}
        onMouseLeave={() => iconRef.current?.stopAnimation?.()}
        className={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          isCollapsed && 'justify-center px-2',
          isActive
            ? 'bg-indigo-50 text-indigo-700'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
        )}
      >
        <item.icon
          ref={iconRef}
          size={isCollapsed ? 18 : undefined}
          className={cn(
            'shrink-0 transition-transform duration-200 hover:scale-110',
            isActive ? 'text-indigo-600' : 'text-slate-400',
          )}
        />
        {!isCollapsed && <span className="truncate">{item.label}</span>}
      </Link>
    </li>
  );
}

function ProductItem({
  item,
  isCollapsed,
}: {
  item: ProductItemType;
  isCollapsed: boolean;
}) {
  const iconRef = useRef<any>(null);
  const pathname = usePathname();

  const hasSubItems = item.subItems && item.subItems.length > 0;
  const isSubItemActive = !!(
    hasSubItems && item.subItems?.some((sub) => pathname?.startsWith(sub.href))
  );
  const isItemActive =
    (item.href !== '#' && pathname?.startsWith(item.href)) || isSubItemActive;

  const [isOpen, setIsOpen] = useState(isSubItemActive || false);

  const handleClick = (e: React.MouseEvent) => {
    if (hasSubItems) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <li>
      <Link
        href={item.href}
        onClick={handleClick}
        title={isCollapsed ? item.label : undefined}
        onMouseEnter={() => iconRef.current?.startAnimation?.()}
        onMouseLeave={() => iconRef.current?.stopAnimation?.()}
        className={cn(
          'group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          isCollapsed ? 'justify-center px-2' : 'justify-between',
          isItemActive || (isOpen && !isCollapsed)
            ? 'bg-indigo-50 text-indigo-700'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
        )}
      >
        <div className={cn('flex items-center gap-3', isCollapsed && 'gap-0')}>
          <item.icon
            ref={iconRef}
            size={isCollapsed ? 18 : undefined}
            className={cn(
              'shrink-0 transition-transform duration-200 group-hover:scale-110',
              isItemActive || (isOpen && !isCollapsed)
                ? 'text-indigo-600'
                : 'text-slate-400 group-hover:text-slate-600',
            )}
          />
          {!isCollapsed && item.label}
        </div>
        {!isCollapsed && item.hasMore && (
          <ChevronDown
            className={cn(
              'h-3 w-3 transition-transform duration-200',
              isOpen ? 'rotate-180 text-indigo-600' : 'text-slate-300',
            )}
          />
        )}
      </Link>

      {!isCollapsed && hasSubItems && isOpen && (
        <ul className="mt-1 space-y-1 pb-2">
          {item.subItems!.map((sub) => (
            <SubItem
              key={sub.href}
              sub={sub}
              isActive={!!pathname?.startsWith(sub.href)}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export function Sidebar({
  isOpen,
  onClose,
  isCollapsed = false,
  onCollapseToggle,
}: SidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl = searchParams.toString()
    ? `${pathname}?${searchParams.toString()}`
    : pathname;

  const settingsIconRef = useRef<any>(null);
  const helpIconRef = useRef<any>(null);

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-50 flex-col border-r border-slate-200/60 bg-white transition-all duration-300 lg:static lg:flex lg:translate-x-0',
        isCollapsed ? 'lg:w-[68px]' : 'lg:w-64',
        isOpen ? 'flex w-64 translate-x-0' : 'hidden -translate-x-full lg:flex',
      )}
    >
      <div
        className={cn(
          'flex border-b border-slate-100 transition-all duration-300',
          isCollapsed
            ? 'flex-col items-center justify-center gap-4 py-4'
            : 'h-16 flex-row items-center justify-between px-6',
        )}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-indigo-600">
            <span className="text-[10px] font-bold text-white">W</span>
          </div>
          {!isCollapsed && (
            <>
              <span className="font-semibold tracking-tight text-slate-900">
                workly
              </span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </>
          )}
        </div>

        <button
          onClick={onCollapseToggle}
          className={cn(
            'hidden cursor-pointer rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 lg:block',
            isCollapsed && 'order-first',
          )}
          title={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
        >
          {isCollapsed ? (
            <PanelLeftOpenIcon size={18} />
          ) : (
            <PanelLeftCloseIcon size={18} />
          )}
        </button>

        {!isCollapsed && (
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-x-hidden overflow-y-auto px-2 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <NavItem
              key={item.label}
              item={item}
              isCollapsed={isCollapsed}
              isActive={currentUrl === item.href}
            />
          ))}
        </ul>

        {!isCollapsed && (
          <div className="mt-8 px-3">
            <h3 className="mb-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Products
            </h3>
          </div>
        )}

        {isCollapsed && <div className="mt-6 border-t border-slate-100 pt-4" />}

        <ul className={cn('space-y-1', !isCollapsed && 'px-0')}>
          {productItems.map((item) => (
            <ProductItem
              key={item.label}
              item={item}
              isCollapsed={isCollapsed}
            />
          ))}
        </ul>
      </nav>

      <div className="border-t border-slate-100 p-2">
        <ul className="space-y-1">
          <li>
            <Link
              href="/dashboard/settings"
              title={isCollapsed ? 'Configurações' : undefined}
              onMouseEnter={() => settingsIconRef.current?.startAnimation?.()}
              onMouseLeave={() => settingsIconRef.current?.stopAnimation?.()}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50',
                isCollapsed && 'justify-center px-2',
              )}
            >
              <SettingsIcon
                ref={settingsIconRef}
                size={isCollapsed ? 18 : undefined}
                className="shrink-0 text-slate-400"
              />
              {!isCollapsed && 'Configurações'}
            </Link>
          </li>
          <li>
            <Link
              href="/help"
              title={isCollapsed ? 'Ajuda e Suporte' : undefined}
              onMouseEnter={() => helpIconRef.current?.startAnimation?.()}
              onMouseLeave={() => helpIconRef.current?.stopAnimation?.()}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50',
                isCollapsed && 'justify-center px-2',
              )}
            >
              <CircleHelpIcon
                ref={helpIconRef}
                size={isCollapsed ? 18 : undefined}
                className="shrink-0 text-slate-400"
              />
              {!isCollapsed && 'Ajuda e Suporte'}
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
