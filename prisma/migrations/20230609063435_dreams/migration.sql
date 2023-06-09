-- CreateTable
CREATE TABLE "Module" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Uri" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Functions" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Uri" TEXT NOT NULL,
    "ModuleUri" TEXT NOT NULL,
    CONSTRAINT "Functions_ModuleUri_fkey" FOREIGN KEY ("ModuleUri") REFERENCES "Module" ("Uri") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Scenario" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "FuncName" TEXT NOT NULL,
    "OldRawLogs" TEXT,
    "NewRawLogs" TEXT,
    "Comment" TEXT,
    "FuncId" INTEGER NOT NULL,
    "CreateAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Scenario_FuncId_fkey" FOREIGN KEY ("FuncId") REFERENCES "Functions" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ApiMessage" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FuncName" TEXT NOT NULL,
    "ApiName" TEXT NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "Module_Id_key" ON "Module"("Id");

-- CreateIndex
CREATE UNIQUE INDEX "Module_Uri_key" ON "Module"("Uri");

-- CreateIndex
CREATE UNIQUE INDEX "Functions_Id_key" ON "Functions"("Id");

-- CreateIndex
CREATE UNIQUE INDEX "Scenario_Id_key" ON "Scenario"("Id");

-- CreateIndex
CREATE UNIQUE INDEX "ApiMessage_Id_key" ON "ApiMessage"("Id");
