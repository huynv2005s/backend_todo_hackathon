export async function getUserById(id: string) {
    // demo: treat any id as valid user
    return { id, name: id.includes('@') ? id.split('@')[0] : id };
}