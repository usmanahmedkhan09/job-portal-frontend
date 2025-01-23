class Pagination<T>
{
    current_page: string | null = null;
    first_page_url: string | null = null;
    from: string | null = null;
    data: T[] = []; // Keeping it as an array; remove `|| {}` since it's unnecessary.
    next_page_url: string | null = null;
    path: string | null = null;
    per_page: string | null = null; // Corrected to `per_page` instead of `pre_page`
    prev_page_url: string | null = null;
    to: string | null = null;

    // Static method to create a Pagination instance from an API response
    static fromApiResponse<T>(response: ApiResponse<Pagination<T>>): Pagination<T>
    {

        const pagination = new Pagination<T>();
        const data = response.data as Pagination<T>;

        pagination.current_page = data.current_page?.toString() ?? null;
        pagination.first_page_url = data.first_page_url;
        pagination.from = data.from?.toString() ?? null;
        pagination.data = data.data ?? [];
        pagination.next_page_url = data.next_page_url;
        pagination.path = data.path;
        pagination.per_page = data.per_page?.toString() ?? null;
        pagination.prev_page_url = data.prev_page_url;
        pagination.to = data.to?.toString() ?? null;

        console.log(pagination);
        return pagination;
    }
}

// Interface for the API response
interface ApiResponse<T>
{
    data: T;
    errors: object | null; // You can further define the error structure if needed
    message: string | null;
    statusCode: number;
    success: boolean;
}

export { ApiResponse, Pagination };

