-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema alltechno
-- -----------------------------------------------------
DROP DATABASE IF EXISTS alltechno;
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
  `contraseña` VARCHAR(50) NOT NULL,
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
  `precio` INT NOT NULL,
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
  `modelo` VARCHAR(100) NOT NULL,
  `voltaje` INT NOT NULL,
  `potencia` INT NOT NULL,
  `certificacion` VARCHAR(50) NOT NULL,
  `precio` INT NOT NULL,
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
  `modelo` VARCHAR(100) NOT NULL,
  `dimensiones` VARCHAR(100) NOT NULL,
  `pulgadas` INT NOT NULL,
  `resolucion` VARCHAR(50) NOT NULL,
  `tipo` VARCHAR(50) NOT NULL,
  `precio` INT NOT NULL,
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
  `precio` INT NOT NULL,
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
  `modelo` VARCHAR(100) NOT NULL,
  `numNucleos` INT NOT NULL,
  `numHilos` INT NOT NULL,
  `relojBase` VARCHAR(100) NOT NULL,
  `precio` INT NOT NULL,
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
  `modelo` VARCHAR(100) NOT NULL,
  `capacidad` INT NOT NULL,
  `velocidad` INT NOT NULL,
  `tipo` VARCHAR(50) NOT NULL,
  `led` VARCHAR(50) NOT NULL,
  `precio` INT NOT NULL,
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
  `precio` INT NOT NULL,
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

INSERT INTO recursos (url1, url2, url3, url4, url5, url6) VALUES
("resources/uploads/cellphones/8i.webp", "resources/uploads/cellphones/8i-1.jpeg", "resources/uploads/cellphones/8i-2.webp", "resources/uploads/cellphones/8i-3.jpg", "resources/uploads/cellphones/8i-4.jpg", "resources/uploads/cellphones/8i-5.jpg"),
("resources/uploads/cellphones/9pro.webp", "resources/uploads/cellphones/9pro-1.webp", "resources/uploads/cellphones/9pro-2.webp", "resources/uploads/cellphones/9pro-3.webp", "resources/uploads/cellphones/9pro-4.webp", "resources/uploads/cellphones/9pro-5.webp"),
("resources/uploads/cellphones/50a.webp", "resources/uploads/cellphones/50a-1.webp", "resources/uploads/cellphones/50a-2.webp", "resources/uploads/cellphones/50a-3.webp", "resources/uploads/cellphones/50a-4.webp", "resources/uploads/cellphones/50a-5.webp"),
("resources/uploads/cellphones/a03.jpeg", "resources/uploads/cellphones/a03-1.jpeg", "resources/uploads/cellphones/a03-2.jpeg", "resources/uploads/cellphones/a03-3.jpeg", "resources/uploads/cellphones/a03-4.jpeg", "resources/uploads/cellphones/a03-5.jpeg"),
("resources/uploads/cellphones/a32.jpg", "resources/uploads/cellphones/a32-1.jpg", "resources/uploads/cellphones/a32-2.webp", "resources/uploads/cellphones/a32-3.jpg", "resources/uploads/cellphones/a32-4.webp", "resources/uploads/cellphones/a32-5.jpg"),
("resources/uploads/cellphones/c25.webp", "resources/uploads/cellphones/c25-1.webp", "resources/uploads/cellphones/c25-2.webp", "resources/uploads/cellphones/c25-3.webp", "resources/uploads/cellphones/c25-4.webp", "resources/uploads/cellphones/c25-5.webp"),
("resources/uploads/cellphones/e7.jpeg", "resources/uploads/cellphones/e7-1.jpeg", "resources/uploads/cellphones/e7-2.jpeg", "resources/uploads/cellphones/e7-3.jpeg", "resources/uploads/cellphones/e7-4.jpeg", "resources/uploads/cellphones/e7-5.jpeg"),
("resources/uploads/cellphones/g60.jpeg", "resources/uploads/cellphones/g60-1.jpeg", "resources/uploads/cellphones/g60-2.jpeg", "resources/uploads/cellphones/g60-3.jpeg", "resources/uploads/cellphones/g60-4.jpeg", "resources/uploads/cellphones/g60-5.jpeg"),
("resources/uploads/cellphones/gpower.jpg", "resources/uploads/cellphones/gpower-1.jpg", "resources/uploads/cellphones/gpower-2.jpg", "resources/uploads/cellphones/gpower-3.jpg", "resources/uploads/cellphones/gpower-4.jpg", "resources/uploads/cellphones/gpower-5.jpg"),
("resources/uploads/cellphones/i12.webp", "resources/uploads/cellphones/i12-1.webp", "resources/uploads/cellphones/i12-2.webp", "resources/uploads/cellphones/i12-3.webp", "resources/uploads/cellphones/i12-4.webp", "resources/uploads/cellphones/i12-5.webp"),
("resources/uploads/cellphones/i13.webp", "resources/uploads/cellphones/i13-1.webp", "resources/uploads/cellphones/i13-2.webp", "resources/uploads/cellphones/i13-3.webp", "resources/uploads/cellphones/i13-4.webp", "resources/uploads/cellphones/i13-5.webp"),
("resources/uploads/cellphones/m11.jpeg", "resources/uploads/cellphones/m11-1.jpeg", "resources/uploads/cellphones/m11-2.jpeg", "resources/uploads/cellphones/m11-3.jpeg", "resources/uploads/cellphones/m11-4.jpeg", "resources/uploads/cellphones/m11-5.jpeg"),
("resources/uploads/cellphones/m32.jpeg", "resources/uploads/cellphones/m32-1.jpeg", "resources/uploads/cellphones/m32-2.jpeg", "resources/uploads/cellphones/m32-3.jpeg", "resources/uploads/cellphones/m32-4.jpeg", "resources/uploads/cellphones/m32-5.jpeg"),
("resources/uploads/cellphones/n20.webp", "resources/uploads/cellphones/n20-1.webp", "resources/uploads/cellphones/n20-2.webp", "resources/uploads/cellphones/n20-3.webp", "resources/uploads/cellphones/n20-4.webp", "resources/uploads/cellphones/n20-5.webp"),
("resources/uploads/cellphones/n200.webp", "resources/uploads/cellphones/n200-1.webp", "resources/uploads/cellphones/n200-2.webp", "resources/uploads/cellphones/n200-3.webp", "resources/uploads/cellphones/n200-4.webp", "resources/uploads/cellphones/n200-5.webp"),
("resources/uploads/cellphones/note10.webp", "resources/uploads/cellphones/note10-1.webp", "resources/uploads/cellphones/note10-2.webp", "resources/uploads/cellphones/note10-3.webp", "resources/uploads/cellphones/note10-4.webp", "resources/uploads/cellphones/note10-5.webp"),
("resources/uploads/cellphones/redmi10.webp", "resources/uploads/cellphones/redmi10-1.webp", "resources/uploads/cellphones/redmi10-2.webp", "resources/uploads/cellphones/redmi10-3.webp", "resources/uploads/cellphones/redmi10-4.webp", "resources/uploads/cellphones/redmi10-5.webp"),
("resources/uploads/cellphones/s21.webp", "resources/uploads/cellphones/s21-1.webp", "resources/uploads/cellphones/s21-2.webp", "resources/uploads/cellphones/s21-3.webp", "resources/uploads/cellphones/s21-4.webp", "resources/uploads/cellphones/s21-5.webp"),
("resources/uploads/cellphones/se.webp", "resources/uploads/cellphones/se-1.webp", "resources/uploads/cellphones/se-2.webp", "resources/uploads/cellphones/se-3.webp", "resources/uploads/cellphones/se-4.webp", "resources/uploads/cellphones/se-5.webp"),
("resources/uploads/cellphones/x3.jpeg", "resources/uploads/cellphones/x3-1.jpeg", "resources/uploads/cellphones/x3-2.jpeg", "resources/uploads/cellphones/x3-3.jpeg", "resources/uploads/cellphones/x3-4.jpeg", "resources/uploads/cellphones/x3-5.jpeg");


INSERT INTO recursos (url1, url2, url3, url4, url5, url6) VALUES
('resources/uploads/laptops/air.webp', 'resources/uploads/laptops/air-1.webp', 'resources/uploads/laptops/air-2.webp', 'resources/uploads/laptops/air-3.webp', 'resources/uploads/laptops/air-4.webp', 'resources/uploads/laptops/air-5.webp'),
('resources/uploads/laptops/aspire5.webp', 'resources/uploads/laptops/aspire5-1.webp', 'resources/uploads/laptops/aspire5-2.jpg', 'resources/uploads/laptops/aspire5-3.jpg', 'resources/uploads/laptops/aspire5-4.jpg', 'resources/uploads/laptops/aspire5-5.jpg'),
('resources/uploads/laptops/blade.webp', 'resources/uploads/laptops/blade-1.webp', 'resources/uploads/laptops/blade-2.webp', 'resources/uploads/laptops/blade-3.webp', 'resources/uploads/laptops/blade-4.jpg', 'resources/uploads/laptops/blade-5.webp'),
('resources/uploads/laptops/book15.jpg', 'resources/uploads/laptops/book15-1.webp', 'resources/uploads/laptops/book15-2.webp', 'resources/uploads/laptops/book15-3.webp', 'resources/uploads/laptops/book15-4.webp', 'resources/uploads/laptops/book15-5.webp'),
('resources/uploads/laptops/bookpro.webp', 'resources/uploads/laptops/bookpro-1.webp', 'resources/uploads/laptops/bookpro-2.webp', 'resources/uploads/laptops/bookpro-3.webp', 'resources/uploads/laptops/bookpro-4.webp', 'resources/uploads/laptops/bookpro-5.webp'),
('resources/uploads/laptops/dragon.jpeg', 'resources/uploads/laptops/dragon-1.jpeg', 'resources/uploads/laptops/dragon-2.jpeg', 'resources/uploads/laptops/dragon-3.jpeg', 'resources/uploads/laptops/dragon-4.jpeg', 'resources/uploads/laptops/dragon-5.webp'),
('resources/uploads/laptops/duo.webp', 'resources/uploads/laptops/duo-1.webp', 'resources/uploads/laptops/duo-2.webp', 'resources/uploads/laptops/duo-3.webp', 'resources/uploads/laptops/duo-4.webp', 'resources/uploads/laptops/duo-5.webp'),
('resources/uploads/laptops/flex.jpg', 'resources/uploads/laptops/flex-1.jpg', 'resources/uploads/laptops/flex-2.jpg', 'resources/uploads/laptops/flex-3.jpg', 'resources/uploads/laptops/flex-4.jpg', 'resources/uploads/laptops/flex-5.jpg'),
('resources/uploads/laptops/go.jpg', 'resources/uploads/laptops/go-1.jpg', 'resources/uploads/laptops/go-2.jpg', 'resources/uploads/laptops/go-3.jpg', 'resources/uploads/laptops/go-4.jpg', 'resources/uploads/laptops/go-5.jpg'),
('resources/uploads/laptops/gram.jpg', 'resources/uploads/laptops/gram-1.jpg', 'resources/uploads/laptops/gram-2.jpg', 'resources/uploads/laptops/gram-3.webp', 'resources/uploads/laptops/gram-4.webp', 'resources/uploads/laptops/gram-5.webp'),
('resources/uploads/laptops/inspiron.webp', 'resources/uploads/laptops/inspiron-1.webp', 'resources/uploads/laptops/inspiron-2.webp', 'resources/uploads/laptops/inspiron-3.webp', 'resources/uploads/laptops/inspiron-4.webp', 'resources/uploads/laptops/inspiron-5.webp'),
('resources/uploads/laptops/laptop.jpg', 'resources/uploads/laptops/laptop-1.jpg', 'resources/uploads/laptops/laptop-2.jpg', 'resources/uploads/laptops/laptop-3.jpg', 'resources/uploads/laptops/laptop-4.jpg', 'resources/uploads/laptops/laptop-5.jpg'),
('resources/uploads/laptops/modern.png', 'resources/uploads/laptops/modern-1.jpg', 'resources/uploads/laptops/modern-2.webp', 'resources/uploads/laptops/modern-3.webp', 'resources/uploads/laptops/modern-4.webp', 'resources/uploads/laptops/modern-5.webp'),
('resources/uploads/laptops/pad3.webp', 'resources/uploads/laptops/pad3-1.webp', 'resources/uploads/laptops/pad3-2.webp', 'resources/uploads/laptops/pad3-3.webp', 'resources/uploads/laptops/pad3-4.webp', 'resources/uploads/laptops/pad3-5.webp'),
('resources/uploads/laptops/pavilion.webp', 'resources/uploads/laptops/pavilion-1.webp', 'resources/uploads/laptops/pavilion-2.webp', 'resources/uploads/laptops/pavilion-3.webp', 'resources/uploads/laptops/pavilion-4.webp', 'resources/uploads/laptops/pavilion-5.webp'),
('resources/uploads/laptops/prestige.jpg', 'resources/uploads/laptops/prestige-1.jpg', 'resources/uploads/laptops/prestige-2.jpg', 'resources/uploads/laptops/prestige-3.jpg', 'resources/uploads/laptops/prestige-4.jpg', 'resources/uploads/laptops/prestige-5.jpg'),
('resources/uploads/laptops/stealth.jpg', 'resources/uploads/laptops/stealth-1.jpg', 'resources/uploads/laptops/stealth-2.jpg', 'resources/uploads/laptops/stealth-3.jpg', 'resources/uploads/laptops/stealth-4.jpg', 'resources/uploads/laptops/stealth-5.jpg'),
('resources/uploads/laptops/swift.webp', 'resources/uploads/laptops/swift-1.webp', 'resources/uploads/laptops/swift-2.webp', 'resources/uploads/laptops/swift-3.webp', 'resources/uploads/laptops/swift-4.webp', 'resources/uploads/laptops/swift-5.webp'),
('resources/uploads/laptops/ultra.jpg', 'resources/uploads/laptops/ultra-1.jpg', 'resources/uploads/laptops/ultra-2.jpg', 'resources/uploads/laptops/ultra-3.jpg', 'resources/uploads/laptops/ultra-4.jpg', 'resources/uploads/laptops/ultra-5.jpg'),
('resources/uploads/laptops/xps.jpg', 'resources/uploads/laptops/xps-1.jpg', 'resources/uploads/laptops/xps-2.jpg', 'resources/uploads/laptops/xps-3.jpg', 'resources/uploads/laptops/xps-4.jpg', 'resources/uploads/laptops/xps-5.jpg');


INSERT INTO recursos (url1, url2, url3, url4, url5, url6) VALUES
('resources/uploads/powerSupplies/earth.jpg', 'resources/uploads/powerSupplies/earth-1.jpg', 'resources/uploads/powerSupplies/earth-2.jpg', 'resources/uploads/powerSupplies/earth-3.jpg', 'resources/uploads/powerSupplies/earth-4.jpg', 'resources/uploads/powerSupplies/earth-5.jpg'),
('resources/uploads/powerSupplies/earth8.jpg', 'resources/uploads/powerSupplies/earth8-1.jpg', 'resources/uploads/powerSupplies/earth8-2.jpg', 'resources/uploads/powerSupplies/earth8-3.jpg', 'resources/uploads/powerSupplies/earth8-4.jpg', 'resources/uploads/powerSupplies/earth8-5.jpg'),
('resources/uploads/powerSupplies/gf1.webp', 'resources/uploads/powerSupplies/gf1-1.webp', 'resources/uploads/powerSupplies/gf1-2.webp', 'resources/uploads/powerSupplies/gf1-3.webp', 'resources/uploads/powerSupplies/gf1-4.webp', 'resources/uploads/powerSupplies/gf1-5.webp'),
('resources/uploads/powerSupplies/gf18.jpg', 'resources/uploads/powerSupplies/gf18-1.jpg', 'resources/uploads/powerSupplies/gf18-2.jpg', 'resources/uploads/powerSupplies/gf18-3.jpg', 'resources/uploads/powerSupplies/gf18-4.jpg', 'resources/uploads/powerSupplies/gf18-5.jpg'),
('resources/uploads/powerSupplies/gx.jpg', 'resources/uploads/powerSupplies/gx-1.jpg', 'resources/uploads/powerSupplies/gx-2.jpg', 'resources/uploads/powerSupplies/gx-3.jpg', 'resources/uploads/powerSupplies/gx-4.jpg', 'resources/uploads/powerSupplies/gx-5.jpg'),
('resources/uploads/powerSupplies/gx8.jpg', 'resources/uploads/powerSupplies/gx8-1.jpg', 'resources/uploads/powerSupplies/gx8-2.jpg', 'resources/uploads/powerSupplies/gx8-3.jpg', 'resources/uploads/powerSupplies/gx8-4.jpg', 'resources/uploads/powerSupplies/gx8-5.jpg'),
('resources/uploads/powerSupplies/hydro.jpg', 'resources/uploads/powerSupplies/hydro-1.jpg', 'resources/uploads/powerSupplies/hydro-2.jpg', 'resources/uploads/powerSupplies/hydro-3.jpg', 'resources/uploads/powerSupplies/hydro-4.jpg', 'resources/uploads/powerSupplies/hydro-5.jpg'),
('resources/uploads/powerSupplies/hydro8.jpg', 'resources/uploads/powerSupplies/hydro8-1.jpg', 'resources/uploads/powerSupplies/hydro8-2.jpg', 'resources/uploads/powerSupplies/hydro8-3.jpg', 'resources/uploads/powerSupplies/hydro8-4.jpg', 'resources/uploads/powerSupplies/hydro8-5.jpg'),
('resources/uploads/powerSupplies/mwe.webp', 'resources/uploads/powerSupplies/mwe-1.webp', 'resources/uploads/powerSupplies/mwe-2.webp', 'resources/uploads/powerSupplies/mwe-3.webp', 'resources/uploads/powerSupplies/mwe-4.webp', 'resources/uploads/powerSupplies/mwe-5.webp'),
('resources/uploads/powerSupplies/mwe8.jpg', 'resources/uploads/powerSupplies/mwe8-1.jpg', 'resources/uploads/powerSupplies/mwe8-2.jpg', 'resources/uploads/powerSupplies/mwe8-3.jpg', 'resources/uploads/powerSupplies/mwe8-4.jpg', 'resources/uploads/powerSupplies/mwe8-5.jpg'),
('resources/uploads/powerSupplies/nova.jpg', 'resources/uploads/powerSupplies/nova-1.jpg', 'resources/uploads/powerSupplies/nova-2.jpg', 'resources/uploads/powerSupplies/nova-3.jpg', 'resources/uploads/powerSupplies/nova-4.jpg', 'resources/uploads/powerSupplies/nova-5.jpg'),
('resources/uploads/powerSupplies/nova8.png', 'resources/uploads/powerSupplies/nova8-1.jpg', 'resources/uploads/powerSupplies/nova8-2.jpg', 'resources/uploads/powerSupplies/nova8-3.jpg', 'resources/uploads/powerSupplies/nova8-4.jpg', 'resources/uploads/powerSupplies/nova8-5.jpg'),
('resources/uploads/powerSupplies/nsxt7.jpg', 'resources/uploads/powerSupplies/nsxt7-1.jpg', 'resources/uploads/powerSupplies/nsxt7-2.jpg', 'resources/uploads/powerSupplies/nsxt7-3.jpg', 'resources/uploads/powerSupplies/nsxt7-4.jpg', 'resources/uploads/powerSupplies/nsxt7-5.jpg'),
('resources/uploads/powerSupplies/nsxt8.jpg', 'resources/uploads/powerSupplies/nsxt8-1.jpg', 'resources/uploads/powerSupplies/nsxt8-2.jpg', 'resources/uploads/powerSupplies/nsxt8-3.jpg', 'resources/uploads/powerSupplies/nsxt8-4.jpg', 'resources/uploads/powerSupplies/nsxt8-5.jpg'),
('resources/uploads/powerSupplies/power7.jpg', 'resources/uploads/powerSupplies/power7-1.jpg', 'resources/uploads/powerSupplies/power7-2.jpg', 'resources/uploads/powerSupplies/power7-3.jpg', 'resources/uploads/powerSupplies/power7-4.jpg', 'resources/uploads/powerSupplies/power7-5.jpg'),
('resources/uploads/powerSupplies/power8.jpg', 'resources/uploads/powerSupplies/power8-1.jpg', 'resources/uploads/powerSupplies/power8-2.jpg', 'resources/uploads/powerSupplies/power8-3.jpg', 'resources/uploads/powerSupplies/power8-4.jpg', 'resources/uploads/powerSupplies/power8-5.jpg'),
('resources/uploads/powerSupplies/rm.jpg', 'resources/uploads/powerSupplies/rm-1.jpg', 'resources/uploads/powerSupplies/rm-2.jpg', 'resources/uploads/powerSupplies/rm-3.jpg', 'resources/uploads/powerSupplies/rm-4.jpg', 'resources/uploads/powerSupplies/rm-5.jpg'),
('resources/uploads/powerSupplies/rm8.jpg', 'resources/uploads/powerSupplies/rm8-1.jpg', 'resources/uploads/powerSupplies/rm8-2.jpg', 'resources/uploads/powerSupplies/rm8-3.jpg', 'resources/uploads/powerSupplies/rm8-4.jpg', 'resources/uploads/powerSupplies/rm8-5.jpg'),
('resources/uploads/powerSupplies/sst.jpg', 'resources/uploads/powerSupplies/sst-1.jpg', 'resources/uploads/powerSupplies/sst-2.jpg', 'resources/uploads/powerSupplies/sst-3.jpg', 'resources/uploads/powerSupplies/sst-4.jpg', 'resources/uploads/powerSupplies/sst-5.jpg'),
('resources/uploads/powerSupplies/sst8.jpg', 'resources/uploads/powerSupplies/sst8-1.jpg', 'resources/uploads/powerSupplies/sst8-2.jpg', 'resources/uploads/powerSupplies/sst8-3.jpg', 'resources/uploads/powerSupplies/sst8-4.jpg', 'resources/uploads/powerSupplies/sst8-5.jpg');


INSERT INTO recursos (url1, url2, url3, url4, url5, url6) VALUES
("resources/uploads/processors/5600g.jpg", "resources/uploads/processors/5600g-1.jpg", NULL, NULL, NULL, NULL),
("resources/uploads/processors/5600.jpg", "resources/uploads/processors/5600-1.jpg", NULL, NULL, NULL, NULL),
("resources/uploads/processors/5600x.jpg", "resources/uploads/processors/5600x-1.jpg", NULL, NULL, NULL, NULL),
("resources/uploads/processors/5700g.jpg", "resources/uploads/processors/5700g-1.jpg", "resources/uploads/processors/5700g-2.jpg", NULL, NULL, NULL),
("resources/uploads/processors/5800.webp", "resources/uploads/processors/5800-1.webp", NULL, NULL, NULL, NULL),
("resources/uploads/processors/5800x.jpg", "resources/uploads/processors/5800x-1.jpg", "resources/uploads/processors/5800x-2.jpg", NULL, NULL, NULL),
("resources/uploads/processors/5900.webp", "resources/uploads/processors/5900-1.webp", NULL, NULL, NULL, NULL),
("resources/uploads/processors/5900x.webp", NULL, NULL, NULL, NULL, NULL),
("resources/uploads/processors/5950x.jpg", "resources/uploads/processors/5950x-1.jpg", NULL, NULL, NULL, NULL),
("resources/uploads/processors/10400f.jpg", "resources/uploads/processors/10400f-1.jpg", NULL, NULL, NULL, NULL),
("resources/uploads/processors/10600k.jpg", "resources/uploads/processors/10600k-1.jpg", "resources/uploads/processors/10600k-2.jpg", NULL, NULL, NULL),
("resources/uploads/processors/10700.jpg", "resources/uploads/processors/10700-1.jpg", NULL, NULL, NULL, NULL),
("resources/uploads/processors/10700k.jpg", "resources/uploads/processors/10700k-1.jpg", "resources/uploads/processors/10700k-2.jpg", NULL, NULL, NULL),
("resources/uploads/processors/10850k.jpg", "resources/uploads/processors/10850k-1.jpg", NULL, NULL, NULL, NULL),
("resources/uploads/processors/10900.jpg", "resources/uploads/processors/10900-1.jpg", "resources/uploads/processors/10900-2.jpg", NULL, NULL, NULL),
("resources/uploads/processors/10900k.jpg", "resources/uploads/processors/10900k-1.jpg", NULL, NULL, NULL, NULL),
("resources/uploads/processors/11600k.jpg", "resources/uploads/processors/11600k-1.jpg", "resources/uploads/processors/11600k-2.jpg", NULL, NULL, NULL),
("resources/uploads/processors/11700k.jpg", "resources/uploads/processors/11700k-1.jpg", "resources/uploads/processors/11700k-2.jpg", NULL, NULL, NULL),
("resources/uploads/processors/11900k.jpg", "resources/uploads/processors/11900k-1.jpg", "resources/uploads/processors/11900k-2.jpg", NULL, NULL, NULL),
("resources/uploads/processors/5900hs.webp", NULL, NULL, NULL, NULL, NULL);



INSERT INTO recursos (url1, url2, url3, url4, url5, url6) VALUES
("resources/uploads/ram/vengeance.jpg", "resources/uploads/ram/vengeance-1.jpg", "resources/uploads/ram/vengeance-2.jpg", "resources/uploads/ram/vengeance-3.jpg", NULL, NULL),
("resources/uploads/ram/fury.webp", "resources/uploads/ram/fury-1.webp", "resources/uploads/ram/fury-2.webp", "resources/uploads/ram/fury-3.webp", NULL, NULL),
("resources/uploads/ram/ripjaws.jpg", "resources/uploads/ram/ripjaws-1.jpg", "resources/uploads/ram/ripjaws-2.jpg", "resources/uploads/ram/ripjaws-3.jpg", NULL, NULL),
("resources/uploads/ram/ballistix.jpg", "resources/uploads/ram/ballistix-1.jpg", "resources/uploads/ram/ballistix-2.jpg", "resources/uploads/ram/ballistix-3.jpg", "resources/uploads/ram/ballistix-4.jpg", NULL),
("resources/uploads/ram/spectrix.jpg", "resources/uploads/ram/spectrix-1.jpg", "resources/uploads/ram/spectrix-2.jpg", "resources/uploads/ram/spectrix-3.jpg", "resources/uploads/ram/spectrix-4.jpg", NULL),
("resources/uploads/ram/delta.jpg", "resources/uploads/ram/delta-1.jpg", "resources/uploads/ram/delta-2.jpg", "resources/uploads/ram/delta-3.jpg", "resources/uploads/ram/delta-4.jpg", NULL),
("resources/uploads/ram/steel.jpg", "resources/uploads/ram/steel-1.jpg", "resources/uploads/ram/steel-2.jpg", "resources/uploads/ram/steel-3.jpg", NULL, NULL),
("resources/uploads/ram/impact.jpg", "resources/uploads/ram/impact-1.jpg", "resources/uploads/ram/impact-2.jpg", NULL, NULL, NULL),
("resources/uploads/ram/platinum.jpg", "resources/uploads/ram/platinum-1.webp", "resources/uploads/ram/platinum-2.webp", "resources/uploads/ram/platinum-3.webp", NULL, NULL),
("resources/uploads/ram/trident.jpg", "resources/uploads/ram/trident-1.webp", "resources/uploads/ram/trident-2.webp", "resources/uploads/ram/trident-3.webp", "resources/uploads/ram/trident-4.webp", NULL),
("resources/uploads/ram/value.webp", "resources/uploads/ram/value-1.webp", NULL, NULL, NULL, NULL),
("resources/uploads/ram/crucial.png", "resources/uploads/ram/crucial-1.png", NULL, NULL, NULL, NULL),
("resources/uploads/ram/gammix.jpg", "resources/uploads/ram/gammix-1.jpg", "resources/uploads/ram/gammix-2.jpg", "resources/uploads/ram/gammix-3.jpg", NULL, NULL),
("resources/uploads/ram/elite.jpg", "resources/uploads/ram/elite-1.jpg", "resources/uploads/ram/elite-2.jpg", "resources/uploads/ram/elite-3.jpg", NULL, NULL),
("resources/uploads/ram/patriot.jpg", "resources/uploads/ram/patriot-1.jpg", "resources/uploads/ram/patriot-2.jpg", "resources/uploads/ram/patriot-3.jpg", NULL, NULL),
("resources/uploads/ram/xfury.jpg", "resources/uploads/ram/xfury-1.jpg", "resources/uploads/ram/xfury-2.jpg", NULL, NULL, NULL),
("resources/uploads/ram/lpx.webp", "resources/uploads/ram/lpx-1.webp", "resources/uploads/ram/lpx-2.webp", "resources/uploads/ram/lpx-3.webp", "resources/uploads/ram/lpx-4.webp", NULL),
("resources/uploads/ram/aegis.jpg", "resources/uploads/ram/aegis-1.jpg", "resources/uploads/ram/aegis-2.jpg", NULL, NULL, NULL),
("resources/uploads/ram/predator.jpg", "resources/uploads/ram/predator-1.jpg", "resources/uploads/ram/predator-2.jpg", "resources/uploads/ram/predator-3.jpg", NULL, NULL),
("resources/uploads/ram/ballistix2.png", "resources/uploads/ram/ballistix2-1.jpg", NULL, NULL, NULL, NULL);



INSERT INTO recursos (url1, url2, url3, url4, url5, url6) VALUES
("resources/uploads/screens/01r.jpg", "resources/uploads/screens/01r-1.jpg", "resources/uploads/screens/01r-2.jpg", "resources/uploads/screens/01r-3.jpg", "resources/uploads/screens/01r-4.jpg", NULL),
("resources/uploads/screens/9he.jpg", "resources/uploads/screens/9he-1.jpg", "resources/uploads/screens/9he-2.jpg", NULL, NULL, NULL),
("resources/uploads/screens/19h.jpg", "resources/uploads/screens/19h-1.jpg", "resources/uploads/screens/19h-2.jpg", "resources/uploads/screens/19h-3.jpg", NULL, NULL),
("resources/uploads/screens/27x.jpg", "resources/uploads/screens/27x-1.jpg", "resources/uploads/screens/27x-2.jpg", "resources/uploads/screens/27x-3.jpg", "resources/uploads/screens/27x-4.jpg", "resources/uploads/screens/27x-5.jpg"),
("resources/uploads/screens/42y.jpg", "resources/uploads/screens/42y-1.jpg", "resources/uploads/screens/42y-2.jpg", "resources/uploads/screens/42y-3.jpg", "resources/uploads/screens/42y-4.jpg", NULL),
("resources/uploads/screens/59g.jpg", "resources/uploads/screens/59g-1.jpg", "resources/uploads/screens/59g-2.jpg", "resources/uploads/screens/59g-3.jpg", "resources/uploads/screens/59g-4.jpg", NULL),
("resources/uploads/screens/276.jpg", "resources/uploads/screens/276-1.jpg", "resources/uploads/screens/276-2.jpg", "resources/uploads/screens/276-3.jpg", "resources/uploads/screens/276-4.jpg", NULL),
("resources/uploads/screens/480.jpg", "resources/uploads/screens/480-1.jpg", "resources/uploads/screens/480-2.jpg", "resources/uploads/screens/480-3.jpg", "resources/uploads/screens/480-4.jpg", NULL),
("resources/uploads/screens/cq.jpg", "resources/uploads/screens/cq-1.jpg", "resources/uploads/screens/cq-2.jpg", "resources/uploads/screens/cq-3.jpg", "resources/uploads/screens/cq-4.jpg", "resources/uploads/screens/cq-5.jpg"),
("resources/uploads/screens/cq4.jpg", "resources/uploads/screens/cq4-1.jpg", "resources/uploads/screens/cq4-2.jpg", "resources/uploads/screens/cq4-3.jpg", "resources/uploads/screens/cq4-4.jpg", "resources/uploads/screens/cq4-5.jpg"),
("resources/uploads/screens/dab.webp", "resources/uploads/screens/dab-1.webp", "resources/uploads/screens/dab-2.webp", "resources/uploads/screens/dab-3.webp", "resources/uploads/screens/dab-4.webp", NULL),
("resources/uploads/screens/e1s.jpg", "resources/uploads/screens/e1s-1.jpg", "resources/uploads/screens/e1s-2.jpg", "resources/uploads/screens/e1s-3.jpg", NULL, NULL),
("resources/uploads/screens/fdu.jpg", "resources/uploads/screens/fdu-1.jpg", "resources/uploads/screens/fdu-2.jpg", "resources/uploads/screens/fdu-3.jpg", "resources/uploads/screens/fdu-4.jpg", NULL),
("resources/uploads/screens/fw.jpg", "resources/uploads/screens/fw-1.jpg", "resources/uploads/screens/fw-2.jpg", "resources/uploads/screens/fw-3.jpg", "resources/uploads/screens/fw-4.jpg", NULL),
("resources/uploads/screens/hgf.jpg", "resources/uploads/screens/hgf-1.jpg", "resources/uploads/screens/hgf-2.jpg", "resources/uploads/screens/hgf-3.jpg", "resources/uploads/screens/hgf-4.jpg", "resources/uploads/screens/hgf-5.jpg"),
("resources/uploads/screens/n600.jpg", "resources/uploads/screens/n600-1.jpg", "resources/uploads/screens/n600-2.jpg", "resources/uploads/screens/n600-3.jpg", "resources/uploads/screens/n600-4.jpg", NULL),
("resources/uploads/screens/qrp.jpg", "resources/uploads/screens/qrp-1.jpg", "resources/uploads/screens/qrp-2.jpg", "resources/uploads/screens/qrp-3.jpg", "resources/uploads/screens/qrp-4.jpg", NULL),
("resources/uploads/screens/sh.jpg", "resources/uploads/screens/sh-1.jpg", "resources/uploads/screens/sh-2.jpg", "resources/uploads/screens/sh-3.jpg", "resources/uploads/screens/sh-4.jpg", NULL),
("resources/uploads/screens/vq.webp", "resources/uploads/screens/vq-1.webp", "resources/uploads/screens/vq-2.webp", "resources/uploads/screens/vq-3.webp", NULL, NULL),
("resources/uploads/screens/xzs.jpg", "resources/uploads/screens/xzs-1.jpg", "resources/uploads/screens/xzs-2.jpg", "resources/uploads/screens/xzs-3.jpg", NULL, NULL);


INSERT INTO recursos (url1, url2, url3, url4, url5, url6) VALUES
("resources/uploads/desktops/1.jpg", NULL, NULL, NULL, NULL, NULL),
("resources/uploads/desktops/2.jpg", NULL, NULL, NULL, NULL, NULL),
("resources/uploads/desktops/3.jpg", NULL, NULL, NULL, NULL, NULL),
("resources/uploads/desktops/4.jpg", NULL, NULL, NULL, NULL, NULL),
("resources/uploads/desktops/5.jpg", NULL, NULL, NULL, NULL, NULL),
("resources/uploads/desktops/6.jpg", NULL, NULL, NULL, NULL, NULL),
("resources/uploads/desktops/7.jpg", NULL, NULL, NULL, NULL, NULL),
("resources/uploads/desktops/8.jpg", NULL, NULL, NULL, NULL, NULL),
("resources/uploads/desktops/9.jpg", NULL, NULL, NULL, NULL, NULL),
("resources/uploads/desktops/10.jpg", NULL, NULL, NULL, NULL, NULL),
("resources/uploads/desktops/11.jpg", NULL, NULL, NULL, NULL, NULL),
("resources/uploads/desktops/12.jpg", NULL, NULL, NULL, NULL, NULL);



INSERT INTO celulares (id, marca, modelo, bateria, procesador, camaraFrontal, camaraPosterior, resolucion, huella, almacenamiento, ram, precio, colores, recursos_id_recurso) VALUES
(UUID_TO_BIN(UUID()), 'Samsung', 'Galaxy S21', 4000, 'Exynos 2100', 32, 108, '1080 x 2400 pixels', 'En pantalla', 128, 8, 3800000, 'Negro, Gris, Azul', 18),
(UUID_TO_BIN(UUID()), 'Apple', 'iPhone 13', 3095, 'Apple A15 Bionic', 12, 12, '1170 x 2532 pixels', 'En pantalla', 256, 6, 4800000, 'Gris, Blanco, Plateado', 11),
(UUID_TO_BIN(UUID()), 'Xiaomi', 'Redmi Note 10', 5000, 'Snapdragon 678', 13, 48, '1080 x 2400 pixels', 'En panel lateral', 128, 4, 1200000, 'Azul, Blanco', 16),
(UUID_TO_BIN(UUID()), 'Motorola', 'Moto G Power', 5000, 'Snapdragon 662', 16, 48, '1080 x 2300 pixels', 'En panel lateral', 64, 4, 900000, 'Negro, Verde', 9),
(UUID_TO_BIN(UUID()), 'OnePlus', 'Nord N200', 5000, 'Snapdragon 480', 16, 13, '720 x 1600 pixels', 'En pantalla', 64, 4, 1100000, 'Gris, Plateado', 15),
(UUID_TO_BIN(UUID()), 'Realme', '8i', 5000, 'MediaTek Helio G96', 16, 50, '1080 x 2400 pixels', 'En panel lateral', 128, 4, 1300000, 'Azul, Negro', 1),
(UUID_TO_BIN(UUID()), 'Samsung', 'Galaxy A32', 5000, 'Mediatek Helio G80', 20, 64, '720 x 1600 pixels', 'En pantalla', 128, 4, 1300000, 'Negro, Blanco', 5),
(UUID_TO_BIN(UUID()), 'Xiaomi', 'Mi 11 Lite', 4250, 'Snapdragon 732G', 16, 64, '1080 x 2400 pixels', 'En pantalla', 128, 6, 1600000, 'Gris, Verde', 12),
(UUID_TO_BIN(UUID()), 'Apple', 'iPhone SE', 1821, 'Apple A13 Bionic', 7, 12, '750 x 1334 pixels', 'En pantalla', 64, 3, 2200000, 'Azul, Rojo', 19),
(UUID_TO_BIN(UUID()), 'Motorola', 'Moto E7i Power', 5000, 'MediaTek Helio G25', 5, 13, '720 x 1600 pixels', 'En panel lateral', 32, 2, 600000, 'Negro, Azul', 7),
(UUID_TO_BIN(UUID()), 'OnePlus', '9 Pro', 4500, 'Snapdragon 888', 16, 48, '1440 x 3216 pixels', 'En pantalla', 256, 12, 5800000, 'Gris, Negro', 2),
(UUID_TO_BIN(UUID()), 'Realme', 'Narzo 50A', 6000, 'MediaTek Helio G85', 8, 50, '720 x 1600 pixels', 'En panel lateral', 64, 4, 900000, 'Azul, Amarillo', 3),
(UUID_TO_BIN(UUID()), 'Samsung', 'Galaxy A03s', 5000, 'Mediatek MT6739W', 5, 13, '720 x 1600 pixels', 'En pantalla', 32, 3, 600000, 'Negro, Blanco', 4),
(UUID_TO_BIN(UUID()), 'Xiaomi', 'Redmi 10', 5000, 'MediaTek Helio G88', 8, 50, '1080 x 2400 pixels', 'En pantalla', 128, 4, 1400000, 'Gris, Plateado', 17),
(UUID_TO_BIN(UUID()), 'Apple', 'iPhone 12 Mini', 2227, 'Apple A14 Bionic', 12, 12, '1080 x 2340 pixels', 'En pantalla', 256, 4, 3800000, 'Azul, Negro', 10),
(UUID_TO_BIN(UUID()), 'Motorola', 'Moto G60', 6000, 'Snapdragon 732G', 32, 108, '1080 x 2460 pixels', 'En panel lateral', 128, 6, 1700000, 'Negro, Rojo', 8),
(UUID_TO_BIN(UUID()), 'OnePlus', 'Nord 2', 4500, 'MediaTek Dimensity 1200-AI', 32, 50, '1080 x 2400 pixels', 'En pantalla', 256, 12, 3500000, 'Gris, Verde', 14),
(UUID_TO_BIN(UUID()), 'Realme', 'C25s', 6000, 'MediaTek Helio G85', 8, 48, '720 x 1600 pixels', 'En panel lateral', 128, 4, 1000000, 'Azul, Gris', 6),
(UUID_TO_BIN(UUID()), 'Samsung', 'Galaxy M32', 6000, 'Mediatek Helio G80', 20, 64, '1080 x 2400 pixels', 'En pantalla', 128, 6, 1500000, 'Negro, Verde', 13),
(UUID_TO_BIN(UUID()), 'Xiaomi', 'Poco X3 Pro', 5160, 'Snapdragon 860', 20, 48, '1080 x 2400 pixels', 'En pantalla', 256, 8, 1900000, 'Gris, Azul', 20);


INSERT INTO portatiles (id, marca, modelo, procesador, grafica, resolucion, tamañoPantalla, almacenamiento, ram, precio, colores, recursos_id_recurso) VALUES
(UUID_TO_BIN(UUID()), 'Apple', 'MacBook Air', 'Apple M1', 'Apple M1', '2560 x 1600 pixels', 13, 256, 8, 5500000, 'Plateado, Gris', 21),
(UUID_TO_BIN(UUID()), 'Acer', 'Aspire 5', 'Intel Core i5-1135G7', 'Intel Iris Xe Graphics', '1920 x 1080 pixels', 15, 512, 8, 2800000, 'Gris, Plateado', 22),
(UUID_TO_BIN(UUID()), 'Razer', 'Blade 15', 'Intel Core i7-11800H', 'NVIDIA GeForce RTX 3060', '1920 x 1080 pixels', 15, 512, 16, 6900000, 'Negro, Verde', 23),
(UUID_TO_BIN(UUID()), 'Samsung', 'Galaxy Book 15', 'Intel Core i5-1135G7', 'Intel Iris Xe Graphics', '1920 x 1080 pixels', 15, 512, 8, 2800000, 'Gris, Plateado', 24),
(UUID_TO_BIN(UUID()), 'Samsung', 'Galaxy Book Pro 360', 'Intel Core i7-1165G7', 'Intel Iris Xe Graphics', '1920 x 1080 pixels', 15, 512, 16, 5600000, 'Negro, Plata', 25),
(UUID_TO_BIN(UUID()), 'HP', 'Elite Dragonfly', 'Intel Core i5-1135G7', 'Intel Iris Xe Graphics', '1920 x 1080 pixels', 13, 256, 16, 6900000, 'Azul, Plateado', 26),
(UUID_TO_BIN(UUID()), 'ASUS', 'ZenBook Duo', 'Intel Core i7-1165G7', 'NVIDIA GeForce MX450', '1920 x 1080 pixels', 14, 512, 16, 8700000, 'Azul, Negro', 27),
(UUID_TO_BIN(UUID()), 'Samsung', 'Galaxy Book Flex 2', 'Intel Core i7-1165G7', 'Intel Iris Xe Graphics', '1920 x 1080 pixels', 15, 512, 16, 6200000, 'Negro, Azul', 28),
(UUID_TO_BIN(UUID()), 'Microsoft', 'Surface Laptop Go', 'Intel Core i5-1035G1', 'Intel UHD Graphics', '1536 x 1024 pixels', 12, 256, 8, 4300000, 'Plata, Azul', 29),
(UUID_TO_BIN(UUID()), 'LG', 'Gram 14', 'Intel Core i7-1165G7', 'Intel Iris Xe Graphics', '1920 x 1200 pixels', 14, 512, 16, 4600000, 'Negro, Blanco', 30),
(UUID_TO_BIN(UUID()), 'Dell', 'Inspiron 14 3000', 'Intel Core i3-1115G4', 'Intel UHD Graphics', '1366 x 768 pixels', 14, 128, 4, 1800000, 'Negro', 31),
(UUID_TO_BIN(UUID()), 'ASUS', 'VivoBook 15', 'Intel Core i3-1115G4', 'Intel UHD Graphics', '1920 x 1080 pixels', 15, 256, 8, 2200000, 'Azul, Blanco', 32),
(UUID_TO_BIN(UUID()), 'MSI', 'Modern 14', 'Intel Core i5-1135G7', 'Intel Iris Xe Graphics', '1920 x 1080 pixels', 14, 512, 16, 4000000, 'Gris', 33),
(UUID_TO_BIN(UUID()), 'Samsung', 'Galaxy Tab S7', 'Qualcomm Snapdragon 865+', 'Adreno 650', '2560 x 1600 pixels', 12.4, 256, 8, 4300000, 'Gris, Plateado', 34),
(UUID_TO_BIN(UUID()), 'HP', 'Pavilion 15', 'Intel Core i5-1135G7', 'Intel Iris Xe Graphics', '1920 x 1080 pixels', 15, 512, 8, 3300000, 'Plateado, Negro', 35),
(UUID_TO_BIN(UUID()), 'MSI', 'Prestige 14', 'Intel Core i7-1185G7', 'Intel Iris Xe Graphics', '1920 x 1080 pixels', 14, 512, 16, 7600000, 'Blanco, Plateado', 36),
(UUID_TO_BIN(UUID()), 'Razer', 'Blade Stealth 13', 'Intel Core i7-1165G7', 'NVIDIA GeForce GTX 1650 Ti', '1920 x 1080 pixels', 13, 512, 16, 9500000, 'Negro, Verde', 37),
(UUID_TO_BIN(UUID()), 'Acer', 'Swift 5', 'Intel Core i7-1165G7', 'Intel Iris Xe Graphics', '1920 x 1080 pixels', 14, 512, 16, 7200000, 'Oro, Negro', 38),
(UUID_TO_BIN(UUID()), 'LG', 'UltraGear 17', 'Intel Core i7-11800H', 'NVIDIA GeForce RTX 3080', '2560 x 1600 pixels', 17, 512, 32, 13500000, 'Negro, Azul', 39),
(UUID_TO_BIN(UUID()), 'Dell', 'XPS 13', 'Intel Core i7-1165G7', 'Intel Iris Xe Graphics', '3840 x 2400 pixels', 13, 512, 16, 8500000, 'Blanco', 40);



INSERT INTO `alltechno`.`fuentesdepoder` (`id`, `marca`, `modelo`, `voltaje`, `potencia`, `certificacion`, `precio`, `recursos_id_recurso`) VALUES
(UUID_TO_BIN(UUID()), 'Antec', 'Earthwatts Gold Pro 750W', 120, 750, '80 Plus Bronze', 580000, 41),
(UUID_TO_BIN(UUID()), 'Antec', 'Earthwatts Gold Pro 850W', 120, 850, '80 Plus Bronze', 680000, 42),
(UUID_TO_BIN(UUID()), 'Thermaltake', 'Toughpower GF1 750W', 120, 750, '80 Plus Bronze', 530000, 43),
(UUID_TO_BIN(UUID()), 'Thermaltake', 'Toughpower GF1 850W', 120, 850, '80 Plus Bronze', 630000, 44),
(UUID_TO_BIN(UUID()), 'Seasonic', 'Focus GX-750', 120, 750, '80 Plus Platinum', 600000, 45),
(UUID_TO_BIN(UUID()), 'Seasonic', 'Focus GX-850', 120, 850, '80 Plus Titanium', 660000, 46),
(UUID_TO_BIN(UUID()), 'FSP', 'Hydro G Pro 750W', 120, 750, '80 Plus Gold', 610000, 47),
(UUID_TO_BIN(UUID()), 'FSP', 'Hydro G Pro 850W', 120, 850, '80 Plus Titanium', 700000, 48),
(UUID_TO_BIN(UUID()), 'Cooler Master', 'MWE Gold 750 Full Modular', 120, 750, '80 Plus Titanium', 560000, 49),
(UUID_TO_BIN(UUID()), 'Cooler Master', 'MWE Gold 850 Full Modular', 120, 850, '80 Plus Silver', 650000, 50),
(UUID_TO_BIN(UUID()), 'EVGA', 'SuperNOVA 750 G5', 120, 750, '80 Plus Gold', 550000, 51),
(UUID_TO_BIN(UUID()), 'EVGA', 'SuperNOVA 850 G5', 120, 850, '80 Plus Platinum', 620000, 52),
(UUID_TO_BIN(UUID()), 'NZXT', 'C750', 120, 750, '80 Plus Gold', 570000, 53),
(UUID_TO_BIN(UUID()), 'NZXT', 'C850', 120, 850, '80 Plus Platinum', 690000, 54),
(UUID_TO_BIN(UUID()), 'be quiet!', 'Straight Power 11 750W', 120, 750, '80 Plus Silver', 590000, 55),
(UUID_TO_BIN(UUID()), 'be quiet!', 'Straight Power 11 850W', 120, 850, '80 Plus Gold', 670000, 56),
(UUID_TO_BIN(UUID()), 'Corsair', 'RM750x', 120, 750, '80 Plus Gold', 580000, 57),
(UUID_TO_BIN(UUID()), 'Corsair', 'RM850x', 120, 850, '80 Plus Gold', 640000, 58),
(UUID_TO_BIN(UUID()), 'SilverStone', 'SST-ET750-G', 120, 750, '80 Plus Gold', 540000, 59),
(UUID_TO_BIN(UUID()), 'SilverStone', 'SST-ET850-G', 120, 850, '80 Plus Gold', 660000, 60);



INSERT INTO procesadores (id, marca, modelo, numNucleos, numHilos, relojBase, precio, recursos_id_recurso) VALUES
(UUID_TO_BIN(UUID()), 'AMD', 'Ryzen 5 5600G', 6, 12, '3.9 GHz', 2000000, 61),
(UUID_TO_BIN(UUID()), 'AMD', 'Ryzen 5 5600', 6, 12, '3.6 GHz', 1700000, 62),
(UUID_TO_BIN(UUID()), 'AMD', 'Ryzen 5 5600X', 6, 12, '3.7 GHz', 1800000, 63),
(UUID_TO_BIN(UUID()), 'AMD', 'Ryzen 7 5700G', 8, 16, '3.8 GHz', 2400000, 64),
(UUID_TO_BIN(UUID()), 'AMD', 'Ryzen 7 5800', 8, 16, '3.4 GHz', 2600000, 65),
(UUID_TO_BIN(UUID()), 'AMD', 'Ryzen 7 5800X', 8, 16, '3.8 GHz', 2800000, 66),
(UUID_TO_BIN(UUID()), 'AMD', 'Ryzen 9 5900', 12, 24, '3.0 GHz', 3700000, 67),
(UUID_TO_BIN(UUID()), 'AMD', 'Ryzen 9 5900X', 12, 24, '3.7 GHz', 3900000, 68),
(UUID_TO_BIN(UUID()), 'AMD', 'Ryzen 9 5950X', 16, 32, '3.4 GHz', 4500000, 69),
(UUID_TO_BIN(UUID()), 'Intel', 'Core i5-10400F', 6, 12, '2.9 GHz', 1800000, 70),
(UUID_TO_BIN(UUID()), 'Intel', 'Core i5-10600K', 6, 12, '4.1 GHz', 2300000, 71),
(UUID_TO_BIN(UUID()), 'Intel', 'Core i7-10700', 8, 16, '2.9 GHz', 2500000, 72),
(UUID_TO_BIN(UUID()), 'Intel', 'Core i7-10700K', 8, 16, '3.8 GHz', 2800000, 73),
(UUID_TO_BIN(UUID()), 'Intel', 'Core i9-10850K', 10, 20, '3.6 GHz', 3000000, 74),
(UUID_TO_BIN(UUID()), 'Intel', 'Core i9-10900', 10, 20, '2.8 GHz', 2800000, 75),
(UUID_TO_BIN(UUID()), 'Intel', 'Core i9-10900K', 10, 20, '3.7 GHz', 3200000, 76),
(UUID_TO_BIN(UUID()), 'Intel', 'Core i5-11600K', 6, 12, '3.9 GHz', 2500000, 77),
(UUID_TO_BIN(UUID()), 'Intel', 'Core i7-11700K', 8, 16, '3.6 GHz', 3000000, 78),
(UUID_TO_BIN(UUID()), 'Intel', 'Core i9-11900K', 8, 16, '3.5 GHz', 3500000, 79),
(UUID_TO_BIN(UUID()), 'AMD', 'Ryzen 9 5900HS', 8, 16, '3.3 GHz', 3500000, 80);



INSERT INTO `alltechno`.`ram` (`id`, `marca`, `modelo`, `capacidad`, `velocidad`, `tipo`, `led`, `precio`, `recursos_id_recurso`) VALUES
(UUID_TO_BIN(UUID()), 'Corsair', 'Vengeance LPX', 16, 3200, 'DDR4', 'No', 550000, 81),
(UUID_TO_BIN(UUID()), 'Kingston', 'HyperX Fury', 8, 2666, 'DDR4', 'No', 350000, 82),
(UUID_TO_BIN(UUID()), 'G.Skill', 'Ripjaws V Series', 16, 3600, 'DDR4', 'Sí', 600000, 83),
(UUID_TO_BIN(UUID()), 'Crucial', 'Ballistix', 32, 3000, 'DDR4', 'No', 900000, 84),
(UUID_TO_BIN(UUID()), 'ADATA', 'XPG Spectrix D41', 32, 3200, 'DDR4', 'Sí', 850000, 85),
(UUID_TO_BIN(UUID()), 'Team Group', 'T-Force Delta RGB', 16, 3000, 'DDR4', 'Sí', 590000, 86),
(UUID_TO_BIN(UUID()), 'Patriot', 'Viper Steel Series', 16, 3200, 'DDR4', 'No', 580000, 87),
(UUID_TO_BIN(UUID()), 'HyperX', 'Impact', 8, 2666, 'DDR4', 'No', 340000, 88),
(UUID_TO_BIN(UUID()), 'Corsair', 'Dominator Platinum RGB', 32, 3600, 'DDR4', 'Sí', 950000, 89),
(UUID_TO_BIN(UUID()), 'G.Skill', 'Trident Z RGB', 16, 3200, 'DDR4', 'Sí', 620000, 90),
(UUID_TO_BIN(UUID()), 'Kingston', 'ValueRAM', 8, 2400, 'DDR4', 'No', 320000, 91),
(UUID_TO_BIN(UUID()), 'Crucial', 'Crucial DDR4', 8, 2666, 'DDR4', 'No', 330000, 92),
(UUID_TO_BIN(UUID()), 'ADATA', 'XPG Gammix D10', 16, 3000, 'DDR4', 'No', 570000, 93),
(UUID_TO_BIN(UUID()), 'Team Group', 'Elite Plus', 8, 2666, 'DDR4', 'No', 340000, 94),
(UUID_TO_BIN(UUID()), 'Patriot', 'Signature Line DDR4', 16, 2666, 'DDR4', 'No', 560000, 95),
(UUID_TO_BIN(UUID()), 'HyperX', 'Fury RGB', 16, 3200, 'DDR4', 'Sí', 630000, 96),
(UUID_TO_BIN(UUID()), 'Corsair', 'Vengeance RGB Pro', 32, 3200, 'DDR4', 'Sí', 930000, 97),
(UUID_TO_BIN(UUID()), 'G.Skill', 'Aegis', 16, 3000, 'DDR4', 'No', 600000, 98),
(UUID_TO_BIN(UUID()), 'Kingston', 'HyperX Predator', 16, 3200, 'DDR4', 'Sí', 680000, 99),
(UUID_TO_BIN(UUID()), 'Crucial', 'Crucial Ballistix', 8, 3000, 'DDR4', 'No', 340000, 100);



INSERT INTO pantallas (id, marca, modelo, dimensiones, pulgadas, resolucion, tipo, precio, recursos_id_recurso) VALUES
(UUID_TO_BIN(UUID()), 'BenQ', 'EX3501R', '83.7 x 51.2 x 18.2 cm', 35, '3440 x 1440 píxeles', 'Curvo', 1800000, 101),
(UUID_TO_BIN(UUID()), 'ASUS', 'VZ239HE', '53.9 x 40.4 x 20.1 cm', 23, '1920 x 1080 píxeles', 'IPS', 800000, 102),
(UUID_TO_BIN(UUID()), 'Dell', 'S2719H', '61.1 x 45.2 x 22.5 cm', 27, '1920 x 1080 píxeles', 'IPS', 950000, 103),
(UUID_TO_BIN(UUID()), 'HP', '27x', '62.1 x 47.3 x 22.1 cm', 27, '1920 x 1080 píxeles', 'TN', 800000, 104),
(UUID_TO_BIN(UUID()), 'Acer', 'CB242Y', '56.9 x 42.1 x 21.8 cm', 23.8, '1920 x 1080 píxeles', 'LED', 750000, 105),
(UUID_TO_BIN(UUID()), 'LG', '24MP59G', '56.1 x 43.6 x 17.2 cm', 24, '1920 x 1080 píxeles', 'IPS', 700000, 106),
(UUID_TO_BIN(UUID()), 'ViewSonic', 'VX3276', '72.8 x 51.1 x 25.2 cm', 32, '2560 x 1440 píxeles', 'IPS', 1400000, 107),
(UUID_TO_BIN(UUID()), 'BenQ', 'GW2480', '55.6 x 42.5 x 17.1 cm', 23.8, '1920 x 1080 píxeles', 'IPS', 900000, 108),
(UUID_TO_BIN(UUID()), 'MSI', 'MAG341CQ', '81.3 x 47.5 x 23.5 cm', 34, '3440 x 1440 píxeles', 'Curvo', 1700000, 109),
(UUID_TO_BIN(UUID()), 'MSI', 'Optix G27CQ4', '61.5 x 46.3 x 25.4 cm', 27, '2560 x 1440 píxeles', 'Curvo', 1350000, 110),
(UUID_TO_BIN(UUID()), 'Philips', '243V7QDAB', '55.3 x 41.1 x 21.2 cm', 23.8, '1920 x 1080 píxeles', 'IPS', 780000, 111),
(UUID_TO_BIN(UUID()), 'Philips', '275E1S', '62.8 x 45.6 x 24.2 cm', 27, '3840 x 2160 píxeles', 'IPS', 1600000, 112),
(UUID_TO_BIN(UUID()), 'Samsung', 'S27R650FDU', '61.3 x 46.3 x 20.1 cm', 27, '2560 x 1440 píxeles', 'LED', 1200000, 113),
(UUID_TO_BIN(UUID()), 'HP', '24fw', '53.1 x 40.8 x 20.2 cm', 24, '1920 x 1080 píxeles', 'IPS', 850000, 114),
(UUID_TO_BIN(UUID()), 'Dell', 'S2421HGF', '56.1 x 42.1 x 18.2 cm', 24, '1920 x 1080 píxeles', 'LED', 900000, 115),
(UUID_TO_BIN(UUID()), 'LG', '27QN600', '61.1 x 45.2 x 27.5 cm', 27, '2560 x 1440 píxeles', 'IPS', 1300000, 116),
(UUID_TO_BIN(UUID()), 'Acer', 'ED320QRP', '71.1 x 52.1 x 18.2 cm', 31.5, '1920 x 1080 píxeles', 'Curvo', 850000, 117),
(UUID_TO_BIN(UUID()), 'ViewSonic', 'VA2419-SH', '54.3 x 40.5 x 18.2 cm', 24, '1920 x 1080 píxeles', 'IPS', 720000, 118),
(UUID_TO_BIN(UUID()), 'ASUS', 'TUF Gaming VG27VQ', '61.9 x 52.2 x 23.1 cm', 27, '1920 x 1080 píxeles', 'Curvo', 1100000, 119),
(UUID_TO_BIN(UUID()), 'Samsung', 'LU28R550UQLXZS', '73.2 x 48.9 x 22.5 cm', 28, '3840 x 2160 píxeles', 'LED', 1500000, 120);



INSERT INTO torreescritorio (id, procesador, grafica, ram, almacenamiento, board, chasis, fuente, refrigeracion, precio, recursos_id_recurso) VALUES
(UUID_TO_BIN(UUID()), 'Intel Core i5-10400F', 'NVIDIA GeForce GTX 1650', '16GB DDR4', '512GB NVMe SSD', 'GIGABYTE B460M DS3H', 'NZXT H510', 'EVGA 600W 80+ Bronze', 'Refrigeración por aire', 6800000, 121),
(UUID_TO_BIN(UUID()), 'AMD Ryzen 3 3300X', 'AMD Radeon RX 550', '8GB DDR4', '256GB NVMe SSD', 'ASRock A520M-HDV', 'Phanteks Eclipse P300A', 'Corsair 500W 80+ Bronze', 'Refrigeración por aire', 5000000, 122),
(UUID_TO_BIN(UUID()), 'Intel Core i7-10700', 'NVIDIA GeForce GTX 1660 Ti', '16GB DDR4', '1TB HDD', 'MSI Z490-A PRO', 'Corsair 4000D Airflow', 'EVGA 600W 80+ Bronze', 'Refrigeración por aire', 7500000, 123),
(UUID_TO_BIN(UUID()), 'AMD Ryzen 7 5800X', 'AMD Radeon RX 6700 XT', '32GB DDR4', '1TB NVMe SSD', 'ASUS TUF GAMING B550-PLUS', 'Cooler Master MasterBox TD500 Mesh', 'Corsair 650W 80+ Bronze', 'Refrigeración líquida', 10000000, 124),
(UUID_TO_BIN(UUID()), 'Intel Core i9-10850K', 'NVIDIA GeForce RTX 3070', '32GB DDR4', '1TB NVMe SSD', 'GIGABYTE Z490 AORUS Elite AC', 'NZXT H710i', 'Corsair 750W 80+ Gold', 'Refrigeración por aire', 11000000, 125),
(UUID_TO_BIN(UUID()), 'AMD Ryzen 9 5900X', 'AMD Radeon RX 6800 XT', '64GB DDR4', '2TB NVMe SSD', 'MSI MAG X570 TOMAHAWK WIFI', 'Fractal Design Meshify C', 'Corsair 850W 80+ Platinum', 'Refrigeración líquida', 15000000, 126),
(UUID_TO_BIN(UUID()), 'Intel Core i5-11600KF', 'NVIDIA GeForce RTX 3060 Ti', '16GB DDR4', '512GB NVMe SSD', 'ASRock B560 Steel Legend', 'NZXT H510', 'Corsair 650W 80+ Bronze', 'Refrigeración por aire', 8000000, 127),
(UUID_TO_BIN(UUID()), 'AMD Ryzen 5 5600X', 'AMD Radeon RX 6700', '16GB DDR4', '512GB NVMe SSD', 'ASUS PRIME B550M-A', 'Cooler Master MasterBox MB311L ARGB', 'Corsair 600W 80+ Bronze', 'Refrigeración por aire', 8500000, 128),
(UUID_TO_BIN(UUID()), 'Intel Core i9-10900F', 'NVIDIA GeForce GTX 1660', '32GB DDR4', '1TB NVMe SSD', 'ASUS ROG STRIX Z490-E GAMING', 'NZXT H510 Elite', 'Corsair 750W 80+ Gold', 'Refrigeración líquida', 13000000, 129),
(UUID_TO_BIN(UUID()), 'AMD Ryzen 7 3700X', 'NVIDIA GeForce GTX 1660 SUPER', '16GB DDR4', '512GB NVMe SSD', 'GIGABYTE B550 AORUS ELITE', 'Fractal Design Meshify C', 'EVGA 650W 80+ Bronze', 'Refrigeración por aire', 9000000, 130),
(UUID_TO_BIN(UUID()), 'Intel Core i5-10400F', 'NVIDIA GeForce GTX 1650', '16GB DDR4', '512GB NVMe SSD', 'GIGABYTE B460M DS3H', 'NZXT H510', 'EVGA 600W 80+ Bronze', 'Refrigeración por aire', 6800000, 131),
(UUID_TO_BIN(UUID()), 'AMD Ryzen 3 3300X', 'AMD Radeon RX 550', '8GB DDR4', '256GB NVMe SSD', 'ASRock A520M-HDV', 'Phanteks Eclipse P300A', 'Corsair 500W 80+ Bronze', 'Refrigeración por aire', 5000000, 132);

-- CONSULTA PARA CELULARES CON SUS FOTOS
SELECT BIN_TO_UUID(cel.id) AS id, cel.marca, cel.modelo, cel.bateria, cel.procesador, cel.camaraFrontal, cel.camaraPosterior, cel.resolucion, cel.huella, cel.almacenamiento, cel.ram, cel.precio, cel.colores, 
r.url1, r.url2, r.url3, r.url4, r.url5, r.url6 FROM celulares cel INNER JOIN recursos r ON cel.recursos_id_recurso = r.id_recurso ;

-- CONSULTA PARA PORTATILES CON SUS FOTOS
SELECT BIN_TO_UUID(por.id) AS id, por.marca, por.modelo, por.procesador, por.grafica, por.resolucion, por.tamañoPantalla, por.almacenamiento, por.ram, por.almacenamiento, por.ram, por.precio, por.colores, 
r.url1, r.url2, r.url3, r.url4, r.url5, r.url6 FROM portatiles por INNER JOIN recursos r ON por.recursos_id_recurso = r.id_recurso ;

-- CONSULTAS POR ID
SELECT BIN_TO_UUID(id) AS id, marca, modelo, bateria, procesador, camaraFrontal, camaraPosterior, resolucion, huella, almacenamiento, ram, precio, colores FROM celulares WHERE id = UUID_TO_BIN("75a136fd-1859-11ef-a2c8-d85ed3ffda3c");
SELECT BIN_TO_UUID(id) AS id, marca, modelo, procesador, grafica, resolucion, tamañoPantalla, almacenamiento, ram, almacenamiento, ram, precio, colores FROM portatiles WHERE id = UUID_TO_BIN("75a136fd-1859-11ef-a2c8-d85ed3ffda3c");


(
  SELECT BIN_TO_UUID(celulares.id) AS id, celulares.marca, celulares.modelo, celulares.precio,
         recursos.url1, recursos.url2, recursos.url3, recursos.url4, recursos.url5, recursos.url6
  FROM celulares
  LEFT JOIN recursos ON celulares.recursos_id_recurso = recursos.id_recurso
  ORDER BY RAND()
  LIMIT 1
)
UNION ALL
(
  SELECT BIN_TO_UUID(fuentesdepoder.id) AS id, fuentesdepoder.marca, fuentesdepoder.modelo, fuentesdepoder.precio,
         recursos.url1, recursos.url2, recursos.url3, recursos.url4, recursos.url5, recursos.url6
  FROM fuentesdepoder
  LEFT JOIN recursos ON fuentesdepoder.recursos_id_recurso = recursos.id_recurso
  ORDER BY RAND()
  LIMIT 1
)
UNION ALL
(
  SELECT BIN_TO_UUID(pantallas.id) AS id, pantallas.marca, pantallas.modelo, pantallas.precio,
         recursos.url1, recursos.url2, recursos.url3, recursos.url4, recursos.url5, recursos.url6
  FROM pantallas
  LEFT JOIN recursos ON pantallas.recursos_id_recurso = recursos.id_recurso
  ORDER BY RAND()
  LIMIT 1
)
UNION ALL
(
  SELECT BIN_TO_UUID(portatiles.id) AS id, portatiles.marca, portatiles.modelo, portatiles.precio,
         recursos.url1, recursos.url2, recursos.url3, recursos.url4, recursos.url5, recursos.url6
  FROM portatiles
  LEFT JOIN recursos ON portatiles.recursos_id_recurso = recursos.id_recurso
  ORDER BY RAND()
  LIMIT 1
)
UNION ALL
(
  SELECT BIN_TO_UUID(procesadores.id) AS id, procesadores.marca, procesadores.modelo, procesadores.precio,
         recursos.url1, recursos.url2, recursos.url3, recursos.url4, recursos.url5, recursos.url6
  FROM procesadores
  LEFT JOIN recursos ON procesadores.recursos_id_recurso = recursos.id_recurso
  ORDER BY RAND()
  LIMIT 1
)
UNION ALL
(
  SELECT BIN_TO_UUID(ram.id) AS id, ram.marca, ram.modelo, ram.precio,
         recursos.url1, recursos.url2, recursos.url3, recursos.url4, recursos.url5, recursos.url6
  FROM ram
  LEFT JOIN recursos ON ram.recursos_id_recurso = recursos.id_recurso
  ORDER BY RAND()
  LIMIT 1
);

INSERT INTO usuario (identificacion, nombres, apellidos, correo, contraseña, celular) VALUES 
("1025522938", "Franklin Andres", "Cortes Gonzalez", "andres10cortes07@gmail.com", "contraseña", "3204031794");