-- CreateTable
CREATE TABLE `Person` (
    `Person_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Address` VARCHAR(191) NOT NULL,
    `Birth_Date` DATETIME(3) NOT NULL,
    `Name` VARCHAR(255) NOT NULL,
    `Sex` VARCHAR(1) NOT NULL,
    `Email_Addr` VARCHAR(191) NOT NULL,
    `Phone_Number` INTEGER NOT NULL,

    UNIQUE INDEX `Person_Email_Addr_key`(`Email_Addr`),
    PRIMARY KEY (`Person_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Patient` (
    `ID` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medicine` (
    `ID` INTEGER NOT NULL,
    `Medicine` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Insurance` (
    `Member_ID` INTEGER NOT NULL,
    `Insurance_Provider` VARCHAR(191) NULL,
    `Group_Number` INTEGER NULL,
    `Policy_Holder` INTEGER NOT NULL,

    PRIMARY KEY (`Member_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Staff` (
    `SSN` INTEGER NOT NULL,
    `Salary` INTEGER NOT NULL,
    `Department_ID` INTEGER NOT NULL,

    PRIMARY KEY (`SSN`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Doctor` (
    `Doctor_SSN` INTEGER NOT NULL,

    PRIMARY KEY (`Doctor_SSN`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Department` (
    `Department_Number` INTEGER NOT NULL AUTO_INCREMENT,
    `Department_Name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Department_Department_Name_key`(`Department_Name`),
    PRIMARY KEY (`Department_Number`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Has_Appointment` (
    `Appointment_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Patient_ID` INTEGER NOT NULL,
    `Doctor_ID` INTEGER NOT NULL,
    `DateTime` DATETIME(3) NOT NULL,

    PRIMARY KEY (`Appointment_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Disease` (
    `Disease_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Disease_Name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Disease_Disease_Name_key`(`Disease_Name`),
    PRIMARY KEY (`Disease_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Has_Disease` (
    `Patient_ID` INTEGER NOT NULL,
    `Disease_ID` INTEGER NOT NULL,

    PRIMARY KEY (`Patient_ID`, `Disease_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Test` (
    `Disease_ID` INTEGER NOT NULL,
    `Patient_ID` INTEGER NOT NULL,
    `Test_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Test_Results` VARCHAR(255) NOT NULL,
    `Test_Name` VARCHAR(255) NOT NULL,
    `Date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`Test_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room` (
    `RoomNumber` INTEGER NOT NULL,
    `Type` VARCHAR(191) NOT NULL,
    `Beds` INTEGER NOT NULL,

    PRIMARY KEY (`RoomNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Is_In` (
    `RoomNumber` INTEGER NOT NULL,
    `Patient_ID` INTEGER NOT NULL,

    PRIMARY KEY (`RoomNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Patient` ADD CONSTRAINT `Patient_ID_fkey` FOREIGN KEY (`ID`) REFERENCES `Person`(`Person_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Medicine` ADD CONSTRAINT `Medicine_ID_fkey` FOREIGN KEY (`ID`) REFERENCES `Patient`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Insurance` ADD CONSTRAINT `Insurance_Member_ID_fkey` FOREIGN KEY (`Member_ID`) REFERENCES `Patient`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Insurance` ADD CONSTRAINT `Insurance_Policy_Holder_fkey` FOREIGN KEY (`Policy_Holder`) REFERENCES `Person`(`Person_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Staff` ADD CONSTRAINT `Staff_SSN_fkey` FOREIGN KEY (`SSN`) REFERENCES `Person`(`Person_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Staff` ADD CONSTRAINT `Staff_Department_ID_fkey` FOREIGN KEY (`Department_ID`) REFERENCES `Department`(`Department_Number`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Doctor` ADD CONSTRAINT `Doctor_Doctor_SSN_fkey` FOREIGN KEY (`Doctor_SSN`) REFERENCES `Staff`(`SSN`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Has_Appointment` ADD CONSTRAINT `Has_Appointment_Patient_ID_fkey` FOREIGN KEY (`Patient_ID`) REFERENCES `Patient`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Has_Appointment` ADD CONSTRAINT `Has_Appointment_Doctor_ID_fkey` FOREIGN KEY (`Doctor_ID`) REFERENCES `Doctor`(`Doctor_SSN`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Has_Disease` ADD CONSTRAINT `Has_Disease_Patient_ID_fkey` FOREIGN KEY (`Patient_ID`) REFERENCES `Patient`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Has_Disease` ADD CONSTRAINT `Has_Disease_Disease_ID_fkey` FOREIGN KEY (`Disease_ID`) REFERENCES `Disease`(`Disease_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Test` ADD CONSTRAINT `Test_Disease_ID_fkey` FOREIGN KEY (`Disease_ID`) REFERENCES `Disease`(`Disease_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Test` ADD CONSTRAINT `Test_Patient_ID_fkey` FOREIGN KEY (`Patient_ID`) REFERENCES `Patient`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Is_In` ADD CONSTRAINT `Is_In_RoomNumber_fkey` FOREIGN KEY (`RoomNumber`) REFERENCES `Room`(`RoomNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Is_In` ADD CONSTRAINT `Is_In_Patient_ID_fkey` FOREIGN KEY (`Patient_ID`) REFERENCES `Patient`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
