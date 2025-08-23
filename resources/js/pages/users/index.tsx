import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { PaginatedData, SharedData, User, type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, Edit, Eye, Plus } from 'lucide-react';
import * as React from 'react';

import AlertMessage from '@/components/alert-message';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

import { usePrevious } from 'react-use';
import pickBy from 'lodash/pickBy';

import MyPagination from '@/components/pagination-with-link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

export default function Users({ paginatedUsers }: { paginatedUsers: PaginatedData<User> }) {
    const { flash } = usePage<SharedData>().props;
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const { filters } = usePage<{
        filters: { role?: string; search?: string; per_page?: number };
    }>().props;

    const [filterValues, setFilterValues] = React.useState({
        role: filters.role,
        search: filters.search,
        per_page: filters.per_page,
    });

    const prevFilterValues = usePrevious(filterValues);

    const teachers = paginatedUsers.data;
    React.useEffect(() => {
        if (flash.success) {
            toast.success(flash.success)
        }
        if (flash.error) {
            toast.error(flash.error)
        }
    }, [flash]);

    React.useEffect(() => {
        if (prevFilterValues) {
            const query = Object.keys(pickBy(filterValues)).length ? pickBy(filterValues) : {};
            router.get(route(route().current() as string), query, {
                replace: true,
                preserveState: true,
            });
        }
    }, [filterValues])

    const table = useReactTable({
        data: teachers,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    // const handleFilterValuesChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //     const name = e.target.name;
    //     const value = e.target.value;
    //     setFilterValues(values => ({
    //         ...values,
    //         [name]: value,
    //     }));
    // }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="h-full w-full p-4">
                {/* <div className="flex lg:items-center lg:justify-between py-4 flex-col lg:flex-row gap-2">
                    <div className='flex gap-2 flex-col lg:flex-row'>
                        <Input
                            name='search'
                            placeholder="Filter users..."
                            value={filterValues.search}
                            onChange={handleFilterValuesChange}
                            className="lg:max-w-sm"
                        />
                        <Select name='role' onValueChange={(value) => {
                            setFilterValues(values => ({
                                ...values,
                                role: value !== 'all' ? value : '',
                            }))
                        }} value={filterValues.role}>
                            <SelectTrigger className="lg:max-w-sm">
                                <SelectValue placeholder="Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="teacher">Teacher</SelectItem>
                                <SelectItem value="student">Student</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex gap-2">
                        <Button asChild>
                            <Link href={route('users.create')}>
                                <Plus />
                                Create
                            </Link>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="ml-auto">
                                    Columns <ChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        );
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div> */}
                <div className="container mx-auto">
                    <DataTable columns={columns} data={paginatedUsers.data} />
                </div>
            </div>
        </AppLayout>
    );
}
