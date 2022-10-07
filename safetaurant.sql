-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-10-2022 a las 12:19:32
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
  `AverageID` int(11) NOT NULL,
  `RestaurantID` int(11) NOT NULL,
  `GeneralScore` int(1) NOT NULL,
  `AllergenChart` int(1) NOT NULL,
  `FidelityScore` int(1) NOT NULL,
  `AtentionScore` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `restaurant`
--

CREATE TABLE `restaurant` (
  `RestaurantID` int(11) NOT NULL,
  `Name` varchar(40) NOT NULL,
  `Province` varchar(50) NOT NULL,
  `Address` varchar(100) NOT NULL,
  `ZIP` int(6) NOT NULL,
  `Phone` int(12) DEFAULT NULL,
  `FoodType` varchar(40) DEFAULT NULL,
  `UserID` int(10) NOT NULL,
  `CCAA` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `scores`
--

CREATE TABLE `scores` (
  `ScoreID` int(10) NOT NULL,
  `Comment` varchar(300) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `GeneralScore` int(1) NOT NULL,
  `AllergenChart` int(1) NOT NULL,
  `FidelityScore` int(1) NOT NULL,
  `AtentionScore` int(1) NOT NULL,
  `UserID` int(10) NOT NULL,
  `RestaurantID` int(11) NOT NULL,
  `UserName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `UserID` int(10) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `BirthDate` date NOT NULL,
  `Password` varchar(12) NOT NULL,
  `Surname` varchar(50) DEFAULT NULL,
  `LactoseIntolerance` int(1) DEFAULT NULL,
  `CeliacDisease` int(1) DEFAULT NULL,
  `Allergies` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`UserID`, `Name`, `Email`, `BirthDate`, `Password`, `Surname`, `LactoseIntolerance`, `CeliacDisease`, `Allergies`) VALUES
(28, 'María 22', 'test@gmail.com', '2022-10-01', '12345678', 'Salazar García-Rosales', 1, 1, 'aaaaa');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `averages`
--
ALTER TABLE `averages`
  ADD PRIMARY KEY (`AverageID`),
  ADD KEY `RestaurantID` (`RestaurantID`);

--
-- Indices de la tabla `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`RestaurantID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indices de la tabla `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`ScoreID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `RestaurantID` (`RestaurantID`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `averages`
--
ALTER TABLE `averages`
  MODIFY `AverageID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `RestaurantID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `scores`
--
ALTER TABLE `scores`
  MODIFY `ScoreID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `UserID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

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
