-- CreateTable
CREATE TABLE "AppUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "username" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nonlocked" BOOLEAN NOT NULL,
    "enabled" BOOLEAN NOT NULL,
    "last_time_password_updated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "password_never_expires" BOOLEAN NOT NULL DEFAULT false,
    "cannot_change_password" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_disabled" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "AppUserRole" (
    "appuser_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,

    PRIMARY KEY ("appuser_id", "role_id"),
    CONSTRAINT "AppUserRole_appuser_id_fkey" FOREIGN KEY ("appuser_id") REFERENCES "AppUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AppUserRole_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserPhone" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "phone_country_id" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "order_index" INTEGER NOT NULL,
    CONSTRAINT "UserPhone_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "AppUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "AppUser_username_key" ON "AppUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "AppUser_email_key" ON "AppUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserPhone_phone_key" ON "UserPhone"("phone");
