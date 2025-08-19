import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination';
import { buttonVariants } from './ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface PaginationWithProps {
    links: PaginationWithLinkItem[];
}

export default function PaginationWithLink({ links = [] }: PaginationWithProps) {
    /**
     * If there are only 3 links, it means there are no previous or next pages.
     * So, we don't need to render the pagination.
     */
    if (links.length === 3) return null;


    // <PaginationItem>
    //     {paginatedUsers.links.prev ?
    //         <Link
    //             aria-label="Go to previous page"
    //             href={paginatedUsers.links.prev}
    //             className={"gap-1 px-2.5 sm:pl-2.5"}
    //         >
    //             <ChevronLeftIcon />
    //             <span className="hidden sm:block">Previous</span>
    //         </Link> : <></>}
    // </PaginationItem>

    // <PaginationItem>
    //     <PaginationLink href="#">1</PaginationLink>
    // </PaginationItem>
    // <PaginationItem>
    //     <PaginationLink href="#" isActive>
    //         2
    //     </PaginationLink>
    // </PaginationItem>

    // <PaginationItem>
    //     <PaginationEllipsis />
    // </PaginationItem>

    // <PaginationItem>
    //     {paginatedUsers.links.next ?
    //         <Link
    //             aria-label="Go to next page"
    //             href={paginatedUsers.links.next}
    //             className={cn("gap-1 px-2.5 sm:pr-2.5")}
    //         >
    //             <span className="hidden sm:block">Next</span>
    //             <ChevronRightIcon />
    //         </Link> : <></>}
    // </PaginationItem>


    return (
        <Pagination>
            <PaginationContent>
                {links?.map((link, index) => {
                    if (index === 0) {
                        return <PaginationPrevious href={link.url as string}/>
                    } else if (index === links.length - 1) {
                         return <PaginationNext href={link.url as string}/>
                    }
                    return link?.url === null ? (
                        <PageInactive key={link.label} label={link.label} />
                    ) : (
                        <PaginationItemWithLink key={link.label} {...link} />
                    );
                })}
            </PaginationContent>
        </Pagination>
    );
}

interface PaginationWithLinkItem {
    url: null | string;
    label: string;
    active: boolean;
}

function PaginationItemWithLink({ active: isActive, label, url }: PaginationWithLinkItem) {

    return (
        // <PaginationItem>
        //     <PaginationLink href="#">3</PaginationLink>
        // </PaginationItem>
        // <Link className={className} href={url as string}>
        //     <span dangerouslySetInnerHTML={{ __html: label }}></span>
        // </Link>
        <PaginationItem>
            <Link
                aria-current={isActive ? "page" : undefined}
                data-slot="pagination-link"
                data-active={isActive}
                href={url as string}
                className={cn(
                    buttonVariants({
                        variant: isActive ? "outline" : "ghost",
                        size: 'icon',
                    }),
                )}
            >{label}</Link>
        </PaginationItem>

    );
}

function PageInactive({ label }: Pick<PaginationWithLinkItem, 'label'>) {
    /**
     * Note: In general you should be aware when using `dangerouslySetInnerHTML`.
     *
     * In this case, `label` from the API is a string, so it's safe to use it.
     * It will be either `&laquo; Previous` or `Next &raquo;`
     */
    return (
        <PaginationItem aria-disabled>
            <PaginationLink href="#" aria-disabled>
                {label}
            </PaginationLink>
        </PaginationItem>
    );
}
