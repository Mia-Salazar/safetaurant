-- phpMyAdmin SQL Dump
-- version 4.9.11
-- https://www.phpmyadmin.net/
--
-- Host: db5012427505.hosting-data.io
-- Generation Time: Apr 14, 2025 at 08:03 AM
-- Server version: 10.6.15-MariaDB-1:10.6.15+maria~deb11-log
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbs10448932`
--

-- --------------------------------------------------------

--
-- Table structure for table `menuOptions`
--

CREATE TABLE `menuOptions` (
  `optionID` int(11) NOT NULL,
  `celiacDisease` int(1) NOT NULL,
  `diabetes` int(1) NOT NULL,
  `lactoseIntolerant` int(1) NOT NULL,
  `fructoseIntolerant` int(1) NOT NULL,
  `vegan` int(1) NOT NULL,
  `vegetarian` int(1) NOT NULL,
  `restaurantID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `accesibleMenu` int(1) DEFAULT NULL,
  `accesibleTable` int(1) DEFAULT NULL,
  `accesibleParking` int(1) DEFAULT NULL,
  `accesibleBathroom` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menuOptions`
--

INSERT INTO `menuOptions` (`optionID`, `celiacDisease`, `diabetes`, `lactoseIntolerant`, `fructoseIntolerant`, `vegan`, `vegetarian`, `restaurantID`, `userID`, `accesibleMenu`, `accesibleTable`, `accesibleParking`, `accesibleBathroom`) VALUES
(1, 0, 2, 2, 2, 1, 0, 2, 1, NULL, NULL, NULL, NULL),
(5, 1, 1, 0, 2, 1, 0, 11, 1, NULL, NULL, NULL, NULL),
(6, 0, 2, 1, 1, 0, 0, 12, 1, NULL, NULL, NULL, NULL),
(7, 2, 1, 1, 1, 0, 0, 13, 1, NULL, NULL, NULL, NULL),
(8, 0, 1, 1, 1, 1, 0, 14, 1, NULL, NULL, NULL, NULL),
(9, 0, 0, 0, 0, 0, 0, 15, 2, NULL, NULL, NULL, NULL),
(10, 0, 1, 1, 1, 0, 0, 16, 1, NULL, NULL, NULL, NULL),
(11, 0, 1, 2, 2, 0, 0, 17, 1, NULL, NULL, NULL, NULL),
(12, 1, 2, 2, 2, 0, 0, 18, 1, NULL, NULL, NULL, NULL),
(13, 1, 2, 2, 2, 0, 0, 19, 1, NULL, NULL, NULL, NULL),
(14, 0, 2, 0, 2, 0, 0, 20, 1, NULL, NULL, NULL, NULL),
(15, 0, 2, 1, 1, 1, 1, 21, 1, NULL, NULL, NULL, NULL),
(16, 2, 2, 2, 2, 2, 0, 22, 1, NULL, NULL, NULL, NULL),
(17, 2, 2, 2, 2, 2, 2, 23, 1, NULL, NULL, NULL, NULL),
(18, 0, 2, 0, 2, 1, 0, 24, 1, NULL, NULL, NULL, NULL),
(19, 0, 2, 1, 1, 0, 0, 25, 3, NULL, NULL, NULL, NULL),
(20, 0, 2, 2, 2, 0, 0, 26, 2, NULL, NULL, NULL, NULL),
(21, 1, 2, 2, 2, 1, 0, 27, 1, NULL, NULL, NULL, NULL),
(22, 0, 2, 2, 2, 2, 0, 28, 1, NULL, NULL, NULL, NULL),
(23, 0, 2, 2, 2, 0, 0, 29, 1, NULL, NULL, NULL, NULL),
(24, 0, 2, 0, 2, 0, 0, 20, 2, NULL, NULL, NULL, NULL),
(25, 0, 0, 0, 0, 2, 2, 30, 3, NULL, NULL, NULL, NULL),
(26, 0, 2, 2, 2, 0, 0, 31, 1, NULL, NULL, NULL, NULL),
(27, 2, 2, 2, 2, 2, 0, 32, 1, NULL, NULL, NULL, NULL),
(28, 0, 2, 2, 2, 2, 2, 33, 1, NULL, NULL, NULL, NULL),
(29, 0, 2, 2, 2, 2, 0, 34, 1, NULL, NULL, NULL, NULL),
(30, 0, 2, 0, 2, 0, 0, 35, 1, NULL, NULL, NULL, NULL),
(31, 1, 2, 2, 2, 0, 0, 36, 1, NULL, NULL, NULL, NULL),
(32, 0, 2, 2, 2, 0, 0, 37, 1, NULL, NULL, NULL, NULL),
(33, 0, 2, 2, 2, 2, 2, 38, 10, NULL, NULL, NULL, NULL),
(34, 0, 0, 0, 2, 0, 0, 39, 12, NULL, NULL, NULL, NULL),
(35, 2, 2, 2, 2, 2, 2, 40, 19, NULL, NULL, NULL, NULL),
(36, 0, 2, 0, 2, 0, 0, 41, 22, NULL, NULL, NULL, NULL),
(37, 0, 2, 0, 2, 0, 0, 42, 9, NULL, NULL, NULL, NULL),
(38, 0, 2, 0, 2, 0, 0, 43, 9, NULL, NULL, NULL, NULL),
(39, 2, 2, 2, 2, 2, 2, 44, 23, NULL, NULL, NULL, NULL),
(40, 2, 2, 2, 2, 2, 2, 45, 25, NULL, NULL, NULL, NULL),
(41, 0, 0, 0, 2, 0, 0, 46, 27, NULL, NULL, NULL, NULL),
(42, 2, 2, 2, 2, 0, 0, 47, 3, NULL, NULL, NULL, NULL),
(43, 0, 0, 0, 2, 0, 0, 48, 3, NULL, NULL, NULL, NULL),
(44, 2, 2, 2, 2, 0, 0, 49, 2, NULL, NULL, NULL, NULL),
(45, 2, 2, 2, 2, 2, 2, 50, 1, NULL, NULL, NULL, NULL),
(46, 0, 0, 0, 0, 1, 0, 51, 3, NULL, NULL, NULL, NULL),
(47, 2, 2, 2, 2, 2, 2, 52, 42, NULL, NULL, NULL, NULL),
(48, 0, 1, 1, 1, 0, 0, 53, 1, NULL, NULL, NULL, NULL),
(49, 0, 1, 0, 0, 0, 0, 21, 1, NULL, NULL, NULL, NULL),
(50, 0, 1, 1, 1, 0, 0, 19, 1, NULL, NULL, NULL, NULL),
(52, 0, 0, 0, 2, 2, 2, 55, 4, NULL, NULL, NULL, NULL),
(54, 1, 1, 1, 2, 0, 0, 57, 44, 2, 0, 2, 0),
(55, 0, 1, 0, 1, 0, 0, 58, 1, 1, 1, 1, 1),
(56, 2, 2, 2, 2, 2, 2, 59, 46, 2, 2, 2, 2),
(57, 0, 2, 0, 2, 0, 0, 61, 42, 2, 2, 1, 2),
(58, 0, 2, 0, 2, 0, 0, 61, 42, 2, 2, 1, 2),
(59, 2, 2, 0, 2, 2, 2, 63, 3, 0, 0, 0, 2),
(60, 2, 2, 0, 2, 2, 2, 63, 3, 0, 0, 0, 2),
(61, 1, 2, 2, 2, 2, 2, 64, 52, 2, 2, 2, 2),
(62, 1, 2, 2, 2, 2, 2, 64, 52, 2, 2, 2, 2),
(63, 0, 1, 0, 2, 0, 0, 67, 42, 2, 0, 1, 0),
(64, 0, 1, 0, 2, 0, 0, 67, 42, 2, 0, 1, 0),
(65, 0, 2, 0, 2, 1, 0, 71, 42, 2, 1, 1, 0),
(66, 0, 2, 0, 2, 1, 0, 71, 42, 2, 1, 1, 0),
(67, 0, 2, 0, 2, 1, 0, 71, 42, 2, 1, 1, 0),
(68, 0, 2, 0, 2, 1, 0, 71, 42, 2, 1, 1, 0),
(69, 0, 1, 0, 2, 0, 0, 73, 1, 1, 1, 1, 2),
(70, 0, 1, 0, 2, 0, 0, 73, 1, 1, 1, 1, 2),
(71, 0, 2, 0, 2, 1, 0, 75, 1, 1, 1, 1, 1),
(72, 0, 2, 0, 2, 1, 0, 75, 1, 1, 1, 1, 1),
(73, 1, 1, 0, 1, 1, 0, 77, 1, 1, 1, 1, 1),
(74, 1, 1, 0, 1, 1, 0, 77, 1, 1, 1, 1, 1),
(75, 0, 1, 1, 1, 1, 0, 78, 1, 1, 1, 1, 1),
(76, 0, 1, 1, 1, 1, 0, 78, 1, 1, 1, 1, 1),
(77, 1, 1, 1, 1, 0, 0, 80, 1, 1, 1, 1, 2),
(78, 0, 2, 2, 2, 2, 2, 81, 57, 2, 2, 2, 2),
(79, 2, 2, 2, 2, 2, 2, 82, 1, 2, 1, 1, 1),
(80, 0, 1, 1, 1, 0, 0, 19, 1, 1, 0, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `restaurant`
--

CREATE TABLE `restaurant` (
  `restaurantID` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `province` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `ZIP` int(6) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `phone` int(12) DEFAULT NULL,
  `foodType` varchar(40) DEFAULT NULL,
  `userID` int(11) NOT NULL,
  `latitude` varchar(12) DEFAULT NULL,
  `longitude` varchar(12) DEFAULT NULL,
  `apiID` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `restaurant`
--

INSERT INTO `restaurant` (`restaurantID`, `name`, `province`, `address`, `ZIP`, `url`, `phone`, `foodType`, `userID`, `latitude`, `longitude`, `apiID`) VALUES
(2, 'Doggo', 'Madrid', 'Calle de Juan de Austria, 25', 28010, 'https://maddoggo.com/', 914440491, 'Americana', 1, '40.4337504', '-3.7000111', NULL),
(11, 'Pizzería María', 'Sevilla', 'Calle de el Campo de la Verdad, 3', 41020, 'https://pizzeriamariasevilla.com/', 954404608, 'Pizza', 1, '37.3882473,', '-5.9243529', NULL),
(12, 'Billios', 'Sevilla', 'Avenida de la Innovación 3', 41020, 'https://bilios.net/', 954260202, 'Americana', 1, '37.4007024', '-5.9987338', NULL),
(13, 'El Cuenco Dorado', 'Burgos', 'Calle De Fernán González, 48', 9003, 'https://www.instagram.com/cuencodorado/?hl=es', 947079067, 'Japonesa', 1, '42.3478137', '-3.7165596', NULL),
(14, 'Brutal Nonsolobar', 'Cádiz', 'Plaza Poeta Rafael Alberti, Puerto Real ', 11510, '', 623270128, 'Italiana', 1, '36.5263514', '-6.1911998', NULL),
(15, 'Mamá Elba Heladería', 'Madrid', 'Calle de la Ruda, 15, 28005 Madrid', 28005, 'https://mamaelba.com/', 910565392, 'Heladería', 2, '40.4105226', '-3.7108058', NULL),
(16, 'Seoul', 'Sevilla', 'Avenida de la Innovación, 3', 41020, '', 688097672, 'Coreana', 1, '37.4077935', '-5.9354906', NULL),
(17, 'Konnichiwa de Fuencarral', 'Madrid', 'Calle de Fuencarral, 98', 28004, 'https://konnichiwa.es/', 914455442, 'Japonesa', 1, '40.4278861', '-3.7043582', NULL),
(18, 'Ninja Ramen', 'Madrid', 'Calle de Barceló, 1', 28004, 'https://restauranteninja.es/', 914939993, 'Japonesa', 1, '40.4265172', '-3.703563', NULL),
(19, 'Ramen Kagura Barrio del Pilar', 'Madrid', 'Calle de Antonio López Aguado, 10', 28029, 'https://www.ramenkagura.com/es/barrio-del-pilar/', 912357080, 'Japonesa', 1, '40.4824282', '-3.7036422', NULL),
(20, 'Freedom cakes', 'Madrid', 'Calle de Cádiz, 7', 28012, 'https://freedomcakes.es/', 910741347, 'Vegana', 1, '40.4158876', '-3.7053419', NULL),
(21, 'Hattori Hanzo', 'Madrid', 'Calle de Mesonero Romanos, 17', 28004, 'https://hattori-hanzo.com.es/', 917865780, 'Japonesa', 1, '40.4209596', '-3.7067174', NULL),
(22, 'Running Sushi in Akihabara', 'Madrid', 'Calle Princesa Pl. Cubos, 3', 28008, 'https://www.runningsushi.es/', 915967699, 'Japonesa', 1, '40.425043', '-3.7131738', NULL),
(23, 'Udon Sol', 'Madrid', 'Calle de la Montera, 12', 28013, 'https://www.udon.com/', 915326949, 'Japonesa', 1, '40.4160788', '-3.7042539', NULL),
(24, 'Friki Pizza', 'Madrid', 'Calle de Alcántara, 71', 28006, 'https://frikipizza.es/menu.html', 688646246, 'Pizza', 1, '40.4330202', '-3.6736138', NULL),
(25, 'La Musa Latina', 'Madrid', 'Costanilla de San Andrés, 12, 28005 Madrid', 28005, 'https://grupolamusa.com/restaurante-musa-latina/', 913540255, 'Tapas', 3, '40.4127847', '-3.7145834', NULL),
(26, 'La Mordida', 'Madrid', 'Calle de las Fuentes, 3, 28013 Madrid', 28013, '', 0, 'Mexicana', 2, '40.4169643', '-3.7113803', NULL),
(27, 'Mashita', 'Madrid', 'Calle de la Bola, 12, 28013 Madrid', 28013, '', 915426047, 'Coreana', 1, '40.4204952', '-3.7121079', NULL),
(28, 'Arirang', 'Madrid', 'Calle de la Bola, 12, 28013 Madrid', 28013, '', 910298260, 'Coreana', 1, '40.4205735', '-3.7119801', NULL),
(29, 'Tapa Tapa Arenal', 'Madrid', 'Calle del Arenal, 15, 28013 Madrid', 28013, '', 917584488, 'Americana', 1, '40.4174139', '-3.7102308', NULL),
(30, 'Tgi Friday ', 'Madrid', 'Av. de Monforte de Lemos, 36, 28029 Madrid', 28029, '', 912759555, 'Americana', 3, '40.4799938', '-3.707478', NULL),
(31, 'Comic Planet: American food & drink', 'Madrid', 'Av. de Alberto de Alcocer, 5, 28036 Madrid', 28036, 'https://comicplanet.es/', 915999659, 'Americana', 1, '40.4595942', '-3.6911704', NULL),
(32, 'La Damasquina', 'Madrid', 'C. de Costa Rica, 24, 28016 Madrid', 28016, 'https://ladamasquinagourmet.com/', 622372254, 'Otro', 1, '40.4582847', '-3.6759462', NULL),
(33, 'Burnout', 'Madrid', 'Calle de Fuencarral, 148, 28010 Madrid', 28010, '', 912680938, 'Hamburguesa', 1, '40.432477', '-3.7062549', NULL),
(34, 'Grosso Napoletano', 'Madrid', 'Calle, P.º de La Habana, 27, 28036 Madrid', 28036, 'https://www.grossonapoletano.com/', 910053692, 'Pizza', 1, '40.4513561', '-3.6891778', NULL),
(35, 'Okashi Sanda', 'Madrid', 'C. de San Vicente Ferrer, 22, 28004 Madrid', 28004, 'https://www.okashisanda.com/', 913654402, 'Japonesa', 1, '40.4257501', '-3.7058428', NULL),
(36, 'Spoiler bar', 'Madrid', 'Calle . de Rafael de Riego, 25, 28045 Madrid', 28045, 'https://spoilerbarmadrid.com/', 910176254, 'Americana', 1, '40.4026277', '-3.6947296', NULL),
(37, 'Solidere', 'Madrid', 'Av. de Alfonso XIII, 39, 28002 Madrid', 28002, 'https://restaurantesolidere.com/', 914152107, 'Otro', 1, '40.4520242', '-3.6703479', NULL),
(38, 'Mey Chen', 'Valencia', 'Avd. Del Primat Reig, 163', 46020, '', 963626666, 'China', 10, '39.4815098', '-0.3615084', NULL),
(39, 'MEET Vegano', 'Málaga', 'Marín García, 6', 29005, 'https://www.meetvegano.es/', 673402822, 'Vegana', 12, '36.7192499', '-4.4251345', NULL),
(40, 'La Cartería ', 'Cantabria', 'C. Cam. Real, 49,  Cartes, Cantabria', 39311, 'https://restaurantelacarteria.com/', 0, 'Otro', 19, '43.3264649', '-4.0712427', NULL),
(41, 'Lalina bravas y tapas', 'Madrid', 'C. de Gravina, 18, Madrid', 28004, 'https://restaurantelalina.com/', 910255247, 'Tapas', 22, '40.4226209', '-3.699053', NULL),
(42, 'Artemisa Sol Gran Vía', 'Madrid', 'C. Tres Cruces, 4', 28013, 'https://restaurantesvegetarianosartemisa.com/', 915218721, 'Vegetariana', 9, '40.4192584', '-3.7054408', NULL),
(43, 'Artemisa Sol Huertas', 'Madrid', 'C. Ventura de la Vega, 4 (Huertas)', 28014, 'https://restaurantesvegetarianosartemisa.com/', 914295092, 'Vegetariana', 9, '40.4160178', '-3.7015', NULL),
(44, 'La Cantinaccia', 'Burgos', 'Calle Soria, 12, Aranda de Duero, Burgos', 9400, 'http://lacantinaccia.es/', 947507150, 'Italiana', 23, '41.6722', '-3.6872749', NULL),
(45, 'Begin - Origen', 'Valencia', 'Av. Cortes Valencianas, 50', 46015, 'http://www.beginrestaurante.com', 0, 'Fusión', 25, '39.493861', '-0.4036173', NULL),
(46, 'La Libélula Vegan Café', 'Málaga', 'Calle Cataluña, Calle Espínar, esquina', 29640, 'https://lalibelulavegan.com/', 661943766, 'Vegana', 27, '36.5390692', '-4.6313984', NULL),
(47, 'Burger food porn', 'Sevilla', 'Avenida de Alemania, 15', 41012, '', 653163250, 'Hamburguesa', 3, '37.345226', '-5.9843949', NULL),
(48, 'Arcasa Caixaforum ', 'Sevilla', 'Gonzalo Jiménez de Quesada 2,  Torre Sevilla', 41092, '', 0, 'Gourmet', 3, '37.3936369', '-6.0119383', NULL),
(49, 'Patacones De Mi Tierra', 'Madrid', 'C. del Dr. Vallejo, 35, Madrid', 28027, 'https://patacones-de-mi-tierra.mailchimpsites.com/', 919205529, 'Latinoamericana', 2, '40.4379515', '-3.6474023', NULL),
(50, 'O Lagharto pintado', 'Pontevedra', 'R. de Rosalía de Castro, 8, 36201 Vigo, Pontevedra', 36201, 'https://www.olaghartopintado.com/', 986132043, 'Tapas', 1, '42.2380899', '-8.7217882', NULL),
(51, 'Cara vaca', 'Sevilla', 'Encuadernación 32, esquina Laminadora', 41016, '', 0, 'Otro', 3, '37.3779131', '-5.9322358', NULL),
(52, 'Vegan Queen', 'Murcia', 'Av. Juan Carlos I, 35', 30009, 'https://veganqueen.es/', 2147483647, 'Vegana', 42, '38.00134', '-1.1425949', NULL),
(53, 'La Mordida de Bernabéu', 'Madrid', 'Avda. Brasil, 6. 28020 Madrid', 0, 'https://www.lamordida.com/reservas/#la-mordida-bernabeu', 0, 'Mexicana', 1, '40.4540534', '-3.6956678', NULL),
(55, 'Restaurante La Parra', 'Sevilla', 'C. San Pablo, S/N, 41520 El Viso del Alcor, Sevilla', 0, '', 0, 'Española', 4, '37.3952568', '-5.7183931', NULL),
(57, 'Araldo', 'Madrid', 'Calle de los madrazo, 5, madrid', 0, 'https://araldoartedelgusto.es/', 0, 'Pizza', 44, '40.417578', '-3.6980761', ''),
(58, 'Honest Greens', 'Madrid', 'Calle de Hortaleza, 100, 28004 Madrid, España', 28004, 'https://honestgreens.com/', 34, 'Otro', 1, '40.4248553', '-3.6978322', '510fc4680c29950dc059d03592a861364440f00103f9013c8b35580100000092030d486f6e65737420477265656e73'),
(59, 'Kasanova', 'Madrid', 'C/ del Alcalde Sainz de Baranda, 44', 0, 'http://www.restaurantekasanova.com/', 0, 'Italiana', 46, '40.4165741', '-3.6725291', ''),
(60, 'Detroit Murcia Centro \"Más que desayunos', 'Murcia', 'C. Sta. Teresa, 14, 30005 Murcia, Spain', 0, 'https://detroitmasquedesayunos.com/', 0, 'Cafetería', 42, '0', '0', ''),
(61, 'Detroit Murcia Centro \"Más que desayunos', 'Murcia', 'C. Sta. Teresa, 14, 30005 Murcia, Spain', 0, 'https://detroitmasquedesayunos.com/', 0, 'Cafetería', 42, '0', '0', ''),
(62, 'Shelbyville ', 'Sevilla', 'Juan Gil 1 41020 Sevilla ', 0, '', 0, 'Cafetería', 3, '0', '0', ''),
(63, 'Shelbyville ', 'Sevilla', 'Juan Gil 1 41020 Sevilla ', 0, '', 0, 'Cafetería', 3, '0', '0', ''),
(64, 'Grill corner', 'Madrid', 'C. Puerto de Navacerrada, km 23, 28939 Arroyomolinos, Madrid', 0, 'https://grillcornerrestaurant.com/', 0, 'Otro', 52, '0', '0', ''),
(65, 'Grill corner', 'Madrid', 'C. Puerto de Navacerrada, km 23, 28939 Arroyomolinos, Madrid', 0, 'https://grillcornerrestaurant.com/', 0, 'Otro', 52, '0', '0', ''),
(66, 'Mattina', 'Murcia', 'Calle Puerta Nueva, 1, Bajo, Murcia', 0, '', 0, 'Cafetería', 42, '0', '0', ''),
(67, 'Mattina', 'Murcia', 'Calle Puerta Nueva, 1, Bajo, Murcia', 0, '', 0, 'Cafetería', 42, '0', '0', ''),
(68, 'San Pascual sin gluten', 'Alicante', 'Calle San Pascual 28, 03300, Orihuela ', 0, '', 0, 'Española', 42, '0', '0', ''),
(69, 'San Pascual sin gluten', 'Alicante', 'Calle San Pascual 28, 03300, Orihuela ', 0, '', 0, 'Española', 42, '0', '0', ''),
(70, 'San Pascual sin gluten', 'Alicante', 'Calle San Pascual 28, 03300, Orihuela ', 0, '', 0, 'Española', 42, '0', '0', ''),
(71, 'San Pascual sin gluten', 'Alicante', 'Calle San Pascual 28, 03300, Orihuela ', 0, '', 0, 'Española', 42, '0', '0', ''),
(72, 'My pasta room', 'Madrid', 'Calle del Espíritu Santo, 16', 0, 'https://mypastaroom.com/', 0, 'Italiana', 1, '0', '0', ''),
(73, 'My pasta room', 'Madrid', 'Calle del Espíritu Santo, 16', 0, 'https://mypastaroom.com/', 0, 'Italiana', 1, '0', '0', ''),
(74, 'Juanchos BBQ', 'Madrid', 'Calle de Gabriel Lobo, 33 28002', 0, 'https://juanchosbbq.com/', 0, 'Americana', 1, '0', '0', ''),
(75, 'Juanchos BBQ', 'Madrid', 'Calle de Gabriel Lobo, 33 28002', 0, 'https://juanchosbbq.com/', 0, 'Americana', 1, '0', '0', ''),
(76, 'Creperie La Rue', 'Madrid', 'Calle de Colón, 14, Centro, 28004', 0, 'https://creperielarue.com/', 0, 'Cafetería', 1, '0', '0', ''),
(77, 'Creperie La Rue', 'Madrid', 'Calle de Colón, 14, Centro, 28004', 0, 'https://creperielarue.com/', 0, 'Cafetería', 1, '0', '0', ''),
(78, 'La Tia Juana', 'Madrid', 'Calle de Atocha, 74, Centro, 28012', 0, 'https://latiajuanamx.com/', 0, 'Mexicana', 1, '0', '0', ''),
(79, 'La Tia Juana', 'Madrid', 'Calle de Atocha, 74, Centro, 28012', 0, 'https://latiajuanamx.com/', 0, 'Mexicana', 1, '0', '0', ''),
(80, 'Hot Pot de Sichuan', 'Madrid', 'Calle de los Trujillos, 7, 28013 Madrid, España', 28013, 'https://hotpot.es/', 34, 'Otro', 1, '40.4186817', '-3.7074887', '510351e6d5efa80dc059c428a95c97354440f00103f9012287969d00000000920312486f7420506f74206465205369636875'),
(81, 'Grosso Napoletano Senza Glutine', 'Vizcaya', 'Calle iparraguirre 15', 0, 'https://www.grossonapoletano.com/', 0, 'Italiana', 57, '43.265264', '-2.9354998', ''),
(82, 'Baratie', 'Madrid', 'Plaza de Ribadeo, 1, 28029 Madrid, España', 28029, 'http://www.baratie.eu', 34, 'Japonesa', 1, '40.4776671', '-3.7107606', '515d48e240a3af0dc05961250f32243d4440f00103f90103649def0000000092030742617261746965');

-- --------------------------------------------------------

--
-- Table structure for table `restaurantconfig`
--

CREATE TABLE `restaurantconfig` (
  `allergenChart` int(1) DEFAULT NULL,
  `accesibleMenu` int(1) DEFAULT NULL,
  `accesibleTable` int(1) DEFAULT NULL,
  `accesibleParking` int(1) DEFAULT NULL,
  `accesibleBathroom` int(1) DEFAULT NULL,
  `celiacDisease` int(1) DEFAULT NULL,
  `diabetes` int(1) DEFAULT NULL,
  `lactoseIntolerant` int(1) DEFAULT NULL,
  `fructoseIntolerant` int(1) DEFAULT NULL,
  `vegan` int(1) DEFAULT NULL,
  `vegetarian` int(1) DEFAULT NULL,
  `restaurantID` int(11) NOT NULL,
  `restaurantconfigID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `scores`
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
  `allergicReaction` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`scoreID`, `comment`, `created`, `generalScore`, `allergenChart`, `fidelityScore`, `attentionScore`, `userID`, `restaurantID`, `userName`, `allergicReaction`) VALUES
(1, 'Muy buena atención. El camarero me resolvió todas las dudas de la carta y se preocupó muchísimo de que pudiera comer bien', '2023-06-14', 9, 1, 9, 9, 1, 2, 'María Salazar', 0),
(19, 'Las pizzas caseras están muy buenas y puedes pedir el queso sin lactosa. Te ponen un recargo para poderte el queso sin lactosa pero están muy buenas. Recomiendo la pizza americana', '2023-08-04', 10, 0, 0, 9, 1, 11, 'María Salazar', 0),
(20, 'La atención del personal del restaurante no fue en general muy buena, estaban despistados y no fueron muy educados. La carta era muy amplia y había muchas opciones.', '2023-08-04', 6, 1, 10, 6, 1, 12, 'María Salazar', 0),
(21, 'Les dije mis intolerancias y miraron la carta conmigo, preguntaron en cocina y se aseguraron de que no tuve una reacción alérgica', '2023-08-04', 10, 1, 9, 10, 1, 13, 'María Salazar', 0),
(22, 'La atención fue muy lenta pero la comida estaba muy rica', '2023-08-04', 8, 1, 9, 7, 1, 14, 'María Salazar', 0),
(23, 'Helados y pasteles. Tienen opciones veganas, sin lactosa, sin glucosa y sin azucar.', '2023-08-04', 10, 1, 10, 10, 2, 15, 'Teresa Salazar', 0),
(24, 'Uno de los mejores coreanos de Sevilla. La carta de alérgenos está bastante bien.', '2023-08-04', 9, 1, 9, 8, 1, 16, 'María Salazar', 0),
(25, 'Estuve preguntando mucho al personal, mirando en la carta de alérgenos y asegurándome de la comida, y aún así tuve una reacción alérgica. Una pena, lo que me dio tiempo a comer estaba rico', '2023-08-04', 4, 1, 3, 7, 1, 17, 'María Salazar', 1),
(26, 'Comida muy rica y buena atención del personal con las alergias', '2023-08-04', 10, 1, 9, 9, 1, 18, 'María Salazar', 0),
(27, 'La atención fue muy buena y me ayudaron a encontrar un plato que pudiese comer', '2023-08-04', 10, 1, 9, 10, 1, 19, 'María Salazar', 0),
(28, 'La comida y la atención son buenísimas. No recuerdo haber visto carta de alérgenos pero es un lugar vegano', '2023-08-04', 10, 0, 0, 10, 1, 20, 'María Salazar', 0),
(29, 'Fueron súper atentos con mis alergias y me dijeron qué platos podía comer y cuáles no', '2023-08-04', 10, 1, 10, 10, 1, 21, 'María Salazar', 0),
(30, 'La carta de alérgenos fue muy complicada de encontrar y no era demasiado fiable, tuve una reacción alérgica de todas formas', '2023-08-04', 5, 1, 4, 6, 1, 22, 'María Salazar', 1),
(31, '', '2023-08-04', 9, 1, 9, 9, 1, 23, 'María Salazar', 0),
(32, 'En la carta no lo ponen, pero si pides queso sin lactosa te lo ponen sin problema. Muy buena atención y comida', '2023-08-04', 10, 1, 9, 10, 1, 24, 'María Salazar', 0),
(33, 'Tapas un poco caras, pero buenas. Carta de alérgenos muy completa', '2023-08-13', 8, 1, 10, 8, 3, 25, 'Teresa Garcia-Rosales', 0),
(34, 'Los alérgenos están incluidos en la carta, pero algunos no están marcados (Por ejemplo, hay un plato de atún que no tiene marcado el alérgeno \"pescado\"; la lactosa no está marcada...). El gluten sí que está indicado, además del nivel de picor.', '2023-08-14', 7, 1, 7, 10, 2, 26, 'Teresa Salazar', 0),
(35, 'No tiene carta de alérgenos y la camarera habla español más o menos, pero tenía muy buena disposición a asegurarse de que pudieses comer. Podías preguntarle a ella y ella te sabía decir. La comida está muy rica', '2023-08-14', 7, 0, 0, 9, 1, 27, 'María Salazar', 0),
(36, 'Tuve mucho cuidado escogiendo la comida y comparándola con la carta de alérgenos y aún así tuve una reacción alérgica. Creo que tienen muy poco cuidado con las alergias cruzadas', '2023-08-14', 1, 1, 3, 6, 1, 28, 'María Salazar', 1),
(37, '', '2023-08-15', 8, 1, 9, 7, 1, 29, 'María Salazar', 0),
(38, '', '2023-08-15', 10, 1, 10, 10, 2, 20, 'Teresa Salazar', 0),
(39, '', '2023-08-16', 10, 1, 10, 8, 3, 30, 'Teresa Garcia-Rosales', 0),
(40, 'La comida es excelente', '2023-08-20', 10, 1, 5, 10, 1, 31, 'María Salazar', 0),
(41, 'El personal estuvo más o menos pendiente de mis alérgenos. La comida normalita', '2023-08-20', 6, 0, 0, 7, 1, 32, 'María Salazar', 0),
(42, 'En la entrada del local indicaban que tenían una carta de alérgenos pero que esta no estaba totalmente completa y que preguntasen mejor al personal. El personal fue amable, pero la carta de alérgenos debería estar completa', '2023-08-20', 7, 1, 5, 7, 1, 33, 'María Salazar', 0),
(43, '', '2023-08-20', 10, 1, 7, 9, 1, 34, 'María Salazar', 0),
(44, 'Tienen muchas opciones alimentarias, la comida está muy bien y el servicio es bastante bueno', '2023-08-20', 9, 1, 8, 8, 1, 35, 'María Salazar', 0),
(45, 'La carta de alérgenos está muy bien, tiene un apartado para veganos y vegetarianos', '2023-08-31', 9, 1, 9, 8, 1, 36, 'María Salazar', 0),
(46, 'Fuimos con una persona celíaca y dieron opciones para adaptar productos que tenían gluten a otros sin gluten. Muy buena atención y la comida muy buena', '2023-09-03', 10, 1, 10, 10, 1, 37, 'María Salazar', 0),
(47, '', '2023-09-04', 10, 1, 10, 10, 10, 38, 'Sandra “We\'reTrapped” Sanchez', 0),
(48, '', '2023-09-04', 9, 1, 10, 10, 12, 39, 'Prototypem8', 0),
(49, 'Hicieron como que apuntaban las alergias y trajeron un plato con trozos de plátano(una de ellas)', '2023-09-04', 1, 1, 4, 2, 19, 40, 'Miriam Ruiz', 1),
(50, 'Apto para celíacos en especial ya que todo es sin gluten', '2023-09-04', 8, 0, 0, 9, 22, 41, 'Denis Pintea', 0),
(51, 'El restaurante entero es 100% sin gluten.', '2023-09-04', 10, 1, 10, 10, 9, 42, 'Alberto', 0),
(52, 'Es un restaurante 100% sin gluten. Unos platos son veganos y otros sí tienen huevo o lácteos. Está claramente indicado en la carta, al igual que los alérgenos.', '2023-09-04', 10, 1, 10, 10, 9, 43, 'Alberto', 0),
(53, '', '2023-09-05', 10, 1, 9, 10, 23, 44, 'Ivan Rica', 0),
(54, 'Ambiente especial y único. Comida con ingredientes de proximidad y buen precio', '2023-09-05', 10, 1, 10, 10, 25, 45, 'Maus Bastion', 0),
(55, 'Cocina hecha con mucho amor. Trato familiar. 100% recomendable.\nEl mejor vegano de Fuengirola.', '2023-09-05', 10, 1, 10, 10, 27, 46, 'David Moreno', 0),
(56, 'Un poco ruidosoñ', '2023-09-15', 9, 1, 8, 5, 3, 47, 'Teresa Garcia-Rosales', 0),
(57, 'Buena atención. Te cambian lo que sea necesario en los platos.', '2023-09-17', 10, 1, 10, 10, 3, 48, 'Teresa Garcia-Rosales', 0),
(58, 'No recuerdo si había carta de alérgenos.', '2023-09-19', 9, 0, 0, 9, 2, 49, 'Teresa Salazar', 1),
(59, '', '2023-09-26', 8, 0, 0, 7, 1, 50, 'María Salazar', 0),
(60, 'Carta de alérgenos muy completa', '2023-10-06', 10, 1, 10, 6, 3, 51, 'Teresa Garcia-Rosales', 0),
(61, 'Dog friendly!\nLas hamburguesas buenísimas, los tequeños deliciosos, las ensaladas generosas y los postres gordos. ¿Qué más quieres?\n\nNo en todas las hamburguesas se podía seleccionar el pan sin gluten a través del móvil, pero al menos las beyond-burguer sí tienen esa opción gluten-free.\n\nBuena selec', '2023-11-19', 7, 0, 0, 10, 42, 52, 'Silvia García', 0),
(62, 'El personal fue súper atento, y cuando supieron que había una persona celíaca en nuestro grupo prestaron muchísima atención cada vez que pedían un plato. Además, la comda estaba buenísima', '2023-12-06', 10, 1, 10, 10, 1, 53, 'María Salazar', 0),
(63, 'La atención fue fantástica', '2023-12-10', 9, 1, 9, 10, 1, 21, 'María Salazar', 0),
(64, 'La atención del personal fue excelente', '2023-12-10', 10, 1, 10, 10, 1, 19, 'María Salazar', 0),
(66, 'El dueño es un poco excesivo en el trato pero se nota que es un rasgo de su personalidad. Que sólo intenta agradar, vamos.', '2023-12-24', 9, 0, 0, 10, 4, 55, 'Chema Salazar', 0),
(68, '', '2024-01-12', 10, 0, 0, 10, 44, 57, 'Daniel rayo', 0),
(69, '', '2024-01-12', 10, 1, 9, 7, 1, 58, 'María Salazar', 0),
(70, '', '2024-02-15', 10, 1, 10, 10, 46, 59, 'Andrés Atienza Maeso', 0),
(71, 'Buena cafetería que ofrece diferentes tipos de leches alternativas, una amplia carta de tostadas (hay pan sin gluten y tienen en cuenta si necesitan tostarlo a parte para no meterle trazas). Además, su café está buenísimo, el servicio es excepcional, son dog friendly y de vez en cuando hay una perso', '2024-03-20', 10, 1, 10, 9, 42, 61, 'Silvia García', 0),
(72, 'Buena cafetería que ofrece diferentes tipos de leches alternativas, una amplia carta de tostadas (hay pan sin gluten y tienen en cuenta si necesitan tostarlo a parte para no meterle trazas). Además, su café está buenísimo, el servicio es excepcional, son dog friendly y de vez en cuando hay una perso', '2024-03-20', 10, 1, 10, 9, 42, 60, 'Silvia García', 0),
(73, 'Carta de alérgenos perfecta\n Atención muy buena ', '2024-04-07', 10, 1, 10, 10, 3, 63, 'Teresa Garcia-Rosales', 0),
(74, 'Carta de alérgenos perfecta\n Atención muy buena ', '2024-04-07', 10, 1, 10, 10, 3, 62, 'Teresa Garcia-Rosales', 0),
(75, 'La carta de alérgenos estaba pero hay pocas variaciones de sin gluten y menos saber si esto lo hay en el menú diario o no.', '2024-04-24', 3, 1, 5, 3, 52, 65, 'Soraya Merinero Calvo', 0),
(76, 'La carta de alérgenos estaba pero hay pocas variaciones de sin gluten y menos saber si esto lo hay en el menú diario o no.', '2024-04-24', 3, 1, 5, 3, 52, 64, 'Soraya Merinero Calvo', 0),
(77, 'Tienen un listado de alérgenos en carta, pero no especifican qué alérgeno compete a qué producto. Si preguntas a alguna de las camareras te indican qué productos hay disponibles (pan sin gluten, brownie vegano, tostadas veganas etc). Variedad de leches/bebidas vegetales.\n\nEl café y la repostería muy', '2024-06-10', 8, 1, 7, 10, 42, 67, 'Silvia García', 0),
(78, 'Tienen un listado de alérgenos en carta, pero no especifican qué alérgeno compete a qué producto. Si preguntas a alguna de las camareras te indican qué productos hay disponibles (pan sin gluten, brownie vegano, tostadas veganas etc). Variedad de leches/bebidas vegetales.\n\nEl café y la repostería muy', '2024-06-10', 8, 1, 7, 10, 42, 66, 'Silvia García', 0),
(79, 'Restaurante sin gluten pequeñito (dentro solo tiene tres mesas) pero con comida casera y menú del día a buen precio (menos de 14€).\n\nNo hay opción de bebidas vegetales, solo tienen leche sin lactosa ', '2024-06-11', 8, 0, 0, 9, 42, 69, 'Silvia García', 0),
(80, 'Restaurante sin gluten pequeñito (dentro solo tiene tres mesas) pero con comida casera y menú del día a buen precio (menos de 14€).\n\nNo hay opción de bebidas vegetales, solo tienen leche sin lactosa ', '2024-06-11', 8, 0, 0, 9, 42, 68, 'Silvia García', 0),
(81, 'Restaurante sin gluten pequeñito (dentro solo tiene tres mesas) pero con comida casera y menú del día a buen precio (menos de 14€).\n\nNo hay opción de bebidas vegetales, solo tienen leche sin lactosa ', '2024-06-11', 8, 0, 0, 9, 42, 70, 'Silvia García', 0),
(82, 'Restaurante sin gluten pequeñito (dentro solo tiene tres mesas) pero con comida casera y menú del día a buen precio (menos de 14€).\n\nNo hay opción de bebidas vegetales, solo tienen leche sin lactosa ', '2024-06-11', 8, 0, 0, 9, 42, 71, 'Silvia García', 0),
(83, 'La atención fue muy buena, estuvieron muy pendientes', '2024-06-18', 8, 1, 9, 10, 1, 73, 'María Salazar', 0),
(84, 'La atención fue muy buena, estuvieron muy pendientes', '2024-06-18', 8, 1, 9, 10, 1, 72, 'María Salazar', 0),
(85, 'Muy buena atención en el local y la comida estaba muy buena', '2024-06-18', 9, 1, 10, 10, 1, 74, 'María Salazar', 0),
(86, 'Muy buena atención en el local y la comida estaba muy buena', '2024-06-18', 9, 1, 10, 10, 1, 75, 'María Salazar', 0),
(87, '', '2024-06-18', 9, 1, 9, 9, 1, 76, 'María Salazar', 0),
(88, '', '2024-06-18', 9, 1, 9, 9, 1, 77, 'María Salazar', 0),
(89, '', '2024-06-18', 8, 1, 9, 8, 1, 79, 'María Salazar', 0),
(90, '', '2024-06-18', 8, 1, 9, 8, 1, 78, 'María Salazar', 0),
(91, 'No había carta de alérgenos pero el personal estuvo muy atento', '2024-08-25', 5, 0, 0, 9, 1, 80, 'María Salazar', 0),
(92, 'Sin gluten', '2025-02-02', 5, 1, 5, 10, 57, 81, 'Lucia Garay', 0),
(93, 'Todo estaba muy rico', '2025-04-14', 5, 0, 0, 10, 1, 82, 'María Salazar', 0),
(94, 'El personal siempre es muy atento y pregunta en cocina los platos que quiero pedir por si pudieran tener algo', '2025-04-14', 5, 1, 10, 10, 1, 19, 'María Salazar', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `google_uid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `picture` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `google_uid`, `name`, `email`, `picture`) VALUES
(1, '105566763085813942698', 'María Salazar', 'maria.sgr@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocJK0syWdrpO-ulh4AwRaoezi9gHvm0swywoWEp041stMMgqWQl5=s96-c'),
(2, '107411888099195138705', 'Teresa Salazar', 't.salazargr@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocKG9oj9Ioo8NPAF1N539stNl7aBAEvEoX82DMeDGiG8=s96-c'),
(3, '110271244620721064593', 'Teresa Garcia-Rosales', 'tetemari3@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocLJtGXD4vOxaXZaHnRARw1soPyKFbNMP9JrQO2YMX9U9eRJzOQ=s96-c'),
(4, '110393753728815708285', 'Chema Salazar', 'chemapa@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocLYCMWse0gdzHYVw7e8oA5T9mo-JGu3J5OUWdFLF2Vj0Q=s96-c'),
(5, '101304333498013842894', 'Grayson Steinberg', 'grayson.steinberg@gmail.com', 'https://lh3.googleusercontent.com/a/AAcHTteR6ge_PFOKJNkUEZ1wckikauZGMX-GYAh78MnCOuRb=s96-c'),
(6, '100682909391628451894', 'Oriol Hilari', 'orihil@gmail.com', 'https://lh3.googleusercontent.com/a/AAcHTtfJIYZCW-Kl86lwfMRVTVM7yCTPOhddWo078r0VdbVxoeY=s96-c'),
(7, '103862077577130531118', 'Samuel Romero Arbelo', 'oiranca@gmail.com', 'https://lh3.googleusercontent.com/a/AAcHTte_-jcLFMCAtlN1dWawBGlgLu4QPpVulK9Y4B5k-EpifI7J=s96-c'),
(8, '102313449790748587397', 'Daniel Mateu Pardo', 'danielmateu86@gmail.com', 'https://lh3.googleusercontent.com/a/AAcHTtffXK_lh3P8Oh8nSN9KH_tfHce5ecjWpaFJWlrtZgiQ0jyZ=s96-c'),
(9, '104226232071900419091', 'Alberto', 'aalku7@gmail.com', 'https://lh3.googleusercontent.com/a/AAcHTteIUPWZH3ssyGauUJoi0tC6bGzlVD0qfIN_PglkVEx9Lw=s96-c'),
(10, '104983563283390372662', 'Sandra “We\'reTrapped” Sanchez', 'sansanroj@gmail.com', 'https://lh3.googleusercontent.com/a/AAcHTteChkzG3I8WWVVP1NMa9zbeCo184xJv3-s7ddI9m9z0SJA=s96-c'),
(11, '108810299927267041071', 'Pilar Solis', 'pilar.sm02@gmail.com', 'https://lh3.googleusercontent.com/a/AAcHTtfDL4K9eCs8t5er3OgFwCjmj5k0GMVkxTj2izj90th9=s96-c'),
(12, '109749762532004589338', 'Prototypem8', 'v8prototype@gmail.com', 'https://lh3.googleusercontent.com/a/AAcHTtc9aPv1HxdfGZF0aglFMYjBqPZsfDeVCme3T-U_yEqsMA=s96-c'),
(13, '106940933506603140020', 'javier montes', 'phoeps@gmail.com', 'https://lh3.googleusercontent.com/a/AAcHTte-fSsmHmJBKM6iYzaapYpEHC-Pi9Vqm4hgR9psfOYmImQ=s96-c'),
(14, '105517843529958327926', 'Ana Rodriguez', 'anarodpe8@gmail.com', 'https://lh3.googleusercontent.com/a/AAcHTtfjomTTCEMfnMOXTxkOxZMuylnB-3VrCgZcIAQDmm6vdw=s96-c'),
(15, '118267865721427259272', 'Sergio Barriel', 'sergiobarriel@gmail.com', 'https://lh3.googleusercontent.com/a/AAcHTtdXi5ZYqWZYVBAflmNHcctWOsPPZBhe3PFhQHAt53IanHE=s96-c'),
(16, '108748065609489385919', 'Mariano Alvarez', 'ma.marianoalvarez@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocKtor3MlhXV28Uu3WFU58ms6kx-meMxiAViPssm014vbXI=s96-c'),
(17, '104111379379434228795', 'Santiago Sosa Diaz', 'ssosa@isotrol.com', 'https://lh3.googleusercontent.com/a/AAcHTtdJaTiIt4j89rbSUhSOVS4SAc9rSvG4dk8IC4Dew_TofA=s96-c'),
(18, '108355987741553507694', 'David', 'david.charte@gmail.com', 'https://lh3.googleusercontent.com/a/AAcHTtd4NnVe0L5N_rHUdFzAcW0KjcvcZKmaphbkjpj3aVAW=s96-c'),
(19, '109704173767938562500', 'Miriam Ruiz', 'mrbazaga@gmail.com', 'https://lh3.googleusercontent.com/a/AAcHTtdiAatRH4vEiLwjvWafCZhLXZB5ZdWiieUqpl1nt1TM=s96-c'),
(20, '104338789173733769865', 'Jaime Ramirez', 'ramirezjaime648@gmail.com', 'https://lh3.googleusercontent.com/a/AAcHTtdSr9af9BLtuxej-DMbHqxvebqSfnHJYeFLRJ0iS-0b3o8=s96-c'),
(21, '107259711224236162585', 'Efeko O\'Brian', 'efeko2@gmail.com', 'https://lh3.googleusercontent.com/a/AAcHTtcCbvUCnJJAGZ8QfODVgR4ab9K1i9qm7D6rRSm6zGs6Wik=s96-c'),
(22, '114956568055524144574', 'Denis Pintea', 'denispinteabussines@gmail.com', 'https://lh3.googleusercontent.com/a/AAcHTtcPoGkT0waHmUbDaaXkP3FCYhPaZQ9S1G41nTsat8b_=s96-c'),
(23, '107057010416283526013', 'Ivan Rica', 'ivanrica14@gmail.com', 'https://lh3.googleusercontent.com/a/AAcHTte8mAu9iLd5CM9Jxg77vmKuuUUtmjQl63mJlvZc42QU=s96-c'),
(24, '111873299263758087491', 'Diego Manuel Béjar', 'diego.bejar@secuoyas.com', 'https://lh3.googleusercontent.com/a/AAcHTtdJ8FiDSU3p1CeguMigRwLLUQi_K1rxNIS_Kg-CGUrv4T0=s96-c'),
(25, '114725769201093053014', 'Maus Bastion', 'mausbastion@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocJ7i5h3Wj364TzXV_xIhT6iZtaY87-ucZsxlhG85dqG=s96-c'),
(26, '116913452958269769296', 'Juanma Pérez', 'juanma97perez@gmail.com', 'https://lh3.googleusercontent.com/a/AAcHTtcB20DaLATQzYgaKLfx_PF9dZYabC9zCDGqkFNDSiFvEU8=s96-c'),
(27, '102133009519134293908', 'David Moreno', 'linuxonrails@linuxonrails.com', 'https://lh3.googleusercontent.com/a/ACg8ocKJw3_ei5ETXYng0S95tKGRA-3Uq05CoQ7H_NAPqh1rGow7BPdLZQ=s96-c'),
(28, '107883119353570707380', 'Ivan Ginja', 'ginja1410@gmail.com', 'https://lh3.googleusercontent.com/a/AAcHTteWN8EkOzkqNpRm3O4acMnzvJhZa8FjTqVvzILQL8t-ixXf=s96-c'),
(29, '116515123390364923630', 'gambito murphy', 'gambito.murphy@gmail.com', 'https://lh3.googleusercontent.com/a/AAcHTteNQWlhGkp1aX11LcTVHLcQQOjv33-tj4F8gMjYrY9l=s96-c'),
(30, '101245250798737369831', 'Eduardo Alberto Roth de la Garza', 'earoth88@gmail.com', 'https://lh3.googleusercontent.com/a/AAcHTtdDzCAhhgIUpEmLgAL_lS5Brv-2qrygcSrwztQr2AHVI5qE=s96-c'),
(31, '114747822915668117155', 'Ana García', 'moody.alastor@gmail.com', 'https://lh3.googleusercontent.com/a/AAcHTtfPiJBElWD3I8qlZgQjvaeqIJsG21SJ5B16Elx3CaI_rUA=s96-c'),
(32, '103599497996451422873', 'Félix Gómez', 'felix.gomez.lopez@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocLOIWXgi8m6DOZTqSWuafp1LGYiuWOZffFbhMR0ctIqbRA=s96-c'),
(33, '111235651209751486117', 'Lovebarsa YT', 'lovebarsa12@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocJ_IrETEQ6TZxk6ZZhYrvkX99jL3WY5dLD67kJ0F5ry=s96-c'),
(34, '104270904620154871583', 'Teresa Garcia', 'profetetemari@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocJn_3LqQ5sCzHYrB2Su6suagY9OHmEJtl8vkcBjn-V4=s96-c'),
(35, '114514110177145721617', 'Javi Marti', 'undernightcore@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocJ4HQeLditYRHx3kwPLvQRlnqXm-cfvO_Wc5V9dEKsjInePqoom=s96-c'),
(36, '115199925577290659690', 'Pepe Viña Bilbao', 'pepevb@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocLvkXBsEpa6F-_r4ND0dlwbvOeOnEmC7fERe-qIfBJMlQ=s96-c'),
(37, '102127488910568501526', 'ROMACODE', 'roman247.rg@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocLs8jHmuGoLD-zm3RAiM2-BBRhUvy2hwHuQvxLvbzYRc4Y=s96-c'),
(38, '111560091298054781333', 'Randy Sierra', 'randysr2803@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocLEusfiOAkOlU9jy6g1dxNUEMTpQJtl5pbAMfx63hm0rLs=s96-c'),
(39, '104185210556092482205', 'Julia Pañero Valle', 'juliapanerov@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocL1sAVbpI-paQx55N8GejD5cE-vwXSRULu_Tva0L1S2=s96-c'),
(40, '110147584018945652889', 'Miguel Ángel Moreno Martínez', 'mmormar02@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocKAE0RFo3azabbUJ6kjFD4QifcQHFC61H8l7r8WtCn2Fw=s96-c'),
(41, '112159050165270050845', 'Jone Guerrero', 'guejo432@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocJSmrkk3m4MD5MPbXhAJqywh7MUkUJZOzY1Zu_sEOQB=s96-c'),
(42, '105876892229496571897', 'Silvia García', 'silviagarcica@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocIupY_fS8nuelsi0a3hGu7Qn4IGD9NAa92EQ5aWtinNFpY03Ste=s96-c'),
(43, '100784113521396252450', 'Jordi Turull', 'jordi.frontend@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocLwvzUrOvi5hnVwpnMS3FHfUsj4qVDDeJwC5EDINh9YcA=s96-c'),
(44, '118215039784160217987', 'Daniel rayo', 'rayitox@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocLCnxOHKfHUSRwsncxPt2KJDchOKGCkT4GqidV-5Oskzw=s96-c'),
(45, '106333658347458991249', 'Francisco Javier Rico Pérez', 'franricoperez1997@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocKK3-auBwWBr73uO3ICAshbI2QHQNb9hc85nxyTAPa4=s96-c'),
(46, '100234245790186902127', 'Andrés Atienza Maeso', 'a.atienzamaeso@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocL1hQRIC-EhFusUmQO6GubvT0u2JAfbeecYnfMEDYyN=s96-c'),
(47, '109334008828883213590', 'Reinaldo Aguilera', 'reinaldo.aguilera@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocJqmtZ0HugrN1Atv7hzi5-ziotPVvaUXjmOrIrHESAsWfvf=s96-c'),
(48, '110371300738268070878', 'Jhon pabon', 'pabongamas@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocJfcOOJQka2cL4UQNGZJBZJ6_FFGGSPyLUTGbzcseLWaz50=s96-c'),
(49, '102722840963702174209', 'Ángel Suárez', 'asuarezc91@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocLIW4mzRGDaTElTKusqhn0zKgThh4G5r7aKM3yYE3_x=s96-c'),
(50, '108285972131469762474', 'Cristina Pozo Lizaur', 'cristina.p.lizaur@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocJ1xkjgNgBWBr7UT1UdK8-GuwtoRHvd3mG-ql_yYWMDWwI1ig=s96-c'),
(51, '106606024262070846915', 'Pablo Granda', 'pablo.granda.dev@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocKA5IOay-JOk98zbEkZLI7EjJ_fNnB7Ozg88o0TqZEPvz6x8Q=s96-c'),
(52, '108744489395018423980', 'Soraya Merinero Calvo', 'sorayameri@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocJwKMLoi2SkKk8tYEXKEckyCW_7pVa7LkiEGPVVzHYfy4zxHYgT=s96-c'),
(53, '112492460760877727567', 'SILVIA RR', 'silvierr7@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocIMvjFxsGCwo6balbccr2S9J1G1QUiYr3Z2EHVV35v4qBagddec=s96-c'),
(54, '106706862839157137374', 'Jessica Montoya', 'jessica2montoya@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocIFNfNUN_R7wIoAXU40Za-Hzdb7nvjN0ZPA7cF6WcPrlCzMSg=s96-c'),
(55, '105148347580230097907', 'Daniel Patrón Gómez', 'dpatrongomez@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocLRlTZNian-1BpCWYHLl8gJEQDmqQOksrDbLiAhd8Y74Hwqf7gL=s96-c'),
(56, '116156954647891454596', 'Raquel SG', 'raquelus8@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocLEA0d3v7vn0DL5wXVfv3WrU1yNpImJ2ZTbBDCWe1gHWGuPuSWhnw=s96-c'),
(57, '110235099481538594936', 'Lucia Garay', 'lugaray7@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocKhxF1VbI4Ko330IJ_f46zTW162LY5EnwiMYLWfG7h-lbJqeA=s96-c'),
(58, '109198377473749536818', 'Sofia PF', 'perezferrosofia@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocKjz6BV4silmbAIeBYj4OxSEPNpfgrRIJJ8d-y7KKldHv5lAtPpFA=s96-c');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `menuOptions`
--
ALTER TABLE `menuOptions`
  ADD PRIMARY KEY (`optionID`),
  ADD KEY `restaurant_ibfk_4` (`restaurantID`),
  ADD KEY `restaurant_ibfk_5` (`userID`);

--
-- Indexes for table `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`restaurantID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `restaurantconfig`
--
ALTER TABLE `restaurantconfig`
  ADD PRIMARY KEY (`restaurantconfigID`),
  ADD KEY `restaurantID` (`restaurantID`);

--
-- Indexes for table `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`scoreID`),
  ADD KEY `scores_ibfk_2` (`restaurantID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `menuOptions`
--
ALTER TABLE `menuOptions`
  MODIFY `optionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `restaurantID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `restaurantconfig`
--
ALTER TABLE `restaurantconfig`
  MODIFY `restaurantconfigID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
  MODIFY `scoreID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `menuOptions`
--
ALTER TABLE `menuOptions`
  ADD CONSTRAINT `restaurant_ibfk_4` FOREIGN KEY (`restaurantID`) REFERENCES `restaurant` (`restaurantID`),
  ADD CONSTRAINT `restaurant_ibfk_5` FOREIGN KEY (`userID`) REFERENCES `users` (`id`);

--
-- Constraints for table `restaurant`
--
ALTER TABLE `restaurant`
  ADD CONSTRAINT `restaurant_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`);

--
-- Constraints for table `restaurantconfig`
--
ALTER TABLE `restaurantconfig`
  ADD CONSTRAINT `restaurantconfig_ibfk_1` FOREIGN KEY (`restaurantID`) REFERENCES `restaurant` (`restaurantID`);

--
-- Constraints for table `scores`
--
ALTER TABLE `scores`
  ADD CONSTRAINT `scores_ibfk_2` FOREIGN KEY (`restaurantID`) REFERENCES `restaurant` (`restaurantID`),
  ADD CONSTRAINT `scores_ibfk_3` FOREIGN KEY (`userID`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
