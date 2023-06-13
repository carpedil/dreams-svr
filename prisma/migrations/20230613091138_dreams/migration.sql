/*
  Warnings:

  - Added the required column `No` to the `Scenario` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Scenario" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "No" INTEGER NOT NULL,
    "FuncName" TEXT NOT NULL,
    "OldRawLogs" TEXT,
    "NewRawLogs" TEXT,
    "Comment" TEXT,
    "FuncId" INTEGER NOT NULL,
    "CreateAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Scenario_FuncId_fkey" FOREIGN KEY ("FuncId") REFERENCES "Functions" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Scenario" ("Comment", "CreateAt", "FuncId", "FuncName", "Id", "Name", "NewRawLogs", "OldRawLogs", "UpdatedAt") SELECT "Comment", "CreateAt", "FuncId", "FuncName", "Id", "Name", "NewRawLogs", "OldRawLogs", "UpdatedAt" FROM "Scenario";
DROP TABLE "Scenario";
ALTER TABLE "new_Scenario" RENAME TO "Scenario";
CREATE UNIQUE INDEX "Scenario_Id_key" ON "Scenario"("Id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
