export interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
}

export interface IBackendResWithPagination<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data: {
        meta: {
            current: number;
            pageSize: number;
            totalItems: number;
        };
        result: T[]
    };
}
