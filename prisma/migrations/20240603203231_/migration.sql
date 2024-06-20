-- CreateTable
CREATE TABLE "Received" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "from" TEXT NOT NULL,
    "receivedDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "messageBody" TEXT NOT NULL,
    "contactName" TEXT,
    "phoneNumberId" TEXT NOT NULL,
    "reply_to_id" TEXT
);

-- CreateTable
CREATE TABLE "Send" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "to" TEXT NOT NULL,
    "sentDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "messageBody" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "messagingProduct" TEXT NOT NULL,
    "reply_to_id" TEXT
);
