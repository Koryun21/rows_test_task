export class DataFetcher {
    BASE_URL: string = 'http://example.com'

    async get<T>(url: string, params: Record<string, string>): Promise<T> {
        const queryString = new URLSearchParams(params).toString();
        try {
            const response = await fetch(`${this.BASE_URL}${url}?${queryString}`);
            if (!response.ok) {
                throw new Error(`Fetching error: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Failed to fetch data from ${url}: ${error}`);
            throw error;
        }
    }
}