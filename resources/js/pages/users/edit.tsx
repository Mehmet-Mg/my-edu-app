import AppLayout from '@/layouts/app-layout';
import { User, type BreadcrumbItem } from '@/types';

import { Form, Head, Link } from '@inertiajs/react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Transition } from '@headlessui/react';
import { ArrowLeftIcon, Save } from 'lucide-react';
import { useRef } from 'react';
import { SelectTrigger, Select, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

export default function UserShow({ user, roles }: { user: User, roles: string[] }) {
    const nameInput = useRef<HTMLInputElement>(null);
    const emailInput = useRef<HTMLInputElement>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Users',
            href: '/users',
        },
        {
            title: user.full_name + ' Edit',
            href: '/users',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="space-y-6">
                    <HeadingSmall title={user.full_name + ' Edit'} description="Ensure your account is using a long, random password to stay secure" />

                    <Form
                        method="patch"
                        action={route('users.update', user.id)}
                        options={{
                            preserveScroll: true,
                        }}
                        resetOnError={['password', 'password_confirmation', 'current_password']}
                        resetOnSuccess
                        onError={(errors) => {
                            if (errors.name) {
                                nameInput.current?.focus();
                            }
                            if (errors.email) {
                                emailInput.current?.focus();
                            }
                        }}
                        className="space-y-6"
                    >
                        {({ errors, processing, recentlySuccessful }) => (
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                <Input id="id" name="id" type="hidden" defaultValue={user.id} />

                                <div className="grid gap-2">
                                    <Label htmlFor="first_name">First Name</Label>

                                    <Input
                                        id="name"
                                        ref={nameInput}
                                        name="first_name"
                                        type="text"
                                        className="mt-1 block w-full"
                                        autoComplete="first_name"
                                        placeholder="First Name"
                                        defaultValue={user.first_name}
                                    />

                                    <InputError message={errors.first_name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="last_name">Last Name</Label>

                                    <Input
                                        id="last_name"
                                        ref={nameInput}
                                        name="last_name"
                                        type="text"
                                        className="mt-1 block w-full"
                                        autoComplete="last_name"
                                        placeholder="Last Name"
                                        defaultValue={user.last_name}
                                    />

                                    <InputError message={errors.last_name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>

                                    <Input
                                        id="email"
                                        ref={emailInput}
                                        name="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        autoComplete="email"
                                        placeholder="Email"
                                        defaultValue={user.email}
                                    />

                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        id="address"
                                        name="address"
                                        type="text"
                                        className="mt-1 block w-full"
                                        autoComplete="address"
                                        placeholder="Address"
                                        tabIndex={6}
                                    />
                                    <InputError message={errors.address} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="phone_number">Phone Number</Label>
                                    <Input
                                        id="phone_number"
                                        name="phone_number"
                                        type="tel"
                                        className="mt-1 block w-full"
                                        autoComplete="phone_number"
                                        placeholder="Phone Number"
                                        tabIndex={7}
                                    />
                                    <InputError message={errors.phone_number} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Select name='role' defaultValue={roles && roles.length > 0 ? roles[0] : ""}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem disabled value="admin">Admin</SelectItem>
                                            <SelectItem disabled value="Super-Admin">Super Admin</SelectItem>
                                            <SelectItem value="teacher">Teacher</SelectItem>
                                            <SelectItem value="student">Student</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.role} />
                                </div>

                                <div className="flex items-center justify-between gap-4 lg:col-span-2">
                                    <Button asChild type="button">
                                        <Link href={route('users.index')}>
                                            <ArrowLeftIcon />
                                            Back
                                        </Link>
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        <Save />
                                        Save
                                    </Button>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-neutral-600">Saved</p>
                                    </Transition>
                                </div>
                            </div>
                        )}
                    </Form>
                </div>
            </div>
        </AppLayout>
    );
}
