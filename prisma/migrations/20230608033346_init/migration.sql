/*
  Warnings:

  - Added the required column `Platform` to the `ApiMessage` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ApiMessage" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FuncName" TEXT NOT NULL,
    "Platform" TEXT NOT NULL,
    "HDR" TEXT NOT NULL,
    "Sendto" TEXT,
    "Received" TEXT,
    "SendParams" TEXT,
    "ReceivedParams" TEXT,
    "Comment" TEXT,
    "ScenarioId" INTEGER NOT NULL,
    "CreateAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ApiMessage_ScenarioId_fkey" FOREIGN KEY ("ScenarioId") REFERENCES "Scenario" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ApiMessage" ("Comment", "CreateAt", "FuncName", "HDR", "Id", "Received", "ReceivedParams", "ScenarioId", "SendParams", "Sendto", "UpdatedAt") SELECT "Comment", "CreateAt", "FuncName", "HDR", "Id", "Received", "ReceivedParams", "ScenarioId", "SendParams", "Sendto", "UpdatedAt" FROM "ApiMessage";
DROP TABLE "ApiMessage";
ALTER TABLE "new_ApiMessage" RENAME TO "ApiMessage";
CREATE UNIQUE INDEX "ApiMessage_Id_key" ON "ApiMessage"("Id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
