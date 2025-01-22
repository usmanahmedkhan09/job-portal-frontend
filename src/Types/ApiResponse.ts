interface PaginationLink
{
    url: string | null;
    label: string;
    active: boolean;
}

interface ApiResponse<T = any>
{
    current_page: number;
    data: T;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
    errors: null | object; // or define a specific structure for errors
    message: string | null;
    statusCode: number;
    success: boolean;
}

interface axiosError<T = any>
{

}


export { ApiResponse };

