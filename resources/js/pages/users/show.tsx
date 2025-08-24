import AppLayout from '@/layouts/app-layout';
import { User, type BreadcrumbItem } from '@/types';

import { Head, Link, router } from '@inertiajs/react';

import AlertMessage from '@/components/alert-message';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeftIcon, Edit } from 'lucide-react';
import { SelectTrigger, Select, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

export default function UserShow({ user, roles }: { user: User, roles: string[] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Users',
            href: '/users',
        },
        {
            title: user.full_name,
            href: '/users',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="space-y-6">
                    <HeadingSmall title={user.first_name} description="Ensure your account is using a long, random password to stay secure" />

                    <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>

                            <Input
                                id="name"
                                name="name"
                                type="text"
                                className="mt-1 block w-full"
                                autoComplete="name"
                                placeholder="Name"
                                disabled
                                defaultValue={user.name}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>

                            <Input
                                id="email"
                                name="email"
                                type="email"
                                className="mt-1 block w-full"
                                autoComplete="email"
                                placeholder="Email"
                                disabled
                                defaultValue={user.email}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email_verified_at">Email verified at</Label>

                            <Input
                                id="email_verified_at"
                                name="email_verified_at"
                                type="text"
                                className="mt-1 block w-full"
                                autoComplete="email_verified_at"
                                placeholder="Email Verified At"
                                disabled
                                defaultValue={user.email_verified_at ?? ''}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="role">Role</Label>
                            <Select defaultValue={roles && roles.length > 0 ? roles[0] : ""}>
                                <SelectTrigger disabled>
                                    <SelectValue placeholder="role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem disabled value="admin">Admin</SelectItem>
                                    <SelectItem disabled value="Super-Admin">Super Admin</SelectItem>
                                    <SelectItem value="teacher">Teacher</SelectItem>
                                    <SelectItem value="student">Student</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center justify-between gap-4 lg:col-span-2">
                            <Button asChild>
                                <Link href={route('users.index')}>
                                    <ArrowLeftIcon />
                                    Back
                                </Link>
                            </Button>
                            <div className="flex items-center gap-4">
                                <Button asChild>
                                    <Link href={route('users.edit', user.id)}>
                                        <Edit />
                                        Edit
                                    </Link>
                                </Button>
                                <AlertMessage
                                    triggerTitle="Delete"
                                    onContinue={() => {
                                        router.delete(route('users.destroy', user.id));
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
