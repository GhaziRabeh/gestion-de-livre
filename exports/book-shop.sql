-- phpMyAdmin SQL Dump
-- version 6.0.0-dev+20261019.24ede9da2d
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 29, 2026 at 07:04 PM
-- Server version: 8.4.3
-- PHP Version: 8.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `book-shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--
CREATE TABLE `authors` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Victor Hugo', '2026-10-29 17:37:50', '2026-10-29 17:37:50'),
(2, 'Albert Camus', '2026-10-29 17:37:50', '2026-10-29 17:37:50'),
(3, 'Antoine de Saint-Exupéry', '2026-10-29 17:37:50', '2026-10-29 17:37:50'),
(4, 'Émile Zola', '2026-10-29 17:37:50', '2026-10-29 17:37:50'),
(5, 'Gustave Flaubert', '2026-10-29 17:37:50', '2026-10-29 17:37:50'),
(6, 'Jules Verne', '2026-10-29 17:37:50', '2026-10-29 17:37:50'),
(7, 'George Orwell', '2026-10-29 17:37:50', '2026-10-29 17:37:50'),
(8, 'Naguib Mahfouz', '2026-10-29 17:37:50', '2026-10-29 17:37:50');

-- --------------------------------------------------------

--
-- Table structure for table `books`
--
CREATE TABLE `books` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` smallint UNSIGNED NOT NULL,
  `author_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `title`, `year`, `author_id`, `created_at`, `updated_at`, `image`) VALUES
(1, 'Les Misérables', 1862, 1, '2026-10-29 17:37:50', '2026-10-29 17:40:09', 'books/les-miserables.jpg'),
(2, 'Notre-Dame de Paris', 1831, 1, '2026-10-29 17:37:50', '2026-10-29 17:40:13', 'books/notre-dame-de-paris.jpg'),
(3, 'Les Contemplations', 1856, 1, '2026-10-29 17:37:50', '2026-10-29 17:40:16', 'books/les-contemplations.jpg'),
(4, 'L\'Étranger', 1942, 2, '2026-10-29 17:37:50', '2026-10-29 17:40:20', 'books/letranger.jpg'),
(5, 'La Peste', 1947, 2, '2026-10-29 17:37:50', '2026-10-29 17:40:24', 'books/la-peste.jpg'),
(6, 'La Chute', 1956, 2, '2026-10-29 17:37:50', '2026-10-29 17:40:27', 'books/la-chute.jpg'),
(7, 'Le Petit Prince', 1943, 3, '2026-10-29 17:37:50', '2026-10-29 17:41:28', 'books/le-petit-prince.jpg'),
(8, 'Vol de nuit', 1931, 3, '2026-10-29 17:37:50', '2026-10-29 17:41:36', 'books/vol-de-nuit.jpg'),
(9, 'Germinal', 1885, 4, '2026-10-29 17:37:50', '2026-10-29 17:41:40', 'books/germinal.jpg'),
(10, 'L\'Assommoir', 1877, 4, '2026-10-29 17:37:50', '2026-10-29 17:41:43', 'books/lassommoir.jpg'),
(11, 'Au Bonheur des Dames', 1883, 4, '2026-10-29 17:37:50', '2026-10-29 17:41:46', 'books/au-bonheur-des-dames.jpg'),
(12, 'Madame Bovary', 1857, 5, '2026-10-29 17:37:50', '2026-10-29 17:41:51', 'books/madame-bovary.jpg'),
(13, 'L\'Éducation sentimentale', 1869, 5, '2026-10-29 17:37:50', '2026-10-29 17:41:54', 'books/leducation-sentimentale.jpg'),
(14, 'Le Tour du monde en quatre-vingts jours', 1872, 6, '2026-10-29 17:37:50', '2026-10-29 17:41:58', 'books/le-tour-du-monde-en-quatre-vingts-jours.jpg'),
(15, 'Vingt Mille Lieues sous les mers', 1870, 6, '2026-10-29 17:37:50', '2026-10-29 17:42:06', 'books/vingt-mille-lieues-sous-les-mers.jpg'),
(16, 'Voyage au centre de la Terre', 1864, 6, '2026-10-29 17:37:50', '2026-10-29 17:42:10', 'books/voyage-au-centre-de-la-terre.jpg'),
(17, '1984', 1949, 7, '2026-10-29 17:37:50', '2026-10-29 17:42:13', 'books/1984.jpg'),
(18, 'La Ferme des animaux', 1945, 7, '2026-10-29 17:37:50', '2026-10-29 17:42:17', 'books/la-ferme-des-animaux.jpg'),
(19, 'Impasse des deux palais', 1956, 8, '2026-10-29 17:37:50', '2026-10-29 17:42:19', 'books/impasse-des-deux-palais.jpg'),
(20, 'Les Fils de la médina', 1959, 8, '2026-10-29 17:37:50', '2026-10-29 17:42:21', 'books/les-fils-de-la-medina.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--
CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--
CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2026_10_28_163133_create_authors_table', 1),
(6, '2026_10_28_163150_create_books_table', 1),
(7, '2026_10_28_165840_add_image_to_books_table', 1),
(8, '2026_10_28_173150_add_auth_otp_fields_to_users_table', 1),
(9, '2026_10_28_232137_add_google_id_to_users_table', 1),
(10, '2026_10_29_000102_change_year_column_type_in_books_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--
CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', 'a04d8a4d05cd0bb8188efb498aee9ea6de708339509ed86dbf7f2d50c328b270', '[\"*\"]', NULL, NULL, '2026-10-29 17:40:25', '2026-10-29 17:40:25'),
(2, 'App\\Models\\User', 1, 'auth_token', 'c05fffad86c3e42eda5bdf8293fd0c5b8d0638971bcafb952e11437b9559cbdb', '[\"*\"]', '2026-10-29 17:57:33', NULL, '2026-10-29 17:57:27', '2026-10-29 17:57:33');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--
CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','user') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `email_otp_hash` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_otp_expires_at` timestamp NULL DEFAULT NULL,
  `password_reset_otp_hash` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password_reset_otp_expires_at` timestamp NULL DEFAULT NULL,
  `google_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `remember_token`, `created_at`, `updated_at`, `email_otp_hash`, `email_otp_expires_at`, `password_reset_otp_hash`, `password_reset_otp_expires_at`, `google_id`) VALUES
(1, 'Admin', 'admin@gmail.com', '2026-10-29 17:37:37', '$2y$10$qQrKFJfqQ/H9F19wvErKfu.ijKp9FnjliznIkHELkKePYMViXg3e.', 'admin', NULL, '2026-10-29 17:37:37', '2026-10-29 17:37:37', NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `books_author_id_foreign` (`author_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_google_id_unique` (`google_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
