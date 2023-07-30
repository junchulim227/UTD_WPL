-- DropForeignKey
ALTER TABLE `Doctor` DROP FOREIGN KEY `Doctor_Doctor_SSN_fkey`;

-- DropForeignKey
ALTER TABLE `Has_Appointment` DROP FOREIGN KEY `Has_Appointment_Doctor_ID_fkey`;

-- DropForeignKey
ALTER TABLE `Has_Appointment` DROP FOREIGN KEY `Has_Appointment_Patient_ID_fkey`;

-- DropForeignKey
ALTER TABLE `Has_Disease` DROP FOREIGN KEY `Has_Disease_Disease_ID_fkey`;

-- DropForeignKey
ALTER TABLE `Has_Disease` DROP FOREIGN KEY `Has_Disease_Patient_ID_fkey`;

-- DropForeignKey
ALTER TABLE `Is_In` DROP FOREIGN KEY `Is_In_Patient_ID_fkey`;

-- DropForeignKey
ALTER TABLE `Is_In` DROP FOREIGN KEY `Is_In_RoomNumber_fkey`;

-- DropForeignKey
ALTER TABLE `Medicine` DROP FOREIGN KEY `Medicine_ID_fkey`;

-- DropForeignKey
ALTER TABLE `Patient` DROP FOREIGN KEY `Patient_ID_fkey`;

-- DropForeignKey
ALTER TABLE `Staff` DROP FOREIGN KEY `Staff_SSN_fkey`;

-- DropForeignKey
ALTER TABLE `Test` DROP FOREIGN KEY `Test_Disease_ID_fkey`;

-- DropForeignKey
ALTER TABLE `Test` DROP FOREIGN KEY `Test_Patient_ID_fkey`;

-- AddForeignKey
ALTER TABLE `Patient` ADD CONSTRAINT `Patient_ID_fkey` FOREIGN KEY (`ID`) REFERENCES `Person`(`Person_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Medicine` ADD CONSTRAINT `Medicine_ID_fkey` FOREIGN KEY (`ID`) REFERENCES `Patient`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Staff` ADD CONSTRAINT `Staff_SSN_fkey` FOREIGN KEY (`SSN`) REFERENCES `Person`(`Person_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Doctor` ADD CONSTRAINT `Doctor_Doctor_SSN_fkey` FOREIGN KEY (`Doctor_SSN`) REFERENCES `Staff`(`SSN`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Has_Appointment` ADD CONSTRAINT `Has_Appointment_Patient_ID_fkey` FOREIGN KEY (`Patient_ID`) REFERENCES `Patient`(`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Has_Appointment` ADD CONSTRAINT `Has_Appointment_Doctor_ID_fkey` FOREIGN KEY (`Doctor_ID`) REFERENCES `Doctor`(`Doctor_SSN`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Has_Disease` ADD CONSTRAINT `Has_Disease_Patient_ID_fkey` FOREIGN KEY (`Patient_ID`) REFERENCES `Patient`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Has_Disease` ADD CONSTRAINT `Has_Disease_Disease_ID_fkey` FOREIGN KEY (`Disease_ID`) REFERENCES `Disease`(`Disease_ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Test` ADD CONSTRAINT `Test_Disease_ID_fkey` FOREIGN KEY (`Disease_ID`) REFERENCES `Disease`(`Disease_ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Test` ADD CONSTRAINT `Test_Patient_ID_fkey` FOREIGN KEY (`Patient_ID`) REFERENCES `Patient`(`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Is_In` ADD CONSTRAINT `Is_In_RoomNumber_fkey` FOREIGN KEY (`RoomNumber`) REFERENCES `Room`(`RoomNumber`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Is_In` ADD CONSTRAINT `Is_In_Patient_ID_fkey` FOREIGN KEY (`Patient_ID`) REFERENCES `Patient`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
