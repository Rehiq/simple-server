-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 30, 2017 at 11:30 AM
-- Server version: 5.7.17-0ubuntu0.16.04.1
-- PHP Version: 7.0.13-0ubuntu0.16.04.1

--
-- Create User
--
GRANT ALL PRIVILEGES ON *.* TO 'FontUser'@'%' WITH GRANT OPTION;

GRANT ALL PRIVILEGES ON `FontUser`.* TO 'FontUser'@'%';

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `FontUser`
--

-- --------------------------------------------------------

--
-- Table structure for table `urlHashes`
--

CREATE TABLE `urlHashes` (
  `id` int(11) NOT NULL,
  `hash` varchar(32) NOT NULL,
  `url` longtext NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `urlHashes`
--
ALTER TABLE `urlHashes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `hash` (`hash`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `urlHashes`
--
ALTER TABLE `urlHashes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;