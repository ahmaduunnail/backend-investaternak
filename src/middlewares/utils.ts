interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: any;
}

export const createResponse = <T = any>(
    success: boolean,
    data?: T,
    message?: string,
    errors?: any
): ApiResponse<T> => {
    return { success, data, message, errors };
};