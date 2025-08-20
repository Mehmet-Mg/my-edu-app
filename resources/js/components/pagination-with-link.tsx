import { cn } from '@/lib/utils';
import { Link, router, usePage } from '@inertiajs/react';

interface PaginationProps {
    links: PaginationItem[];
    perPage?: number;
    onPerPageChange?: React.ChangeEventHandler<HTMLSelectElement>
}

export default function Pagination({ links = [], perPage, onPerPageChange }: PaginationProps) {
    /**
     * If there are only 3 links, it means there are no previous or next pages.
     * So, we don't need to render the pagination.
     */

    // const { filters } = usePage<{
    //     filters: { role?: string; search?: string; per_page?: number };
    // }>().props;

    // // per_page filtresinin değerini yakala veya varsayılan olarak 10 kullan
    // const currentPerPage = filters.per_page || '10';

    // // per_page değeri değiştiğinde çalışacak fonksiyon
    // const handlePerPageChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    //     const newPerPage = e.target.value;
    //     // Inertia.get ile URL'deki sorgu parametrelerini güncelle
    //     // Mevcut tüm filtreleri (search, sort vb.) koruyarak sadece per_page'i değiştiriyoruz.
    //     router.get(route('users.index'), {
    //         ...filters, // Mevcut filtreleri koru
    //         per_page: newPerPage,
    //     }, {
    //         preserveScroll: true, // Sayfa yenilenirken scroll konumunu koru
    //         preserveState: true,  // Mevcut formu veya diğer state'leri koru
    //     });
    // };

    return (
        <div className="flex flex-wrap mt-6 -mb-1">
            
            {links.length > 3 ? links?.map(link => {
                return link?.url === null ? (
                    <PageInactive key={link.label} label={link.label} />
                ) : (
                    <PaginationItem key={link.label} {...link} />
                );
            }) : null}

            {/* per_page Seçici */}
            <div className="mb-4 flex items-center">
                <label htmlFor="per_page" className="mr-2 text-gray-700">Sayfa Başına:</label>
                <select
                    id="per_page"
                    name="per_page"
                    value={perPage}
                    onChange={onPerPageChange}
                    className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>

        </div>
    );
}

interface PaginationItem {
    url: null | string;
    label: string;
    active: boolean;
}

function PaginationItem({ active, label, url }: PaginationItem) {
    const className = cn(
        [
            'mr-1 mb-1',
            'px-4 py-3',
            'border border-solid border-gray-300 rounded',
            'text-sm',
            'hover:bg-white',
            'focus:outline-none focus:border-indigo-700 focus:text-indigo-700'
        ],
        {
            'bg-white': active
        }
    );

    /**
     * Note: In general you should be aware when using `dangerouslySetInnerHTML`.
     *
     * In this case, `label` from the API is a string, so it's safe to use it.
     * It will be either `&laquo; Previous` or `Next &raquo;`
     */
    return (
        <Link className={className} href={url as string}>
            <span dangerouslySetInnerHTML={{ __html: label }}></span>
        </Link>
    );
}

function PageInactive({ label }: Pick<PaginationItem, 'label'>) {
    const className = cn(
        'mr-1 mb-1 px-4 py-3 text-sm border rounded border-solid border-gray-300 text-gray'
    );

    /**
     * Note: In general you should be aware when using `dangerouslySetInnerHTML`.
     *
     * In this case, `label` from the API is a string, so it's safe to use it.
     * It will be either `&laquo; Previous` or `Next &raquo;`
     */
    return (
        <div className={className} dangerouslySetInnerHTML={{ __html: label }} />
    );
}