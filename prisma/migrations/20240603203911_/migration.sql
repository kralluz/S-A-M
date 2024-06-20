/*
  Warnings:

  - Added the required column `messageType` to the `Send` table without a default value. This is not possible if the table is not empty.
  - Added the required column `messageType` to the `Received` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Send" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "to" TEXT NOT NULL,
    "sentDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "messageBody" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "messagingProduct" TEXT NOT NULL,
    "reply_to_id" TEXT,
    "messageType" TEXT NOT NULL
);
INSERT INTO "new_Send" ("id", "messageBody", "messagingProduct", "reply_to_id", "sentDate", "status", "to") SELECT "id", "messageBody", "messagingProduct", "reply_to_id", "sentDate", "status", "to" FROM "Send";
DROP TABLE "Send";
ALTER TABLE "new_Send" RENAME TO "Send";
CREATE TABLE "new_Received" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "from" TEXT NOT NULL,
    "receivedDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "messageBody" TEXT NOT NULL,
    "contactName" TEXT,
    "phoneNumberId" TEXT NOT NULL,
    "reply_to_id" TEXT,
    "messageType" TEXT NOT NULL
);
INSERT INTO "new_Received" ("contactName", "from", "id", "messageBody", "phoneNumberId", "receivedDate", "reply_to_id") SELECT "contactName", "from", "id", "messageBody", "phoneNumberId", "receivedDate", "reply_to_id" FROM "Received";
DROP TABLE "Received";
ALTER TABLE "new_Received" RENAME TO "Received";
PRAGMA foreign_key_check("Send");
PRAGMA foreign_key_check("Received");
PRAGMA foreign_keys=ON;
