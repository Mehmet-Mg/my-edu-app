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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Teachers',
        href: '/teachers',
    },
];

export const columns: ColumnDef<User>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'id',
        header: 'Id',
        cell: ({ row }) => <div className="capitalize">{row.getValue('id')}</div>,
    },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Email
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
    },
    {
        accessorKey: 'roles',
        header: 'Role',
        cell: ({ row }) => <div className="capitalize">{(row.getValue('roles') && row.getValue('roles').length > 0) ? row.getValue('roles')[0].name : ''}</div>,
    },
    {
        accessorKey: 'email_verified_at',
        header: 'Email Verified At',
        cell: ({ row }) => <div className="capitalize">{row.getValue('email_verified_at')}</div>,
    },
    {
        id: 'actions',
        header: "İşlemler",
        enableHiding: false,
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div className='flex gap-2'>
                    <Button variant="secondary" size="icon" className="size-8 bg-yellow-500 hover:bg-yellow-200" asChild>
                        <Link href={route('teachers.show', user.id)}>
                            <Eye />
                        </Link>
                    </Button>
                    <Button variant="default" size="icon" className="size-8" asChild>
                        <Link href={route('teachers.edit', user.id)} >
                            <Edit />
                        </Link>
                    </Button>
                    <AlertMessage
                        onContinue={() => {
                            router.delete(route('teachers.destroy', row.getValue('id')));
                        }}
                    />
                </div>
            );
        },
    },
];

export default function Teachers({ paginatedUsers }: { paginatedUsers: PaginatedData<User> }) {
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

    const users = paginatedUsers.data;

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
        data: users,
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

    const handleFilterValuesChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setFilterValues(values => ({
            ...values,
            [name]: value,
        }));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="h-full w-full p-4">
                <div className="flex lg:items-center lg:justify-between py-4 flex-col lg:flex-row gap-2">
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
                            <Link href={route('teachers.create')}>
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
                </div>
                <div className="overflow-hidden rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <MyPagination
                    links={paginatedUsers.meta.links}
                    perPage={filterValues.per_page}
                    onPerPageChange={handleFilterValuesChange}
                />
            </div>
        </AppLayout>
    );
}
