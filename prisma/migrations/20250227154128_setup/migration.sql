-- CreateTable
CREATE TABLE `consumers` (
    `id` VARCHAR(191) NOT NULL,
    `consumptionForaPontaEmKWH` INTEGER NOT NULL,
    `monthOfConsumption` DATETIME(3) NOT NULL,
    `unitId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `units` (
    `id` VARCHAR(191) NOT NULL,
    `codeOfConsumerUnit` VARCHAR(191) NOT NULL,
    `modelPhasic` ENUM('monofasico', 'bifasico', 'trifasico') NOT NULL,
    `framing` ENUM('AX', 'B1', 'B2', 'B3') NOT NULL,
    `leadId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `units_codeOfConsumerUnit_key`(`codeOfConsumerUnit`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `leads` (
    `id` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `leads_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `consumers` ADD CONSTRAINT `consumers_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `units`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `units` ADD CONSTRAINT `units_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `leads`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
