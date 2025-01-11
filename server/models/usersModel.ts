import { sql } from '~~/server/db';
import { Users } from '~/types/Users';

export const fetchUserById = async (id: number) => {    
    const result = await sql({
        query: 'SELECT * from users WHERE id = ?',
        values: [ id ]
    })

    return result as Users[]
}