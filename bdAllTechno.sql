-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema alltechno
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `alltechno` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;

USE `alltechno` ;

-- -----------------------------------------------------
-- Table `alltechno`.`recursos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alltechno`.`recursos` (
  `id_recurso` INT NOT NULL AUTO_INCREMENT,
  `url1` VARCHAR(500) NULL,
  `url2` VARCHAR(500) NULL,
  `url3` VARCHAR(500) NULL,
  `url4` VARCHAR(500) NULL,
  `url5` VARCHAR(500) NULL,
  `url6` VARCHAR(500) NULL,
  PRIMARY KEY (`id_recurso`),
  UNIQUE INDEX `url1_UNIQUE` (`url1` ASC),
  UNIQUE INDEX `url2_UNIQUE` (`url2` ASC),
  UNIQUE INDEX `url3_UNIQUE` (`url3` ASC),
  UNIQUE INDEX `url4_UNIQUE` (`url4` ASC),
  UNIQUE INDEX `recursoscol_UNIQUE` (`url5` ASC),
  UNIQUE INDEX `url6_UNIQUE` (`url6` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `alltechno`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alltechno`.`usuario` (
  `identificacion` VARCHAR(11) NOT NULL,
  `nombres` VARCHAR(100) NOT NULL,
  `apellidos` VARCHAR(100) NOT NULL,
  `correo` VARCHAR(50) NOT NULL,
  `celular` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`identificacion`))
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `alltechno`.`celulares`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alltechno`.`celulares` (
  `id` BINARY(16) NOT NULL,
  `marca` VARCHAR(100) NOT NULL,
  `modelo` VARCHAR(100) NOT NULL,
  `bateria` INT NOT NULL,
  `procesador` VARCHAR(100) NOT NULL,
  `camaraFrontal` INT NOT NULL,
  `camaraPosterior` INT NOT NULL,
  `resolucion` VARCHAR(20) NOT NULL,
  `huella` VARCHAR(100) NOT NULL DEFAULT 'NO',
  `almacenamiento` INT NOT NULL,
  `ram` INT NOT NULL,
  `precio` DOUBLE NOT NULL,
  `colores` VARCHAR(100) NOT NULL,
  `recursos_id_recurso` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_celulares_recursos1_idx` (`recursos_id_recurso` ASC),
  CONSTRAINT `fk_celulares_recursos1`
    FOREIGN KEY (`recursos_id_recurso`)
    REFERENCES `alltechno`.`recursos` (`id_recurso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `alltechno`.`fuentesdepoder`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alltechno`.`fuentesdepoder` (
  `id` BINARY(16) NOT NULL,
  `marca` VARCHAR(100) NOT NULL,
  `voltaje` INT NOT NULL,
  `potencia` INT NOT NULL,
  `certificacion` VARCHAR(50) NOT NULL,
  `precio` DOUBLE NOT NULL,
  `recursos_id_recurso` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_fuentesdepoder_recursos1_idx` (`recursos_id_recurso` ASC),
  CONSTRAINT `fk_fuentesdepoder_recursos1`
    FOREIGN KEY (`recursos_id_recurso`)
    REFERENCES `alltechno`.`recursos` (`id_recurso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `alltechno`.`pantallas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alltechno`.`pantallas` (
  `id` BINARY(16) NOT NULL,
  `marca` VARCHAR(100) NOT NULL,
  `referencia` VARCHAR(100) NOT NULL,
  `dimensiones` VARCHAR(100) NOT NULL,
  `pulgadas` INT NOT NULL,
  `resolucion` VARCHAR(50) NOT NULL,
  `tipo` VARCHAR(50) NOT NULL,
  `precio` DOUBLE NOT NULL,
  `recursos_id_recurso` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_pantallas_recursos1_idx` (`recursos_id_recurso` ASC),
  CONSTRAINT `fk_pantallas_recursos1`
    FOREIGN KEY (`recursos_id_recurso`)
    REFERENCES `alltechno`.`recursos` (`id_recurso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `alltechno`.`portatiles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alltechno`.`portatiles` (
  `id` BINARY(16) NOT NULL,
  `marca` VARCHAR(100) NOT NULL,
  `modelo` VARCHAR(100) NOT NULL,
  `procesador` VARCHAR(100) NOT NULL,
  `grafica` VARCHAR(100) NOT NULL DEFAULT 'Graficos Integrados',
  `resolucion` VARCHAR(20) NOT NULL,
  `tamañoPantalla` INT NOT NULL,
  `almacenamiento` INT NOT NULL,
  `ram` INT NOT NULL,
  `precio` DOUBLE NOT NULL,
  `colores` VARCHAR(100) NOT NULL,
  `recursos_id_recurso` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_portatiles_recursos2_idx` (`recursos_id_recurso` ASC),
  CONSTRAINT `fk_portatiles_recursos2`
    FOREIGN KEY (`recursos_id_recurso`)
    REFERENCES `alltechno`.`recursos` (`id_recurso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `alltechno`.`procesadores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alltechno`.`procesadores` (
  `id` BINARY(16) NOT NULL,
  `marca` VARCHAR(100) NOT NULL,
  `serie` VARCHAR(100) NOT NULL,
  `numNucleos` INT NOT NULL,
  `numHilos` INT NOT NULL,
  `relojBase` VARCHAR(100) NOT NULL,
  `precio` DOUBLE NOT NULL,
  `recursos_id_recurso` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_procesadores_recursos1_idx` (`recursos_id_recurso` ASC),
  CONSTRAINT `fk_procesadores_recursos1`
    FOREIGN KEY (`recursos_id_recurso`)
    REFERENCES `alltechno`.`recursos` (`id_recurso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `alltechno`.`ram`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alltechno`.`ram` (
  `id` BINARY(16) NOT NULL,
  `marca` VARCHAR(100) NOT NULL,
  `serie` VARCHAR(100) NOT NULL,
  `modelo` VARCHAR(100) NOT NULL,
  `capacidad` INT NOT NULL,
  `velocidad` INT NOT NULL,
  `tipo` VARCHAR(50) NOT NULL,
  `led` VARCHAR(50) NOT NULL,
  `precio` DOUBLE NOT NULL,
  `recursos_id_recurso` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_ram_recursos1_idx` (`recursos_id_recurso` ASC),
  CONSTRAINT `fk_ram_recursos1`
    FOREIGN KEY (`recursos_id_recurso`)
    REFERENCES `alltechno`.`recursos` (`id_recurso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `alltechno`.`torreescritorio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alltechno`.`torreescritorio` (
  `id` BINARY(16) NOT NULL,
  `procesador` VARCHAR(100) NOT NULL,
  `grafica` VARCHAR(100) NOT NULL DEFAULT 'Graficos Integrados',
  `ram` VARCHAR(100) NOT NULL,
  `almacenamiento` VARCHAR(100) NOT NULL,
  `board` VARCHAR(100) NOT NULL,
  `chasis` VARCHAR(100) NOT NULL,
  `fuente` VARCHAR(100) NOT NULL,
  `refrigeracion` VARCHAR(100) NOT NULL DEFAULT 'Refrigeracion de stock',
  `precio` DOUBLE NOT NULL,
  `recursos_id_recurso` INT,
  PRIMARY KEY (`id`),
  INDEX `fk_torreescritorio_recursos1_idx` (`recursos_id_recurso` ASC),
  CONSTRAINT `fk_torreescritorio_recursos1`
    FOREIGN KEY (`recursos_id_recurso`)
    REFERENCES `alltechno`.`recursos` (`id_recurso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


INSERT INTO celulares (id, marca, modelo, bateria, procesador, camaraFrontal, camaraPosterior, resolucion, huella, almacenamiento, ram, precio, colores) VALUES
(UUID_TO_BIN(UUID()), 'Samsung', 'Galaxy S21', 4000, 'Exynos 2100', 32, 108, '1080 x 2400 pixels', 'En pantalla', 128, 8, 3800000, 'Negro, Gris, Azul'),
(UUID_TO_BIN(UUID()), 'Apple', 'iPhone 13', 3095, 'Apple A15 Bionic', 12, 12, '1170 x 2532 pixels', 'En pantalla', 256, 6, 4800000, 'Gris, Blanco, Plateado'),
(UUID_TO_BIN(UUID()), 'Xiaomi', 'Redmi Note 10', 5000, 'Snapdragon 678', 13, 48, '1080 x 2400 pixels', 'En panel lateral', 128, 4, 1200000, 'Azul, Blanco'),
(UUID_TO_BIN(UUID()), 'Motorola', 'Moto G Power', 5000, 'Snapdragon 662', 16, 48, '1080 x 2300 pixels', 'En panel lateral', 64, 4, 900000, 'Negro, Verde'),
(UUID_TO_BIN(UUID()), 'OnePlus', 'Nord N200', 5000, 'Snapdragon 480', 16, 13, '720 x 1600 pixels', 'En pantalla', 64, 4, 1100000, 'Gris, Plateado'),
(UUID_TO_BIN(UUID()), 'Realme', '8i', 5000, 'MediaTek Helio G96', 16, 50, '1080 x 2400 pixels', 'En panel lateral', 128, 4, 1300000, 'Azul, Negro'),
(UUID_TO_BIN(UUID()), 'Samsung', 'Galaxy A32', 5000, 'Mediatek Helio G80', 20, 64, '720 x 1600 pixels', 'En pantalla', 128, 4, 1300000, 'Negro, Blanco'),
(UUID_TO_BIN(UUID()), 'Xiaomi', 'Mi 11 Lite', 4250, 'Snapdragon 732G', 16, 64, '1080 x 2400 pixels', 'En pantalla', 128, 6, 1600000, 'Gris, Verde'),
(UUID_TO_BIN(UUID()), 'Apple', 'iPhone SE', 1821, 'Apple A13 Bionic', 7, 12, '750 x 1334 pixels', 'En pantalla', 64, 3, 2200000, 'Azul, Rojo'),
(UUID_TO_BIN(UUID()), 'Motorola', 'Moto E7i Power', 5000, 'MediaTek Helio G25', 5, 13, '720 x 1600 pixels', 'En panel lateral', 32, 2, 600000, 'Negro, Azul'),
(UUID_TO_BIN(UUID()), 'OnePlus', '9 Pro', 4500, 'Snapdragon 888', 16, 48, '1440 x 3216 pixels', 'En pantalla', 256, 12, 5800000, 'Gris, Negro'),
(UUID_TO_BIN(UUID()), 'Realme', 'Narzo 50A', 6000, 'MediaTek Helio G85', 8, 50, '720 x 1600 pixels', 'En panel lateral', 64, 4, 900000, 'Azul, Amarillo'),
(UUID_TO_BIN(UUID()), 'Samsung', 'Galaxy A03s', 5000, 'Mediatek MT6739W', 5, 13, '720 x 1600 pixels', 'En pantalla', 32, 3, 600000, 'Negro, Blanco'),
(UUID_TO_BIN(UUID()), 'Xiaomi', 'Redmi 10', 5000, 'MediaTek Helio G88', 8, 50, '1080 x 2400 pixels', 'En pantalla', 128, 4, 1400000, 'Gris, Plateado'),
(UUID_TO_BIN(UUID()), 'Apple', 'iPhone 12 Mini', 2227, 'Apple A14 Bionic', 12, 12, '1080 x 2340 pixels', 'En pantalla', 256, 4, 3800000, 'Azul, Negro'),
(UUID_TO_BIN(UUID()), 'Motorola', 'Moto G60', 6000, 'Snapdragon 732G', 32, 108, '1080 x 2460 pixels', 'En panel lateral', 128, 6, 1700000, 'Negro, Rojo'),
(UUID_TO_BIN(UUID()), 'OnePlus', 'Nord 2', 4500, 'MediaTek Dimensity 1200-AI', 32, 50, '1080 x 2400 pixels', 'En pantalla', 256, 12, 3500000, 'Gris, Verde'),
(UUID_TO_BIN(UUID()), 'Realme', 'C25s', 6000, 'MediaTek Helio G85', 8, 48, '720 x 1600 pixels', 'En panel lateral', 128, 4, 1000000, 'Azul, Gris'),
(UUID_TO_BIN(UUID()), 'Samsung', 'Galaxy M32', 6000, 'Mediatek Helio G80', 20, 64, '1080 x 2400 pixels', 'En pantalla', 128, 6, 1500000, 'Negro, Verde'),
(UUID_TO_BIN(UUID()), 'Xiaomi', 'Poco X3 Pro', 5160, 'Snapdragon 860', 20, 48, '1080 x 2400 pixels', 'En pantalla', 256, 8, 1900000, 'Gris, Azul');


INSERT INTO portatiles (id, marca, modelo, procesador, grafica, resolucion, tamañoPantalla, almacenamiento, ram, precio, colores) VALUES
(UUID_TO_BIN(UUID()), 'HP', 'Pavilion 15', 'Intel Core i5-1135G7', 'Intel Iris Xe Graphics', '1920 x 1080 pixels', 15, 512, 8, 3300000, 'Plateado, Negro'),
(UUID_TO_BIN(UUID()), 'Lenovo', 'IdeaPad 3', 'AMD Ryzen 5 5500U', 'AMD Radeon Graphics', '1920 x 1080 pixels', 15, 256, 8, 2500000, 'Gris, Azul'),
(UUID_TO_BIN(UUID()), 'Dell', 'Inspiron 14 3000', 'Intel Core i3-1115G4', 'Intel UHD Graphics', '1366 x 768 pixels', 14, 128, 4, 1800000, 'Negro'),
(UUID_TO_BIN(UUID()), 'Acer', 'Aspire 5', 'Intel Core i5-1135G7', 'Intel Iris Xe Graphics', '1920 x 1080 pixels', 15, 512, 8, 2800000, 'Gris, Plateado'),
(UUID_TO_BIN(UUID()), 'ASUS', 'VivoBook 15', 'Intel Core i3-1115G4', 'Intel UHD Graphics', '1920 x 1080 pixels', 15, 256, 8, 2200000, 'Azul, Blanco'),
(UUID_TO_BIN(UUID()), 'MSI', 'Modern 14', 'Intel Core i5-1135G7', 'Intel Iris Xe Graphics', '1920 x 1080 pixels', 14, 512, 16, 4000000, 'Gris'),
(UUID_TO_BIN(UUID()), 'LG', 'Gram 14', 'Intel Core i7-1165G7', 'Intel Iris Xe Graphics', '1920 x 1200 pixels', 14, 512, 16, 4600000, 'Negro, Blanco'),
(UUID_TO_BIN(UUID()), 'Razer', 'Blade 15', 'Intel Core i7-11800H', 'NVIDIA GeForce RTX 3060', '1920 x 1080 pixels', 15, 512, 16, 6900000, 'Negro, Verde'),
(UUID_TO_BIN(UUID()), 'Microsoft', 'Surface Laptop 4', 'AMD Ryzen 5 4680U', 'AMD Radeon Graphics', '2496 x 1664 pixels', 13, 256, 8, 5000000, 'Plata'),
(UUID_TO_BIN(UUID()), 'Samsung', 'Galaxy Book Pro 360', 'Intel Core i7-1165G7', 'Intel Iris Xe Graphics', '1920 x 1080 pixels', 15, 512, 16, 5600000, 'Negro, Plata'),
(UUID_TO_BIN(UUID()), 'Apple', 'MacBook Air', 'Apple M1', 'Apple M1', '2560 x 1600 pixels', 13, 256, 8, 5500000, 'Plateado, Gris'),
(UUID_TO_BIN(UUID()), 'Lenovo', 'ThinkPad X1 Carbon Gen 9', 'Intel Core i7-1165G7', 'Intel Iris Xe Graphics', '1920 x 1200 pixels', 14, 512, 16, 7800000, 'Negro'),
(UUID_TO_BIN(UUID()), 'HP', 'Elite Dragonfly', 'Intel Core i5-1135G7', 'Intel Iris Xe Graphics', '1920 x 1080 pixels', 13, 256, 16, 6900000, 'Azul, Plateado'),
(UUID_TO_BIN(UUID()), 'Dell', 'XPS 13', 'Intel Core i7-1165G7', 'Intel Iris Xe Graphics', '3840 x 2400 pixels', 13, 512, 16, 8500000, 'Blanco'),
(UUID_TO_BIN(UUID()), 'ASUS', 'ZenBook Duo', 'Intel Core i7-1165G7', 'NVIDIA GeForce MX450', '1920 x 1080 pixels', 14, 512, 16, 8700000, 'Azul, Negro'),
(UUID_TO_BIN(UUID()), 'Acer', 'Swift 5', 'Intel Core i7-1165G7', 'Intel Iris Xe Graphics', '1920 x 1080 pixels', 14, 512, 16, 7200000, 'Oro, Negro'),
(UUID_TO_BIN(UUID()), 'MSI', 'Prestige 14', 'Intel Core i7-1185G7', 'Intel Iris Xe Graphics', '1920 x 1080 pixels', 14, 512, 16, 7600000, 'Blanco, Plateado'),
(UUID_TO_BIN(UUID()), 'LG', 'UltraGear 17', 'Intel Core i7-11800H', 'NVIDIA GeForce RTX 3080', '2560 x 1600 pixels', 17, 512, 32, 13500000, 'Negro, Azul'),
(UUID_TO_BIN(UUID()), 'Razer', 'Blade Stealth 13', 'Intel Core i7-1165G7', 'NVIDIA GeForce GTX 1650 Ti', '1920 x 1080 pixels', 13, 512, 16, 9500000, 'Negro, Verde'),
(UUID_TO_BIN(UUID()), 'Microsoft', 'Surface Laptop Go', 'Intel Core i5-1035G1', 'Intel UHD Graphics', '1536 x 1024 pixels', 12, 256, 8, 4300000, 'Plata, Azul'),
(UUID_TO_BIN(UUID()), 'Samsung', 'Galaxy Book Flex 2', 'Intel Core i7-1165G7', 'Intel Iris Xe Graphics', '1920 x 1080 pixels', 15, 512, 16, 6200000, 'Negro, Azul');



INSERT INTO torreEscritorio (id, procesador, grafica, ram, almacenamiento, board, chasis, fuente, refrigeracion, precio) VALUES
(UUID_TO_BIN(UUID()), 'Intel Core i5-10400F', 'NVIDIA GeForce GTX 1650', '16GB DDR4', '512GB NVMe SSD', 'GIGABYTE B460M DS3H', 'NZXT H510', 'EVGA 600W 80+ Bronze', 'Refrigeración por aire', 6800000),
(UUID_TO_BIN(UUID()), 'AMD Ryzen 3 3300X', 'AMD Radeon RX 550', '8GB DDR4', '256GB NVMe SSD', 'ASRock A520M-HDV', 'Phanteks Eclipse P300A', 'Corsair 500W 80+ Bronze', 'Refrigeración por aire', 5000000),
(UUID_TO_BIN(UUID()), 'Intel Core i7-10700', 'NVIDIA GeForce GTX 1660 Ti', '16GB DDR4', '1TB HDD', 'MSI Z490-A PRO', 'Corsair 4000D Airflow', 'EVGA 600W 80+ Bronze', 'Refrigeración por aire', 7500000),
(UUID_TO_BIN(UUID()), 'AMD Ryzen 7 5800X', 'AMD Radeon RX 6700 XT', '32GB DDR4', '1TB NVMe SSD', 'ASUS TUF GAMING B550-PLUS', 'Cooler Master MasterBox TD500 Mesh', 'Corsair 650W 80+ Bronze', 'Refrigeración líquida', 10000000),
(UUID_TO_BIN(UUID()), 'Intel Core i9-10850K', 'NVIDIA GeForce RTX 3070', '32GB DDR4', '1TB NVMe SSD', 'GIGABYTE Z490 AORUS Elite AC', 'NZXT H710i', 'Corsair 750W 80+ Gold', 'Refrigeración por aire', 11000000),
(UUID_TO_BIN(UUID()), 'AMD Ryzen 9 5900X', 'AMD Radeon RX 6800 XT', '64GB DDR4', '2TB NVMe SSD', 'MSI MAG X570 TOMAHAWK WIFI', 'Fractal Design Meshify C', 'Corsair 850W 80+ Platinum', 'Refrigeración líquida', 15000000),
(UUID_TO_BIN(UUID()), 'Intel Core i5-11600KF', 'NVIDIA GeForce RTX 3060 Ti', '16GB DDR4', '512GB NVMe SSD', 'ASRock B560 Steel Legend', 'NZXT H510', 'Corsair 650W 80+ Bronze', 'Refrigeración por aire', 8000000),
(UUID_TO_BIN(UUID()), 'AMD Ryzen 5 5600X', 'AMD Radeon RX 6700', '16GB DDR4', '512GB NVMe SSD', 'ASUS PRIME B550M-A', 'Cooler Master MasterBox MB311L ARGB', 'Corsair 600W 80+ Bronze', 'Refrigeración por aire', 8500000),
(UUID_TO_BIN(UUID()), 'Intel Core i9-10900F', 'NVIDIA GeForce GTX 1660', '32GB DDR4', '1TB NVMe SSD', 'ASUS ROG STRIX Z490-E GAMING', 'NZXT H510 Elite', 'Corsair 750W 80+ Gold', 'Refrigeración líquida', 13000000),
(UUID_TO_BIN(UUID()), 'AMD Ryzen 7 3700X', 'NVIDIA GeForce GTX 1660 SUPER', '16GB DDR4', '512GB NVMe SSD', 'GIGABYTE B550 AORUS ELITE', 'Fractal Design Meshify C', 'EVGA 650W 80+ Bronze', 'Refrigeración por aire', 9000000),
(UUID_TO_BIN(UUID()), 'Intel Core i5-10400F', 'NVIDIA GeForce GTX 1650', '16GB DDR4', '512GB NVMe SSD', 'GIGABYTE B460M DS3H', 'NZXT H510', 'EVGA 600W 80+ Bronze', 'Refrigeración por aire', 6800000),
(UUID_TO_BIN(UUID()), 'AMD Ryzen 3 3300X', 'AMD Radeon RX 550', '8GB DDR4', '256GB NVMe SSD', 'ASRock A520M-HDV', 'Phanteks Eclipse P300A', 'Corsair 500W 80+ Bronze', 'Refrigeración por aire', 5000000),
(UUID_TO_BIN(UUID()), 'Intel Core i7-10700', 'NVIDIA GeForce GTX 1660 Ti', '16GB DDR4', '1TB HDD', 'MSI Z490-A PRO', 'Corsair 4000D Airflow', 'EVGA 600W 80+ Bronze', 'Refrigeración por aire', 7500000),
(UUID_TO_BIN(UUID()), 'AMD Ryzen 7 5800X', 'AMD Radeon RX 6700 XT', '32GB DDR4', '1TB NVMe SSD', 'ASUS TUF GAMING B550-PLUS', 'Cooler Master MasterBox TD500 Mesh', 'Corsair 650W 80+ Bronze', 'Refrigeración líquida', 10000000),
(UUID_TO_BIN(UUID()), 'Intel Core i9-10850K', 'NVIDIA GeForce RTX 3070', '32GB DDR4', '1TB NVMe SSD', 'GIGABYTE Z490 AORUS Elite AC', 'NZXT H710i', 'Corsair 750W 80+ Gold', 'Refrigeración por aire', 11000000),
(UUID_TO_BIN(UUID()), 'AMD Ryzen 9 5900X', 'AMD Radeon RX 6800 XT', '64GB DDR4', '2TB NVMe SSD', 'MSI MAG X570 TOMAHAWK WIFI', 'Fractal Design Meshify C', 'Corsair 850W 80+ Platinum', 'Refrigeración líquida', 15000000),
(UUID_TO_BIN(UUID()), 'Intel Core i5-11600KF', 'NVIDIA GeForce RTX 3060 Ti', '16GB DDR4', '512GB NVMe SSD', 'ASRock B560 Steel Legend', 'NZXT H510', 'Corsair 650W 80+ Bronze', 'Refrigeración por aire', 8000000),
(UUID_TO_BIN(UUID()), 'AMD Ryzen 5 5600X', 'AMD Radeon RX 6700', '16GB DDR4', '512GB NVMe SSD', 'ASUS PRIME B550M-A', 'Cooler Master MasterBox MB311L ARGB', 'Corsair 600W 80+ Bronze', 'Refrigeración por aire', 8500000),
(UUID_TO_BIN(UUID()), 'Intel Core i9-10900F', 'NVIDIA GeForce GTX 1660', '32GB DDR4', '1TB NVMe SSD', 'ASUS ROG STRIX Z490-E GAMING', 'NZXT H510 Elite', 'Corsair 750W 80+ Gold', 'Refrigeración líquida', 13000000),
(UUID_TO_BIN(UUID()), 'AMD Ryzen 7 3700X', 'NVIDIA GeForce GTX 1660 SUPER', '16GB DDR4', '512GB NVMe SSD', 'GIGABYTE B550 AORUS ELITE', 'Fractal Design Meshify C', 'EVGA 650W 80+ Bronze', 'Refrigeración por aire', 9000000);



INSERT INTO procesadores (id, marca, serie, numNucleos, numHilos, relojBase, precio) VALUES
(UUID_TO_BIN(UUID()), 'Intel', 'Core i5', 6, 12, '3.2 GHz', 2000000),
(UUID_TO_BIN(UUID()), 'AMD', 'Ryzen 5', 6, 12, '3.4 GHz', 1800000),
(UUID_TO_BIN(UUID()), 'Intel', 'Core i7', 8, 16, '3.8 GHz', 3000000),
(UUID_TO_BIN(UUID()), 'AMD', 'Ryzen 7', 8, 16, '3.6 GHz', 2500000),
(UUID_TO_BIN(UUID()), 'Intel', 'Core i9', 10, 20, '3.6 GHz', 4000000),
(UUID_TO_BIN(UUID()), 'AMD', 'Ryzen 9', 12, 24, '3.8 GHz', 3500000),
(UUID_TO_BIN(UUID()), 'Intel', 'Core i3', 4, 8, '3.0 GHz', 1500000),
(UUID_TO_BIN(UUID()), 'AMD', 'Ryzen 3', 4, 8, '3.2 GHz', 1200000),
(UUID_TO_BIN(UUID()), 'Intel', 'Pentium Gold', 2, 4, '3.5 GHz', 800000),
(UUID_TO_BIN(UUID()), 'AMD', 'Athlon', 2, 4, '3.1 GHz', 600000),
(UUID_TO_BIN(UUID()), 'Intel', 'Celeron', 2, 2, '2.8 GHz', 500000),
(UUID_TO_BIN(UUID()), 'AMD', 'FX', 8, 8, '3.5 GHz', 700000),
(UUID_TO_BIN(UUID()), 'Intel', 'Xeon', 16, 32, '3.0 GHz', 6000000),
(UUID_TO_BIN(UUID()), 'AMD', 'Threadripper', 32, 64, '3.0 GHz', 8000000),
(UUID_TO_BIN(UUID()), 'Intel', 'Core m3', 2, 4, '2.2 GHz', 1000000),
(UUID_TO_BIN(UUID()), 'AMD', 'A10', 4, 4, '3.2 GHz', 600000),
(UUID_TO_BIN(UUID()), 'Intel', 'Core m5', 2, 4, '1.8 GHz', 1200000),
(UUID_TO_BIN(UUID()), 'AMD', 'A8', 4, 4, '3.0 GHz', 500000),
(UUID_TO_BIN(UUID()), 'Intel', 'Celeron N', 2, 2, '1.1 GHz', 400000),
(UUID_TO_BIN(UUID()), 'AMD', 'A6', 2, 2, '2.6 GHz', 300000);



INSERT INTO ram (id, marca, serie, modelo, capacidad, velocidad, tipo, led, precio) VALUES
(UUID_TO_BIN(UUID()), 'Corsair', 'Vengeance LPX', 'CMK16GX4M1A2400C16', 16, 2400, 'DDR4', 'No', 800000),
(UUID_TO_BIN(UUID()), 'Crucial', 'Ballistix Sport LT', 'BLS8G4D26BFSCK', 8, 2666, 'DDR4', 'No', 500000),
(UUID_TO_BIN(UUID()), 'Kingston', 'HyperX Fury', 'HX426C16FB3/8', 8, 2666, 'DDR4', 'No', 450000),
(UUID_TO_BIN(UUID()), 'G.Skill', 'Ripjaws V Series', 'F4-3200C16S-8GVKB', 8, 3200, 'DDR4', 'No', 480000),
(UUID_TO_BIN(UUID()), 'Corsair', 'Vengeance RGB Pro', 'CMW32GX4M2C3200C16', 32, 3200, 'DDR4', 'RGB', 1200000),
(UUID_TO_BIN(UUID()), 'Crucial', 'Ballistix Elite', 'BLE2K8G4D32AEEA', 16, 3200, 'DDR4', 'No', 1000000),
(UUID_TO_BIN(UUID()), 'Kingston', 'HyperX Predator RGB', 'HX429C15PB3A/16', 16, 2933, 'DDR4', 'RGB', 1100000),
(UUID_TO_BIN(UUID()), 'G.Skill', 'Trident Z RGB', 'F4-3600C18D-16GTZRX', 16, 3600, 'DDR4', 'RGB', 1300000),
(UUID_TO_BIN(UUID()), 'Corsair', 'Dominator Platinum RGB', 'CMT32GX4M2C3200C16', 32, 3200, 'DDR4', 'RGB', 1500000),
(UUID_TO_BIN(UUID()), 'Crucial', 'Ballistix Tactical Tracer RGB', 'BLT8G4D32AET4K', 8, 3200, 'DDR4', 'RGB', 700000),
(UUID_TO_BIN(UUID()), 'Kingston', 'HyperX Fury RGB', 'HX432C16FB3A/8', 8, 3200, 'DDR4', 'RGB', 550000),
(UUID_TO_BIN(UUID()), 'G.Skill', 'Trident Z Neo', 'F4-3600C18D-16GTZN', 16, 3600, 'DDR4', 'No', 1350000),
(UUID_TO_BIN(UUID()), 'Corsair', 'Vengeance LPX', 'CMK32GX4M2D3600C18', 32, 3600, 'DDR4', 'No', 1400000),
(UUID_TO_BIN(UUID()), 'Crucial', 'Ballistix Sport AT', 'BLS2K8G4D30BESBK', 16, 3000, 'DDR4', 'No', 900000),
(UUID_TO_BIN(UUID()), 'Kingston', 'HyperX Impact', 'HX426S15IB2K2/32', 32, 2666, 'DDR4', 'No', 1300000),
(UUID_TO_BIN(UUID()), 'G.Skill', 'Ripjaws 4 Series', 'F4-2400C15S-16GRR', 16, 2400, 'DDR4', 'No', 850000),
(UUID_TO_BIN(UUID()), 'Corsair', 'Vengeance LPX', 'CMK64GX4M2D3600C18', 64, 3600, 'DDR4', 'No', 2800000),
(UUID_TO_BIN(UUID()), 'Crucial', 'Ballistix Sport LT', 'BLS4G4D240FSB', 4, 2400, 'DDR4', 'No', 300000),
(UUID_TO_BIN(UUID()), 'Kingston', 'ValueRAM', 'KVR24N17S8/8', 8, 2400, 'DDR4', 'No', 400000),
(UUID_TO_BIN(UUID()), 'G.Skill', 'Aegis', 'F4-3000C16S-16GISB', 16, 3000, 'DDR4', 'No', 950000),
(UUID_TO_BIN(UUID()), 'Corsair', 'Vengeance RGB Pro', 'CMW64GX4M4C3200C16', 64, 3200, 'DDR4', 'RGB', 3000000);


INSERT INTO fuentesDePoder (id, marca, voltaje, potencia, certificacion, precio) VALUES
(UUID_TO_BIN(UUID()), 'EVGA', 120, 550, '80 Plus White', 300000),
(UUID_TO_BIN(UUID()), 'Corsair', 120, 650, '80 Plus Bronze', 400000),
(UUID_TO_BIN(UUID()), 'Seasonic', 120, 750, '80 Plus Gold', 500000),
(UUID_TO_BIN(UUID()), 'Cooler Master', 120, 850, '80 Plus Gold', 600000),
(UUID_TO_BIN(UUID()), 'Thermaltake', 120, 1000, '80 Plus Gold', 700000),
(UUID_TO_BIN(UUID()), 'be quiet!', 120, 1200, '80 Plus Platinum', 800000),
(UUID_TO_BIN(UUID()), 'NZXT', 120, 650, '80 Plus Bronze', 400000),
(UUID_TO_BIN(UUID()), 'SilverStone', 120, 750, '80 Plus Gold', 500000),
(UUID_TO_BIN(UUID()), 'Antec', 120, 850, '80 Plus Gold', 600000),
(UUID_TO_BIN(UUID()), 'Deepcool', 120, 1000, '80 Plus Gold', 700000),
(UUID_TO_BIN(UUID()), 'EVGA', 240, 550, '80 Plus White', 300000),
(UUID_TO_BIN(UUID()), 'Corsair', 240, 650, '80 Plus Bronze', 400000),
(UUID_TO_BIN(UUID()), 'Seasonic', 240, 750, '80 Plus Gold', 500000),
(UUID_TO_BIN(UUID()), 'Cooler Master', 240, 850, '80 Plus Gold', 600000),
(UUID_TO_BIN(UUID()), 'Thermaltake', 240, 1000, '80 Plus Gold', 700000),
(UUID_TO_BIN(UUID()), 'be quiet!', 240, 1200, '80 Plus Platinum', 800000),
(UUID_TO_BIN(UUID()), 'NZXT', 240, 650, '80 Plus Bronze', 400000),
(UUID_TO_BIN(UUID()), 'SilverStone', 240, 750, '80 Plus Gold', 500000),
(UUID_TO_BIN(UUID()), 'Antec', 240, 850, '80 Plus Gold', 600000),
(UUID_TO_BIN(UUID()), 'Deepcool', 240, 1000, '80 Plus Gold', 700000);



INSERT INTO pantallas (id, marca, referencia, dimensiones, pulgadas, resolucion, tipo, precio) VALUES
(UUID_TO_BIN(UUID()), 'Samsung', 'S24F350FH', '54.8 x 19.2 x 41.4 cm', 24, '1920 x 1080', 'LED', 900000),
(UUID_TO_BIN(UUID()), 'LG', '24MP59G-P', '55.1 x 41.9 x 20.1 cm', 24, '1920 x 1080', 'IPS LED', 1000000),
(UUID_TO_BIN(UUID()), 'Dell', 'S2421H', '53.9 x 15.1 x 41.1 cm', 24, '1920 x 1080', 'IPS LED', 1100000),
(UUID_TO_BIN(UUID()), 'Acer', 'R240HY', '53.8 x 17.9 x 40.1 cm', 23.8, '1920 x 1080', 'IPS LED', 950000),
(UUID_TO_BIN(UUID()), 'Asus', 'VP249QGR', '53.3 x 21.3 x 40.2 cm', 23.8, '1920 x 1080', 'IPS LED', 1050000),
(UUID_TO_BIN(UUID()), 'Samsung', 'LC24F390FH', '54.7 x 20.6 x 41.8 cm', 24, '1920 x 1080', 'VA LED', 950000),
(UUID_TO_BIN(UUID()), 'Acer', 'KG241Q', '56.7 x 16.9 x 40.1 cm', 23.6, '1920 x 1080', 'TN LED', 800000),
(UUID_TO_BIN(UUID()), 'ViewSonic', 'VX2457-MHD', '57.2 x 41.1 x 18.4 cm', 24, '1920 x 1080', 'TN LED', 850000),
(UUID_TO_BIN(UUID()), 'BenQ', 'GW2480', '54.1 x 18.5 x 42.9 cm', 24, '1920 x 1080', 'IPS LED', 1000000),
(UUID_TO_BIN(UUID()), 'HP', '24mh', '53.9 x 18.3 x 41.9 cm', 24, '1920 x 1080', 'IPS LED', 1100000),
(UUID_TO_BIN(UUID()), 'Samsung', 'U28E590D', '66.09 x 46.26 x 18.84 cm', 28, '3840 x 2160', 'TN LED', 1400000),
(UUID_TO_BIN(UUID()), 'LG', '27UL500-W', '61.5 x 4.64 x 36.9 cm', 27, '3840 x 2160', 'IPS LED', 1500000),
(UUID_TO_BIN(UUID()), 'Dell', 'S2721QS', '61.22 x 18.11 x 43.47 cm', 27, '3840 x 2160', 'IPS LED', 1600000),
(UUID_TO_BIN(UUID()), 'Acer', 'XB271HU', '61.4 x 7.89 x 36.43 cm', 27, '2560 x 1440', 'IPS LED', 1700000),
(UUID_TO_BIN(UUID()), 'Asus', 'VG278Q', '62.25 x 5.33 x 37.61 cm', 27, '1920 x 1080', 'TN LED', 1300000),
(UUID_TO_BIN(UUID()), 'Samsung', 'C27F396FHU', '62.6 x 24.8 x 46.2 cm', 27, '1920 x 1080', 'VA LED', 1200000),
(UUID_TO_BIN(UUID()), 'Acer', 'KG271', '62.2 x 24.2 x 43.2 cm', 27, '1920 x 1080', 'TN LED', 1100000),
(UUID_TO_BIN(UUID()), 'ViewSonic', 'VX2758-C-MH', '63.5 x 16.3 x 47.5 cm', 27, '1920 x 1080', 'VA LED', 1000000),
(UUID_TO_BIN(UUID()), 'BenQ', 'GL2780', '64.1 x 16.6 x 47.7 cm', 27, '1920 x 1080', 'TN LED', 900000),
(UUID_TO_BIN(UUID()), 'HP', '27x', '64.4 x 21.8 x 44.2 cm', 27, '1920 x 1080', 'TN LED', 950000),
(UUID_TO_BIN(UUID()), 'Samsung', 'LS27AM500NUXEN', '64.6 x 24.3 x 48.9 cm', 27, '1920 x 1080', 'VA LED', 1200000);