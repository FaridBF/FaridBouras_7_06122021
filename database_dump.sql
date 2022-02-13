-- -----------------------------------------------------
-- Fichier pour la création de la base de données
-- -----------------------------------------------------

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


-- -----------------------------------------------------
-- Schema groupomania
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `groupomania` DEFAULT CHARACTER SET utf8 ;
USE `groupomania` ;

-- -----------------------------------------------------
-- Table `groupomania`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `groupomania`.`user` ;

CREATE TABLE IF NOT EXISTS `groupomania`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `is_admin` TINYINT NOT NULL DEFAULT 0,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `picture` VARCHAR(255) NULL DEFAULT NULL,
  `create_time` DATETIME NOT NULL DEFAULT NOW(),
  `update_time` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Dumping data to `groupomania`.`user` table
-- -----------------------------------------------------

LOCK TABLES 'user' WRITE;
INSERT INTO user (is_admin, first_name, last_name, email, password, picture, create_time, update_time) 
VALUES 
(0,'Bertrand', 'Lavel', 'directeur.des.ventes@groupomania.com','$2b$10$yNouQXYt.3YE6KIiiS.DnuXYvJYPyexI0W37301Pvd5IEMHe4Y5.e', 'http://localhost:3000/images/bertrand1644590969024.jpg', '2022-02-09 12:09:45', '2022-02-11 15:49:29'), 
(1,'Nathalie', 'Cheminot', 'DRH@groupomania.com','$2b$10$.c9HKor3GedMHPQAQFTxjO/8TvtnfWZJooqXXaEMnPEj2sihwRhba', 'http://localhost:3000/images/pexels-photo-10243111644590797077.jpg', '2022-02-09 12:17:39', '2022-02-11 15:46:37'), 
(0,'Samira', 'Halfaoui', 'recrutement@groupomania.com','$2b$10$AVfX8qSlHUepgsuFRfCJh.Yser.naimjy1nqY1LVjSpIk9T9EdtRi', 'http://localhost:3000/images/pexels-photo-37854241644590718108.jpg', '2022-02-09 12:27:05', '2022-02-11 15:45:18'),
(0,'Béatrice', 'Dumoutier', 'communication@groupomania.com','$2b$10$Ict92u0WMDJXNjg3ZszLD.xR6SU1YNNs4RbZtXgoPesgzOApg0IA.', 'http://localhost:3000/images/Béatrice1644591458777.jpg', '2022-02-09 14:35:49', '2022-02-11 15:57:38'), 
(0, 'Rayane', 'Laoudnine', 'service.des.achats@groupomania.com', '$2b$10$sPJI3TXMieOxKjMruqXz7.19n18HxroaBJiFlJLXl1TYtctWYqLD2', 'http://localhost:3000/images/pexels-photo-20803831644590613449.jpg', '2022-02-09 14:51:26', '2022-02-11 15:43:33'), 
(0, 'Jerôme', 'Carvalino', 'responsable.rayon.liquide.paris@groupomania.com', '$2b$10$iuawjD5nn53ZdtATBPORVeOQPIbnBzbyJiNALE8PJm.L67LjoEMAm', 'http://localhost:3000/images/jerôme1644416011779.jpg', '2022-02-09 15:02:17 ', '2022-02-09 15:13:31'), 
(0, 'Richard', 'Dos-Santos', 'responsable.logistique.france@groupomania.com', '$2b$10$FD.tk2yUlA80JuZ15YQJDOJutOuAcOII1snC1Aku33f0lqHgYrFay', 'http://localhost:3000/images/richard1644416301317.jpg', '2022-02-09 15:17:48', '2022-02-09 15:18:21'), 
(0, 'Tanyaa', 'Kizeleva', 'service.evenementiel.france@groupomania.com', '$2b$10$pyAsBrVlFdAazjMRS2zCmO2wx07bMttcv44DpfaXGghIszJoYPKeS', 'http://localhost:3000/images/tanyaa1644418124804.jpg', '2022-02-09 15:48:21', '2022-02-09 15:48:44'), 
(0, 'Maxime', 'De Prevot', 'responsable.qualite@groupomania.com', '$2b$10$dPtAsezw0XJmlrnlt2zWLuqBRyRWDuKUVKl37NRMBq2mIAjfZ2PU2', 'http://localhost:3000/images/pexels-photo-2204531644590238184.jpg', '2022-02-09 16:15:59', '2022-02-11 15:37:18'), 
(0, 'Fahtou', 'Diallo', 'service.livraison@groupomania.com', '$2b$10$CTZi7LpdgzL3BpAySLBXcObfHIPhBro03CJIRqbPxAZI4NTnxm6DG', 'http://localhost:3000/images/fahtou1644420978689.jpg', '2022-02-09 16:35:45', '2022-02-09 16:36:18');

UNLOCK TABLES;

-- -----------------------------------------------------
-- Table `groupomania`.`post`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `groupomania`.`post` ;

CREATE TABLE IF NOT EXISTS `groupomania`.`post` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` TEXT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  `link` VARCHAR(255) NULL DEFAULT NULL,
  `create_time` DATETIME NOT NULL DEFAULT NOW(),
  `update_time` DATETIME NOT NULL DEFAULT NOW(),
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_post_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_post_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `groupomania`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Dumping data to `groupomania`.`post` table
-- -----------------------------------------------------

LOCK TABLES 'post' WRITE;
INSERT INTO post (content, image, link, create_time, update_time, user_id) 
VALUES 
("Les chiffres sont tombés tôt ce matin. Je tenais à saluer le travail de l'ensemble des différentes équipes, nous nous rapprochons de nos concurrents en matière de PDM. Bravo à tous pour ces résultats exceptionnels.", "http://localhost:3000/images/PDM1644405333893.jpg", "https://fr.statista.com/", "2022-02-09 12:15:33", "2022-02-09 12:15:33", 38), 
("Nous recrutons 2 vendeurs pour l'équipe de BREST au département Grand-Bazar: rayon électroménager. Merci de transmettre l'information via vos différents réseaux. C'est urgent !!!", 'http://localhost:3000/images/on-recrute1644405815260.jpg', 'groupomania-brest.com', '2022-02-09 12:23:36', '2022-02-09 12:23:36', 39), 
("L'offre est désormais disponible sur le réseau Indeed concernant l'équipe de BREST, n'hésitez pas à nous faire un retour sur le contenu de l'annonce.", "http://localhost:3000/images/offre_d'emploi1644413261771.jpg", "https://fr.indeed.com/emplois?q=vendeur%20magasin&l=Brest%20(29)&vjk=5e14cd8bad1cf097", "2022-02-09 14:27:41", "2022-02-09 14:27:41", 40), 
("Salut les collègues! Dans le cadre du renouvellement 2022 concernant notre partenariat avec l'entreprise Delonghi pour les machines à café en salle de pause. Nous avons sélectionné cette machine à café, dites-moi ce que vous en pensez. Je vous laisse consulter leur site via le lien pour de meilleures propositions.", "http://localhost:3000/images/machine1644415090540.jpg", "https://www.delonghi.com/fr-be", "2022-02-09 14:58:10", "2022-02-09 14:58:10", 42), 
("Nous avons réalisé une magnifique opération de facing aujourd'hui à Paris au rayon liquide, je vous poste un petit aperçu du résultat obtenu. Pour ceux que ça intéresse, les plans cette implantation rayon sont dans le serveur D, le dossier: implantation RL.", "http://localhost:3000/images/rayon1644415941544.jpg", NULL, "2022-02-09 15:12:21", "2022-02-09 15:12:21", 43), 
("Petit rappel: pour celle et ceux qui n'ont pas pu prendre connaissance du mail. La réorganisation du rayon ameublement a été validé fin Janvier par le comité logistique. Voici un visuel de la nouvelle organisation pour la réserve de notre magasin à Lyon. L'ensemble des magasins devront respecter la même organisation d'ici fin avril 2022. Je vous laisse prendre connaissance du visuel, à votre dispo si besoin. Bon courage à tous :)", "http://localhost:3000/images/reserve1644416955029.jpg", NULL, "2022-02-09 15:29:15", "2022-02-09 15:29:15", 44), 
("Suite aux bons résultats de cette fin d'année 2021 et cela malgré la crise du COVID 19 ayant impacté encore de nombreuses entreprises. La direction me confirme que le séminaire de mars 2022 est validé et maintenu afin de remercier l'excellent travail des différentes équipes. Nous partons donc 3 jours à Barcelone en Espagne le 24-25-26 mars.", "http://localhost:3000/images/espagne1644419181094.jpg", "https://all.accor.com/hotel/5560/index.fr.shtml", "2022-02-09 16:06:21", "2022-02-09 16:06:21", 45), 
("Je vous transmets le résultat de l'audit du mois dernier. Le magasin de Lille a obtenu la note de 18/20 (Bravo à l'ensemble des équipes de Lille). Le client mystère a particulièrement apprécié la bonne tenue du magasin et nous l'a fait savoir en nous transmettant cette photo. Ps: l'audit complet est disponible sur le serveur interne.", "http://localhost:3000/images/rayon-lille1644420384962.jpg", "serveur-interne-audit-complet-groupomania-france", "2022-02-09 16:26:24", "2022-02-09 16:26:24" , 46), 
("Nous venons de procéder à la signature du contrat concernant la prise en charge de notre service livraison pour le dernier trimestre 2022. Le prestataire retenu par la direction est UPS. Je vous laisse prendre connaissance de leur site en amont pour une meilleure prise en main. La date définitive sera communiquée ici  notre réseau social et par mail prochainement.", "http://localhost:3000/images/contrat1644421457401.jpg", "https://www.ups.com/fr/fr/services/small-business.page", "2022-02-09 16:44:17", "2022-02-09 16:44:17", 47);


UNLOCK TABLES;

-- -----------------------------------------------------
-- Table `groupomania`.`comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `groupomania`.`comment` ;

CREATE TABLE IF NOT EXISTS `groupomania`.`comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` TEXT NOT NULL,
  `create_time` DATETIME NOT NULL DEFAULT NOW(),
  `update_time` DATETIME NOT NULL DEFAULT NOW(),
  `user_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`, `post_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_comment_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_comment_post1_idx` (`post_id` ASC) VISIBLE,
  CONSTRAINT `fk_comment_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `groupomania`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_comment_post1`
    FOREIGN KEY (`post_id`)
    REFERENCES `groupomania`.`post` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Dumping data to `groupomania`.`comment` table
-- -----------------------------------------------------

LOCK TABLES 'comment' WRITE;
INSERT INTO `comment` (content, create_time, update_time, user_id, post_id) 
VALUES 
("Merci Nathalie, je m'occupe de poster l'annonce sur Indeed dans l'heure.", '2022-02-09 12:28:36', '2022-02-09 12:28:36', 3, 2), 
("Bravo à tous :)", '2022-02-09 14:29:26', '2022-02-09 14:29:26', 3, 1), 
("L'annonce est claire et concise.
Très beau travail, j'aime beaucoup :)", '2022-02-09 14:38:46', '2022-02-09 14:38:46', 4, 3), 
("Beau travail!!!
Merci Bertrand pour les chiffres, je m'occupe de faire un mail général aux différentes équipes avec le détail des chiffres par départements et villes.", '2022-02-09 14:40:49', '2022-02-09 14:40:49', 4, 1), 
("Salut Rayane, personnellement je n'aime pas trop, je préfère préserver le même modèle que 2021.", '2022-02-09 15:04:07', '2022-02-09 15:04:07', 6, 4), 
("Je préfère l'organisation d'avant mais beau travail :)", '2022-02-09 15:30:16', '2022-02-09 15:30:16', 7, 5), 
("Yes, je suis du même avis que Jerôme", '2022-02-09 15:30:54', '2022-02-09 15:30:54', 7, 4), 
("La concurrence n'a qu'à bien se tenir 2022 sera notre année!!!!!!", '2022-02-09 15:32:12', '2022-02-09 15:32:12', 7, 1), 
("Nathalie, j'ai un CV pour toi d'une personne que je connais à BREST, je te fais suivre le CV par mail.", '2022-02-09 15:33:23', '2022-02-09 15:33:23', 7, 2), 
("Hey Hey la PDM augmente, la digitalisation de nos différents services porte ces fruits.", '2022-02-09 15:40:01', '2022-02-09 15:40:01', 7, 1), 
("Je trouve Indeed peu pertinent pour notre secteur d'activité, mais la rédaction de l'offre est claire je recommande le site du pôle emploi directement.", '2022-02-09 15:46:07', '2022-02-09 15:46:07', 7, 3), 
("Le facing est parfait :) 
Bien joué Jerôme.", '2022-02-09 15:49:49', '2022-02-09 15:49:49', 8, 5), 
("Merci pour le lien Rayane, je viens de consulter le site de la marque, moi je trouve au contraire que tu as trouvé le meilleur modèle. 
C'est un grand OUI pour moi :)
Hâte de me faire un cappuccino.....", '2022-02-09 15:51:58', '2022-02-09 15:51:58', 8, 4), 
("Merci Bertrand pour les chiffres, je viens de confirmer à l'ensemble des équipes la validation du séminaire :) 
Bravo à tous, ces chiffres sont bien mérités.", '2022-02-09 16:08:44', '2022-02-09 16:08:44', 8, 1), 
("Salut Samira, si tu veux il y'a Linkedin qui fonctionne bien aussi. Personnellement je ne suis pas très fan d'Indeed.", '2022-02-09 16:12:05', '2022-02-09 16:12:05', 8, 3), 
("Génial, merci Tanyaa pour cette magnifique nouvelle!!!!", '2022-02-09 16:27:06', '2022-02-09 16:27:06', 9, 7), 
("Pas très fan de la nouvelle orga :(", '2022-02-09 16:27:43', '2022-02-09 16:27:43', 9, 6), 
("Je n'aime pas trop cette nouvelle organisation et les nouvelles directives concernant les facing.", '2022-02-09 16:28:50', '2022-02-09 16:28:50', 9, 5), 
("Je préfère le modèle de 2021 également :(", '2022-02-09 16:29:24', '2022-02-09 16:29:24', 9, 4), 
("Parfait, j'ai toujours rêver d'y aller, merci Tanyaa pour cette superbe belle nouvelle!!!!!!!!!!!!!!", '2022-02-09 16:46:55', '2022-02-09 16:46:55', 10, 7);

UNLOCK TABLES;

-- -----------------------------------------------------
-- Table `groupomania`.`user_post_opinion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `groupomania`.`user_post_opinion` ;

CREATE TABLE IF NOT EXISTS `groupomania`.`user_post_opinion` (
  `user_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  `type` TINYINT NOT NULL,
  INDEX `fk_user_has_post_post1_idx` (`post_id` ASC) VISIBLE,
  INDEX `fk_user_has_post_user_idx` (`user_id` ASC) VISIBLE,
  PRIMARY KEY (`user_id`, `post_id`),
  CONSTRAINT `fk_user_has_post_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `groupomania`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_has_post_post1`
    FOREIGN KEY (`post_id`)
    REFERENCES `groupomania`.`post` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Dumping data to `groupomania`.`user_post_opinion`
-- -----------------------------------------------------

LOCK TABLES 'user_post_opinion' WRITE;
INSERT INTO `user_post_opinion` (user_id, post_id, type) 
VALUES 
(2, 1, 1), 
(2, 2, 1), 
(2, 3, 1), 
(3, 1, 1);

UNLOCK TABLES;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
