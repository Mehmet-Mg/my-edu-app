import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { Icon } from './icon';
import { Trash2 } from 'lucide-react';


interface AlertMessageProps {
    variant?: 'descructive' | 'sidebar';
    onContinue?: () => void;
    onCancel?: () => void;
    triggerTitle?: string;
    title?: string;
    description?: string;
    cancelText?: string;
    continueText?: string;
    className?: string;
    icon?: React.ReactNode;
}

export default function AlertMessage({icon, triggerTitle, className, title, description, cancelText, continueText, onCancel, onContinue, variant}: AlertMessageProps) {


    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon"  className="size-8">
                    <Trash2 /></Button>
                </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title ?? "Are you absolutely sure?"}</AlertDialogTitle>
                    <AlertDialogDescription>
                         {description ?? "This action cannot be undone. This will permanently delete your account and remove your data from our servers."}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onCancel}>{cancelText ?? "Cancel"}</AlertDialogCancel>
                    <AlertDialogAction onClick={onContinue}>{continueText ?? "Continue"}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
