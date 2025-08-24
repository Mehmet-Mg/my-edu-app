import AppLayout from '@/layouts/app-layout';
import { SharedData, User, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';


import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table } from '@tanstack/react-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

export default function Users({ users }: { users: { data: User[] } }) {
    const { flash } = usePage<SharedData>().props;

    React.useEffect(() => {
        if (flash.success) {
            toast.success(flash.success)
        }
        if (flash.error) {
            toast.error(flash.error)
        }
    }, [flash]);

    const filterElements = (table: Table<User>) => (
        <div className='grid grid-cols-2 gap-2 lg:w-full lg:max-w-md'>
            <Input
                placeholder="Filter emails..."
                value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("email")?.setFilterValue(event.target.value)
                }
                className="lg:max-w-sm w-full"
            />

            <Select
                value={(table.getColumn("roles")?.getFilterValue() as string) ?? ""}
                onValueChange={(value: string) => {
                    table.getColumn("roles")?.setFilterValue(value === 'all' ? undefined : value)
                }}
            >
                <SelectTrigger className="lg:max-w-sm w-full">
                    <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent side="top">
                    {['all', 'teacher', 'student', 'admin', 'user'].map((role) => (
                        <SelectItem key={role} value={`${role}`}>
                            {role}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );

    const customButton = (
        <Button asChild size="sm">
            <Link href={route('users.create')}>
                <Plus />
                Create
            </Link>
        </Button>
    )

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="h-full w-full p-4">
                <div className="container mx-auto">
                    <DataTable
                        columns={columns}
                        customButton={customButton}
                        data={users.data}
                        filterElements={filterElements} />
                </div>
            </div>
        </AppLayout>
    );
}
