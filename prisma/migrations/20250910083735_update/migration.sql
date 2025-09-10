/*
  Warnings:

  - You are about to drop the `activity_logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `board_members` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `boards` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notifications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organization_members` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organizations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `task_attachments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `task_comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tasks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."activity_logs" DROP CONSTRAINT "activity_logs_board_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."activity_logs" DROP CONSTRAINT "activity_logs_task_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."activity_logs" DROP CONSTRAINT "activity_logs_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."board_members" DROP CONSTRAINT "board_members_board_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."board_members" DROP CONSTRAINT "board_members_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."boards" DROP CONSTRAINT "boards_created_by_fkey";

-- DropForeignKey
ALTER TABLE "public"."boards" DROP CONSTRAINT "boards_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."lists" DROP CONSTRAINT "lists_board_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."notifications" DROP CONSTRAINT "notifications_related_board_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."notifications" DROP CONSTRAINT "notifications_related_task_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."notifications" DROP CONSTRAINT "notifications_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."organization_members" DROP CONSTRAINT "organization_members_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."organization_members" DROP CONSTRAINT "organization_members_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."organizations" DROP CONSTRAINT "organizations_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."task_attachments" DROP CONSTRAINT "task_attachments_task_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."task_attachments" DROP CONSTRAINT "task_attachments_uploaded_by_fkey";

-- DropForeignKey
ALTER TABLE "public"."task_comments" DROP CONSTRAINT "task_comments_task_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."task_comments" DROP CONSTRAINT "task_comments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tasks" DROP CONSTRAINT "tasks_assigned_to_fkey";

-- DropForeignKey
ALTER TABLE "public"."tasks" DROP CONSTRAINT "tasks_created_by_fkey";

-- DropForeignKey
ALTER TABLE "public"."tasks" DROP CONSTRAINT "tasks_list_id_fkey";

-- DropTable
DROP TABLE "public"."activity_logs";

-- DropTable
DROP TABLE "public"."board_members";

-- DropTable
DROP TABLE "public"."boards";

-- DropTable
DROP TABLE "public"."lists";

-- DropTable
DROP TABLE "public"."notifications";

-- DropTable
DROP TABLE "public"."organization_members";

-- DropTable
DROP TABLE "public"."organizations";

-- DropTable
DROP TABLE "public"."task_attachments";

-- DropTable
DROP TABLE "public"."task_comments";

-- DropTable
DROP TABLE "public"."tasks";

-- DropTable
DROP TABLE "public"."users";

-- DropEnum
DROP TYPE "public"."OrgRole";

-- DropEnum
DROP TYPE "public"."TaskPriority";

-- DropEnum
DROP TYPE "public"."TaskStatus";

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "avatarUrl" TEXT,
    "googleId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Board" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BoardMember" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BoardMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Column" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Column_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "columnId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "dueDate" TIMESTAMP(3),
    "createdById" TEXT NOT NULL,
    "assigneeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "public"."User"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "BoardMember_userId_boardId_key" ON "public"."BoardMember"("userId", "boardId");

-- CreateIndex
CREATE UNIQUE INDEX "Column_boardId_position_key" ON "public"."Column"("boardId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Task_columnId_position_key" ON "public"."Task"("columnId", "position");

-- AddForeignKey
ALTER TABLE "public"."Board" ADD CONSTRAINT "Board_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BoardMember" ADD CONSTRAINT "BoardMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BoardMember" ADD CONSTRAINT "BoardMember_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "public"."Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Column" ADD CONSTRAINT "Column_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "public"."Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "public"."Column"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "public"."Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
