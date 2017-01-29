-- Généré le :  Dim 22 Janvier 2017

CREATE DATABASE  IF NOT EXISTS `pictionnary` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `pictionnary`;

--
-- Base de données :  `pictionnary`
--

-- --------------------------------------------------------

--
-- Structure de la table `drawings`
--
DROP TABLE IF EXISTS `drawings`;
CREATE TABLE `drawings` (
  `d_id` int(11) NOT NULL AUTO_INCREMENT,
  `d_commandes` blob NOT NULL,
  `d_image` blob NOT NULL,
  `d_reponse` varchar(65) NOT NULL,
  `d_dificulte` int(1) DEFAULT 1,
  `d_fk_u_id` int(11) NOT NULL,
  PRIMARY KEY (`d_id`)
);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_email` varchar(65) NOT NULL,
  `u_password` varchar(65) NOT NULL,
  `u_nom` varchar(65) DEFAULT NULL,
  `u_prenom` varchar(65) DEFAULT NULL,
  `u_tel` varchar(16) DEFAULT NULL,
  `u_website` varchar(65) DEFAULT NULL,
  `u_sexe` char(1) DEFAULT NULL,
  `u_birthdate` date NOT NULL,
  `u_ville` varchar(65) DEFAULT NULL,
  `u_taille` float(6) DEFAULT NULL,
  `u_couleur` char(6) DEFAULT '000000',
  `u_profilepic` blob,
  `u_score` int(6) DEFAULT 0,
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `email` (`u_email`)
);


-- --------------------------------------------------------

--
-- Structure de la table `winner`
--
DROP TABLE IF EXISTS `winner`;
CREATE TABLE `winner` (
  `w_d_id` int(11) NOT NULL,
  `w_u_id` int(11) NOT NULL,
  PRIMARY KEY (`w_d_id`,`w_u_id`)
);
