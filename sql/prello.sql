-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 14. Sep 2020 um 15:42
-- Server-Version: 10.4.14-MariaDB
-- PHP-Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `prello`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `appointments`
--

CREATE TABLE `appointments` (
  `apmntID` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `appointments`
--

INSERT INTO `appointments` (`apmntID`, `title`, `description`, `startTime`, `endTime`, `type`) VALUES
(1, 'Projektabgabe', 'Abgabe AE-Projekt 5', '2020-09-14 10:00:00', '2020-09-14 15:00:00', 'Type05'),
(8, 'Cooles Projekt', 'Testprojekt über mehrere Tage', '2020-09-15 07:00:00', '2020-09-25 08:00:00', 'Type08');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE `user` (
  `userID` int(11) NOT NULL,
  `name` text NOT NULL,
  `surname` text NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(128) NOT NULL,
  `email` text NOT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`userID`, `name`, `surname`, `username`, `password`, `email`, `isAdmin`) VALUES
(1, 'Enzo', 'Schröder', 'eschroeder', 'ac9d2cb8ecdf3e9319756edeec6ff502', 'Enzo.Schroeder@cpro-ips.com', 1),
(2, 'Alexander', 'Schmidt', 'aschmidt', '8c405ae1daf2575440a037284f934421', 'alex.schmidt@email.com', 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user_appointments`
--

CREATE TABLE `user_appointments` (
  `userID` int(11) NOT NULL,
  `apmntID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `user_appointments`
--

INSERT INTO `user_appointments` (`userID`, `apmntID`) VALUES
(1, 1),
(1, 8);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`apmntID`);

--
-- Indizes für die Tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`);

--
-- Indizes für die Tabelle `user_appointments`
--
ALTER TABLE `user_appointments`
  ADD PRIMARY KEY (`userID`,`apmntID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `appointments`
--
ALTER TABLE `appointments`
  MODIFY `apmntID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT für Tabelle `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
