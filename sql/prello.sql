-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 10. Sep 2020 um 10:51
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
  `ApmntID` varchar(30) NOT NULL,
  `Title` varchar(50) NOT NULL,
  `Description` text NOT NULL,
  `startTime` datetime NOT NULL DEFAULT current_timestamp(),
  `endDate` datetime NOT NULL DEFAULT current_timestamp(),
  `Type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `appointments`
--

INSERT INTO `appointments` (`ApmntID`, `Title`, `Description`, `startTime`, `endDate`, `Type`) VALUES
('1', 'AE Projekt 5 Abgabe', 'Vorstellung des Projekts und Upload des Sourcecodes', '2020-09-14 10:00:00', '2020-09-10 14:00:00', 'Type05');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `appointment_teams`
--

CREATE TABLE `appointment_teams` (
  `ApmntID` varchar(30) NOT NULL,
  `TeamID` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `teamleader`
--

CREATE TABLE `teamleader` (
  `TeamID` varchar(30) NOT NULL,
  `UserID` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `teams`
--

CREATE TABLE `teams` (
  `TeamID` varchar(30) NOT NULL,
  `Name` text NOT NULL,
  `Description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE `user` (
  `UserID` varchar(30) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`UserID`, `firstName`, `lastName`, `username`, `password`, `email`, `isAdmin`) VALUES
('1', 'Enzo', 'Schröder', 'eschroeder', 'ac9d2cb8ecdf3e9319756edeec6ff502', 'enzo.schroeder@cpro-ips.com', 1),
('2', 'Alexander', 'Schmidt', 'aschmidt', '482c811da5d5b4bc6d497ffa98491e38', 'alex.schmidt@email.com', 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user_appointments`
--

CREATE TABLE `user_appointments` (
  `UserID` varchar(30) NOT NULL,
  `ApmntID` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `user_appointments`
--

INSERT INTO `user_appointments` (`UserID`, `ApmntID`) VALUES
('1', '1'),
('2', '1');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user_teams`
--

CREATE TABLE `user_teams` (
  `UserID` varchar(30) NOT NULL,
  `TeamID` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`ApmntID`);

--
-- Indizes für die Tabelle `appointment_teams`
--
ALTER TABLE `appointment_teams`
  ADD PRIMARY KEY (`ApmntID`,`TeamID`);

--
-- Indizes für die Tabelle `teamleader`
--
ALTER TABLE `teamleader`
  ADD PRIMARY KEY (`TeamID`,`UserID`);

--
-- Indizes für die Tabelle `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`TeamID`);

--
-- Indizes für die Tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserID`) USING BTREE;

--
-- Indizes für die Tabelle `user_appointments`
--
ALTER TABLE `user_appointments`
  ADD PRIMARY KEY (`UserID`,`ApmntID`);

--
-- Indizes für die Tabelle `user_teams`
--
ALTER TABLE `user_teams`
  ADD PRIMARY KEY (`UserID`,`TeamID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
