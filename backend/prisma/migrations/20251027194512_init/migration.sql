-- CreateTable
CREATE TABLE "artist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "surname" TEXT,
    "genre" TEXT,
    "contact_info" TEXT,
    "available_date" TEXT,
    "event_id" INTEGER NOT NULL,
    CONSTRAINT "artist_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "forecast" TEXT DEFAULT 'Sunny',
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    "event_status" TEXT NOT NULL DEFAULT 'PLANNING',
    "budget" DECIMAL
);

-- CreateTable
CREATE TABLE "resource" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "rented_equipment" BOOLEAN NOT NULL DEFAULT false,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "event_id" INTEGER NOT NULL,
    CONSTRAINT "resource_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "roles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "staff" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "username" TEXT,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phone" TEXT,
    "email" TEXT,
    "role_id" INTEGER NOT NULL,
    CONSTRAINT "staff_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE INDEX "roles_name_idx" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "staff_username_key" ON "staff"("username");

-- CreateIndex
CREATE UNIQUE INDEX "staff_email_key" ON "staff"("email");
