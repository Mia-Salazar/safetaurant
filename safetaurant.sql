-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-10-2022 a las 19:58:48
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `Foodiesaurus`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `restaurant`
--

CREATE TABLE `restaurant` (
  `restaurantID` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `province` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `ZIP` int(6) NOT NULL,
  `url` int(25) DEFAULT NULL,
  `phone` int(12) DEFAULT NULL,
  `foodType` varchar(40) DEFAULT NULL,
  `userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `scores`
--

CREATE TABLE `scores` (
  `scoreID` int(10) NOT NULL,
  `comment` varchar(300) DEFAULT NULL,
  `created` date DEFAULT NULL,
  `generalScore` int(1) NOT NULL,
  `allergenChart` int(1) NOT NULL,
  `fidelityScore` int(1) NOT NULL,
  `attentionScore` int(1) NOT NULL,
  `userID` int(11) NOT NULL,
  `restaurantID` int(11) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `allergicReaction` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `users` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `google_uid` varchar(255) NOT NULL,
 `name` varchar(255) NOT NULL,
 `email` varchar(255) NOT NULL,
 `picture` text NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `menuOptions` (
  `optionID` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `celiacDisease` int(1) NOT NULL,
  `diabetes` int(1) NOT NULL,
  `lactoseIntolerant` int(1) NOT NULL,
  `fructoseIntolerant` int(1) NOT NULL,
  `Vegan` int(1) NOT NULL,
  `Vegetarian` int(1) NOT NULL,
  `restaurantID` int(11) NOT NULL,
  `userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- CREATE TABLE `user` (
--   `userID` int(10) NOT NULL,
--   `name` varchar(50) NOT NULL,
--   `email` varchar(100) NOT NULL,
--   `birthDate` date NOT NULL,
--   `password` varchar(12) NOT NULL,
--   `surname` varchar(50) DEFAULT NULL,
--   `lactoseIntolerance` int(1) DEFAULT NULL,
--   `celiacDisease` int(1) DEFAULT NULL,
--   `allergies` varchar(200) DEFAULT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

-- Indices de la tabla `menuOptions`
-- ALTER TABLE `menuOptions`
--   ADD PRIMARY KEY (`optionID`),
--   ADD KEY `restaurantID` (`restaurantID`),
--   ADD KEY `userID` (`userID`);

ALTER TABLE `menuOptions`
  ADD CONSTRAINT `restaurant_ibfk_4` FOREIGN KEY (`restaurantID`) REFERENCES `restaurant` (`restaurantID`);
ALTER TABLE `menuOptions`
  ADD CONSTRAINT `restaurant_ibfk_5` FOREIGN KEY (`userID`) REFERENCES `users` (`id`);

--
-- Indices de la tabla `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`restaurantID`),
  ADD KEY `userID` (`userID`);

--
-- Indices de la tabla `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`scoreID`),
  ADD KEY `scores_ibfk_2` (`restaurantID`),
  ADD KEY `userID` (`userID`);

--
-- Indices de la tabla `user`
--
-- ALTER TABLE `user`
--   ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `restaurantID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `scores`
--
ALTER TABLE `scores`
  MODIFY `scoreID` int(10) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `restaurant`
--
ALTER TABLE `restaurant`
  ADD CONSTRAINT `restaurant_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `scores`
--
ALTER TABLE `scores`
  ADD CONSTRAINT `scores_ibfk_2` FOREIGN KEY (`restaurantID`) REFERENCES `restaurant` (`restaurantID`),
  ADD CONSTRAINT `scores_ibfk_3` FOREIGN KEY (`userID`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
