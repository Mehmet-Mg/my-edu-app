import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    flash: {
        success?: string;
        error?: string;
    }
    [key: string]: unknown;
}

export interface User {
    id: number;
    full_name: string;
    first_name: string;
    last_name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    roles: string[];
    [key: string]: unknown; // This allows for additional properties...
}

export interface Role {
    id: number;
    name: string;
}

export interface PaginatedData<T> {
    data: T[];
    links: PaginatedLink;
    meta: PaginatedMeta;
}

export interface PaginatedLink {
    first: string;
    last: string;
    next: string;
    prev: string;
};

export interface PaginatedMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: PaginatedMetaLink[];
    path: string;
    per_page: number;
    to: number;
    total: number;
};

export interface PaginatedMetaLink {
    url: string | null,
    label: string,
    page: string | null,
    active: boolean
};