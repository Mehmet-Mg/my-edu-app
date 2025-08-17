import { cn } from '@/lib/utils';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { BookOpen, CircleCheck, User } from 'lucide-react';


const options = [
    { value: 'teacher', label: 'Öğretmen', description: 'Ders vermek istiyorum', icon: BookOpen },
    { value: 'student', label: 'Öğrenci', description: 'Ders almal istiyorum', icon: User },
];

const RoleSelect = (props: RadioGroup.RadioGroupProps) => {
    return (
        <RadioGroup.Root defaultValue={"student"} className="grid w-full max-w-md grid-cols-2 gap-4" {...props}>
            {' '}
            {options.map((option) => {
                const Icon = option.icon;

                return (
                <RadioGroup.Item
                    key={option.value}
                    value={option.value}
                    className={cn(
                        'group relative rounded px-3 py-2 text-start ring-[1px] ring-border',
                        'data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500',
                    )}
                >
                    {' '}
                    <CircleCheck className="absolute top-0 right-0 h-6 w-6 translate-x-1/2 -translate-y-1/2 fill-blue-500 stroke-white text-primary group-data-[state=unchecked]:hidden" />{' '}
                    <Icon className="mb-2.5 text-muted-foreground" /> <span className="font-semibold tracking-tight">{option.label}</span>{' '}
                    <p className="text-xs">{option.description}</p>{' '}
                </RadioGroup.Item>
            )
            })}{' '}
        </RadioGroup.Root>
    );
};
export default RoleSelect;
