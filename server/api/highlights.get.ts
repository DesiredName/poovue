import tryExecute from '~~/server/utils/try';
import usersTable from '~~/server/users.table.js';

export default defineEventHandler(async (event) => {
    return await tryExecute<UserHighlight[]>(async () => {
        const query = await getValidatedQuery(event, (raw) => {
            const params = raw as Record<string, unknown>;
            const count = parseInt((params['count'] as string), 10);

            if (typeof count !== 'number' || Number.isNaN(count) || count <= 0 || count > 12)
                return { count: 1 };
            else
                return { count };
        });

        return usersTable.slice(0, query.count);
    });
});
