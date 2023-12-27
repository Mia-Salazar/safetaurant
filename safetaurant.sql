-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-12-2023 a las 16:54:17
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
-- Base de datos: `safetaurant`
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
  `ZIP` int(6) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `foodType` varchar(40) DEFAULT NULL,
  `userID` int(11) NOT NULL,
  `latitude` int(12) DEFAULT NULL,
  `longitude` int(12) DEFAULT NULL,
  `apiID` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `restaurant`
--

INSERT INTO `restaurant` (`restaurantID`, `name`, `province`, `address`, `ZIP`, `url`, `phone`, `foodType`, `userID`, `latitude`, `longitude`, `apiID`) VALUES
(0, 'Sushirakki    ', 'Comunidad de Madrid    ', 'Calle de Antonio López Aguado, 28029 Madrid, España', 28029, '0    ', '34', 'Japonesa', 1, 40, -4, '5133ba72ac419e0dc059db19e290b23d4440f00103f901189251210100000092030a537573686972616b6b69    ');

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

--
-- Volcado de datos para la tabla `scores`
--

INSERT INTO `scores` (`scoreID`, `comment`, `created`, `generalScore`, `allergenChart`, `fidelityScore`, `attentionScore`, `userID`, `restaurantID`, `userName`, `allergicReaction`) VALUES
(0, '', '2023-12-27', 5, 0, 0, 5, 1, 0, 'María Salazar', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`restaurantID`),
  ADD KEY `restaurant_ibfk_1` (`userID`);

--
-- Indices de la tabla `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`scoreID`),
  ADD KEY `scores_ibfk_2` (`restaurantID`),
  ADD KEY `scores_ibfk_3` (`userID`);

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
