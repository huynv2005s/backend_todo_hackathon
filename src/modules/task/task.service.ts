type Task = {
    id: string;
    boardId: string;
    title: string;
    description?: string;
    createdBy: string;
    createdAt: string;
    updatedAt?: string;
};


const tasks: Task[] = [];


export async function createTask(payload: Partial<Task>) {
    const id = Math.random().toString(36).slice(2, 9);
    const now = new Date().toISOString();
    const task: Task = {
        id,
        boardId: payload.boardId!,
        title: payload.title || 'untitled',
        description: payload.description,
        createdBy: payload.createdBy || 'system',
        createdAt: now,
    };
    tasks.push(task);
    return task;
}


export async function getTasksByBoard(boardId: string) {
    return tasks.filter((t) => t.boardId === boardId);
}


export async function updateTask(taskId: string, changes: Partial<Task>) {
    const t = tasks.find((x) => x.id === taskId);
    if (!t) throw new Error('not_found');
    Object.assign(t, changes, { updatedAt: new Date().toISOString() });
    return t;
}


export async function deleteTask(taskId: string) {
    const idx = tasks.findIndex((x) => x.id === taskId);
    if (idx === -1) throw new Error('not_found');
    tasks.splice(idx, 1);
}