-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-10-2022 a las 22:00:13
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
-- Estructura de tabla para la tabla `averages`
--

CREATE TABLE `averages` (
  `averageID` int(11) NOT NULL,
  `restaurantID` int(11) NOT NULL,
  `generalScore` int(1) NOT NULL,
  `allergenChart` int(1) NOT NULL,
  `fidelityScore` int(1) NOT NULL,
  `attentionScore` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `averages`
--

INSERT INTO `averages` (`averageID`, `restaurantID`, `generalScore`, `allergenChart`, `fidelityScore`, `attentionScore`) VALUES
(1, 2, 1, 1, 1, 1),
(2, 13, 5, 0, 0, 5),
(3, 14, 5, 0, 0, 5),
(4, 15, 5, 0, 0, 5);

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
  `phone` int(12) DEFAULT NULL,
  `foodType` varchar(40) DEFAULT NULL,
  `userID` int(10) NOT NULL,
  `CCAA` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `restaurant`
--

INSERT INTO `restaurant` (`restaurantID`, `name`, `province`, `address`, `ZIP`, `phone`, `foodType`, `userID`, `CCAA`) VALUES
(2, 'Doggo', 'Madrid', 'C. de Juan de Austria, 25, Madrid', 28010, 0, 'Americana', 28, 'Comunidad de Madrid'),
(3, '', '', '', 0, 0, '', 28, ''),
(4, '', '', '', 0, 0, '', 28, ''),
(5, 'aaa', 'Córdoba', 'Plaza Riba', 28029, 0, 'Fusión', 28, 'Andalucía'),
(6, 'aa', 'Madrid', 'Plaza Ribadeo 7 bajo ', 28029, 0, '', 28, 'Cantabria'),
(7, 'bbbbb', 'Madrid', 'Plaza Ribadeo 7 bajo ', 28029, 0, '', 28, 'Cantabria'),
(8, 'hh', 'Albacete', 'Plaza Riba', 28029, 0, '', 28, 'Andalucía'),
(9, 'ddddd', 'Almería', 'Plaza Riba', 11111, 0, 'Vietnamita', 28, 'Castilla y León'),
(10, 'eeeeee', 'Almería', 'Plaza Riba', 11111, 0, 'Vietnamita', 28, 'Castilla y León'),
(11, 'ffff', 'Alicante', 'Plaza Riba', 28021, 0, 'Pastelería', 28, 'Cataluña'),
(12, 'hh', 'Alicante', 'Plaza Riba', 28021, 0, 'Pastelería', 28, 'Cataluña'),
(13, 'hhhhhh', 'Alicante', 'Plaza Riba', 28021, 0, 'Pastelería', 28, 'Cataluña'),
(14, 'hh', 'Alava', 'aaaaa', 12345, 0, 'Americana', 28, 'Andalucía'),
(15, 'Nuevo', 'Alava', 'example', 41017, 0, 'Vegana', 28, 'Aragón');

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
  `userID` int(10) NOT NULL,
  `restaurantID` int(11) NOT NULL,
  `userName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `scores`
--

INSERT INTO `scores` (`scoreID`, `comment`, `created`, `generalScore`, `allergenChart`, `fidelityScore`, `attentionScore`, `userID`, `restaurantID`, `userName`) VALUES
(1, '', '0000-00-00', 0, 0, 0, 0, 28, 7, 'María 22'),
(2, '', '2022-10-09', 0, 0, 0, 0, 28, 8, 'María 22'),
(3, '', '2022-10-09', 5, 0, 0, 5, 28, 9, 'María 22'),
(4, '', '2022-10-09', 5, 0, 0, 5, 28, 10, 'María 22'),
(5, '', '2022-10-09', 5, 0, 0, 5, 28, 11, 'María 22'),
(6, '', '2022-10-09', 5, 0, 0, 5, 28, 12, 'María 22'),
(7, '', '2022-10-09', 5, 0, 0, 5, 28, 13, 'María 22'),
(8, '', '2022-10-10', 5, 0, 0, 5, 28, 14, 'María 22'),
(9, 'Holi', '2022-10-14', 5, 0, 0, 5, 28, 15, 'María 22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `userID` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `birthDate` date NOT NULL,
  `password` varchar(12) NOT NULL,
  `surname` varchar(50) DEFAULT NULL,
  `lactoseIntolerance` int(1) DEFAULT NULL,
  `celiacDisease` int(1) DEFAULT NULL,
  `allergies` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`userID`, `name`, `email`, `birthDate`, `password`, `surname`, `lactoseIntolerance`, `celiacDisease`, `allergies`) VALUES
(28, 'María 22', 'test@gmail.com', '2022-10-01', '12345678', 'Salazar García-Rosales', 1, 1, 'aaaaa');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `averages`
--
ALTER TABLE `averages`
  ADD PRIMARY KEY (`averageID`),
  ADD KEY `RestaurantID` (`restaurantID`);

--
-- Indices de la tabla `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`restaurantID`),
  ADD KEY `UserID` (`userID`);

--
-- Indices de la tabla `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`scoreID`),
  ADD KEY `UserID` (`userID`),
  ADD KEY `RestaurantID` (`restaurantID`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `averages`
--
ALTER TABLE `averages`
  MODIFY `averageID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `restaurantID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `scores`
--
ALTER TABLE `scores`
  MODIFY `scoreID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `averages`
--
ALTER TABLE `averages`
  ADD CONSTRAINT `averages_ibfk_1` FOREIGN KEY (`RestaurantID`) REFERENCES `restaurant` (`RestaurantID`);

--
-- Filtros para la tabla `restaurant`
--
ALTER TABLE `restaurant`
  ADD CONSTRAINT `restaurant_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`);

--
-- Filtros para la tabla `scores`
--
ALTER TABLE `scores`
  ADD CONSTRAINT `scores_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`),
  ADD CONSTRAINT `scores_ibfk_2` FOREIGN KEY (`RestaurantID`) REFERENCES `restaurant` (`RestaurantID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
