import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

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
import { Checkbox } from "@/components/ui/checkbox"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
    {
        title: 'User Create',
        href: '/users/creates',
    },
];

export default function UserCreate({ roles }: { roles: string[] }) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="space-y-6">
                    <HeadingSmall title="User Create" />

                    <Form
                        method="post"
                        action={route('users.store')}
                        options={{
                            preserveScroll: true,
                        }}
                        resetOnError={['password', 'password_confirmation', 'current_password']}
                        resetOnSuccess
                    
                        className="space-y-6"
                    >
                        {({ errors, processing, recentlySuccessful }) => (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div className="grid gap-2">
                                    <Label htmlFor="first_name">First Name</Label>

                                    <Input
                                        id="first_name"
                                        name="first_name"
                                        type="text"
                                        className="mt-1 block w-full"
                                        autoComplete="first_name"
                                        placeholder="First Name"
                                        tabIndex={1}
                                    />

                                    <InputError message={errors.first_name} />
                                </div>


                                <div className="grid gap-2">
                                    <Label htmlFor="last_name">Last Name</Label>

                                    <Input
                                        id="last_name"
                                        name="last_name"
                                        type="text"
                                        className="mt-1 block w-full"
                                        autoComplete="last_name"
                                        placeholder="Last Name"
                                        tabIndex={2}
                                    />

                                    <InputError message={errors.last_name} />
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
                                        tabIndex={3}
                                    />

                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        tabIndex={4}
                                        autoComplete="new-password"
                                        name="password"
                                        placeholder="Password"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">Confirm password</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        required
                                        tabIndex={5}
                                        autoComplete="new-password"
                                        name="password_confirmation"
                                        placeholder="Confirm password"
                                    />
                                    <InputError message={errors.password_confirmation} />
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
                                    <Select name='role'>
                                        <SelectTrigger tabIndex={8} name="role" className="w-full">
                                            <SelectValue placeholder="role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {roles.map((role) => (
                                                <SelectItem key={role} value={role}>{role}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.role} className="mt-2" />
                                </div>

                                <div className="lg:col-span-2 flex items-center justify-between gap-4">
                                    <Button asChild type="button">
                                        <Link href={route('users.index')}>
                                            <ArrowLeftIcon />
                                            Back
                                        </Link>
                                    </Button>
                                    <Button type="submit" disabled={processing} tabIndex={10}>
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
