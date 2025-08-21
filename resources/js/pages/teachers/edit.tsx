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

export default function TeacherEdit({ teacher, roles }: { teacher: User, roles: string[] }) {
    const nameInput = useRef<HTMLInputElement>(null);
    const emailInput = useRef<HTMLInputElement>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        {
                 title: 'Teachers',
        href: '/teachers',
        },
        {
            title: teacher.name + ' Edit',
            href: '/teachers/'+teacher.id,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="space-y-6">
                    <HeadingSmall title={teacher.name + ' Edit'} description="Ensure your account is using a long, random password to stay secure" />

                    <Form
                        method="patch"
                        action={route('teachers.update', teacher.id)}
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
                                <Input id="id" name="id" type="hidden" defaultValue={teacher.id} />

                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>

                                    <Input
                                        id="name"
                                        ref={nameInput}
                                        name="name"
                                        type="text"
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        placeholder="Name"
                                        defaultValue={teacher.name}
                                    />

                                    <InputError message={errors.name} />
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
                                        defaultValue={teacher.email}
                                    />

                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Select defaultValue={roles && roles.length > 0 ? roles[0] : ""}>
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
                                        <Link href={route('teachers.index')}>
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
