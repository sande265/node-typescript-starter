class PaginateFunction {
    
}

interface PaginateProps {
    (
        payload: Array<[]>,
        limit: number,
        total: number,
        page: string,
    ): PaginateFunction;
}

export const paginate: PaginateProps = (payload, limit, total, page) => {
    const pages = page ? parseInt(page) : 1;
    const start = (pages - 1) * limit + 1;
    const to = (pages - 1) * limit + payload.length;
    const last_page = Math.ceil(total / limit)

    return {
        current_page: pages,
        data: payload,
        from: start,
        to,
        limit,
        last_page,
        total: total
    }
}