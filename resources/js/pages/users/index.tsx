import AppLayout from '@/layouts/app-layout';
import { SharedData, User, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';


import { DataTable } from '@/components/data-table';
import { columns } from './columns';

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="h-full w-full p-4">
                <div className="container mx-auto">
                    <DataTable
                        columns={columns}
                        customButton={
                            <Button asChild size="sm">
                                <Link href={route('users.create')}>
                                    <Plus />
                                    Create
                                </Link>
                            </Button>
                        }
                        data={users.data} />
                </div>
            </div>
        </AppLayout>
    );
}
