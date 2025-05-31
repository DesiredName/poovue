export default async function tryExecute<T>(callback: () => Promise<T>) {
    try {
        return await callback();
    } catch (ex) {
        console.error(ex);
        throw createError({ statusCode: 422 });
    }
}
