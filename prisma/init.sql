CREATE TABLE IF NOT EXISTS "AppUser" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "username" TEXT NOT NULL UNIQUE,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "nonlocked" BOOLEAN NOT NULL,
    "enabled" BOOLEAN NOT NULL,
    "last_time_password_updated" DATETIME NOT NULL DEFAULT '1970-01-01 00:00:00 +00:00',
    "password_never_expires" BOOLEAN NOT NULL DEFAULT false,
    "cannot_change_password" BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS "Role" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL UNIQUE,
    "description" TEXT NOT NULL,
    "is_disabled" BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS "AppUserRole" (
    "appuser_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    PRIMARY KEY ("appuser_id", "role_id"),
    FOREIGN KEY ("appuser_id") REFERENCES "AppUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY ("role_id") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "UserPhone" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "phone_country_id" INT NOT NULL,
    "phone" TEXT NOT NULL UNIQUE,
    "order_index" INT NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES "AppUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
