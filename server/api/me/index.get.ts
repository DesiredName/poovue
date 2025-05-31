import tryExecute from '~~/server/utils/try';
import {me} from '~~/server/users.table.js';

export default defineEventHandler(async () => {
    return await tryExecute<Me>(async () => {
        return me;
    });
});
