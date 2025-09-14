export const EVENTS = {
    COLUMN: {
        REORDERED: "column:reordered",
        CREATED: "column:created",
        DELETED: "column:deleted",
    },
    TASK: {
        CREATED: "task:created",
        UPDATED: "task:updated",
        DELETED: "task:deleted",
        REORDERED: "task:reordered",
    },
    BOARD: {
        UPDATED: "board:updated",
    },
} as const;
