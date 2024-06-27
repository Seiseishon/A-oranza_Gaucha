-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-06-2024 a las 04:37:22
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `añoranza_gaucha`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--
-- Creación: 15-06-2024 a las 21:29:05
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `id_teacher` int(11) NOT NULL,
  `id_student` int(11) NOT NULL,
  `comment` varchar(500) DEFAULT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `courses`
--
-- Creación: 15-06-2024 a las 21:29:00
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `courses`
--

INSERT INTO `courses` (`id`, `name`) VALUES
(1, 'Primer año'),
(2, 'Segundo año'),
(3, 'Tercer año'),
(4, 'Cuarto año'),
(5, 'Maestro Infantil'),
(6, 'Perfeccionamiento'),
(7, 'Primer ciclo'),
(8, 'Segundo ciclo'),
(9, 'Tercer ciclo'),
(10, 'Profesorado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `courses_subjects`
--
-- Creación: 15-06-2024 a las 21:28:45
--

CREATE TABLE `courses_subjects` (
  `id` int(11) NOT NULL,
  `id_course` int(11) NOT NULL,
  `id_subject` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `students`
--
-- Creación: 15-06-2024 a las 21:29:14
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `user` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `dni` int(11) NOT NULL,
  `birthdate` date NOT NULL,
  `id_course` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `students`
--

INSERT INTO `students` (`id`, `user`, `password`, `name`, `last_name`, `email`, `dni`, `birthdate`, `id_course`) VALUES
(1, 'Gerardo25', '123423412', 'Gerardo', 'Asaye', 'gera@gmail.com', 49082348, '2007-04-21', 10),
(2, 'vale23', '123423412', 'Valentin', 'Sandoval', 'vale@gmail.com', 49082214, '2007-02-25', 10),
(3, 'luca23', '123423412', 'Luca', 'Arias', 'luca@gmail.com', 43320384, '2003-09-21', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `students_subjects`
--
-- Creación: 15-06-2024 a las 21:28:51
--

CREATE TABLE `students_subjects` (
  `id` int(11) NOT NULL,
  `id_student` int(11) NOT NULL,
  `id_subject` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `students_tasks`
--
-- Creación: 15-06-2024 a las 21:28:48
--

CREATE TABLE `students_tasks` (
  `id` int(11) NOT NULL,
  `id_student` int(11) NOT NULL,
  `id_task` int(11) NOT NULL,
  `qualification` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subjects`
--
-- Creación: 15-06-2024 a las 21:29:03
--

CREATE TABLE `subjects` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `subjects`
--

INSERT INTO `subjects` (`id`, `name`) VALUES
(1, 'Carpeta'),
(2, 'Tesis'),
(3, 'Historia'),
(4, 'Literatura Gauchezca'),
(5, 'Orientación Pedagógica'),
(6, 'Teoría'),
(7, 'Reconocimiento Musical'),
(8, 'Didactica'),
(9, 'Coreografía'),
(10, 'Malambo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subjects_tasks`
--
-- Creación: 15-06-2024 a las 21:28:40
-- Última actualización: 23-06-2024 a las 02:33:42
--

CREATE TABLE `subjects_tasks` (
  `id` int(11) NOT NULL,
  `id_subject` int(11) NOT NULL,
  `id_task` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `subjects_tasks`
--

INSERT INTO `subjects_tasks` (`id`, `id_subject`, `id_task`) VALUES
(1, 3, 1),
(2, 6, 2),
(3, 4, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tasks`
--
-- Creación: 15-06-2024 a las 21:29:11
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tasks`
--

INSERT INTO `tasks` (`id`, `name`) VALUES
(1, 'Historia 1'),
(2, 'Teoria 1'),
(3, 'Literatura Gauchezca 1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teachers`
--
-- Creación: 15-06-2024 a las 21:29:08
--

CREATE TABLE `teachers` (
  `id` int(11) NOT NULL,
  `user` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `dni` int(11) NOT NULL,
  `birthdate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `teachers`
--

INSERT INTO `teachers` (`id`, `user`, `password`, `name`, `last_name`, `email`, `dni`, `birthdate`) VALUES
(1, 'Oscar23', '123423412', 'Oscar', 'Arias', 'oscar@gmail.com', 304569234, '1995-12-07'),
(2, 'Daniela21', '123423412', 'Daniela', 'Sanchez', 'dani@gmail.com', 304569135, '1995-01-15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teachers_courses`
--
-- Creación: 15-06-2024 a las 21:28:57
-- Última actualización: 23-06-2024 a las 02:35:36
--

CREATE TABLE `teachers_courses` (
  `id` int(11) NOT NULL,
  `id_teacher` int(11) NOT NULL,
  `id_course` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `teachers_courses`
--

INSERT INTO `teachers_courses` (`id`, `id_teacher`, `id_course`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6),
(7, 1, 7),
(8, 1, 8),
(9, 1, 9),
(10, 1, 10),
(11, 2, 1),
(12, 2, 2),
(13, 2, 3),
(14, 2, 4),
(15, 2, 5),
(16, 2, 6),
(17, 2, 7),
(18, 2, 8),
(19, 2, 9),
(20, 2, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teachers_subjects`
--
-- Creación: 15-06-2024 a las 21:28:54
--

CREATE TABLE `teachers_subjects` (
  `id` int(11) NOT NULL,
  `id_teacher` int(11) NOT NULL,
  `id_subject` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_1e6373a0-82f6-4fa6-b378-28237ca49e69` (`id_student`),
  ADD KEY `FK_79571daa-0e41-422c-aca0-23f0b6a98f25` (`id_teacher`);

--
-- Indices de la tabla `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `courses_subjects`
--
ALTER TABLE `courses_subjects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_37651c81-f391-42ac-a8fd-90049161e260` (`id_subject`),
  ADD KEY `FK_445c4808-ee94-4330-953e-53e686aa4071` (`id_course`);

--
-- Indices de la tabla `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_57d83a9b-a652-45d1-847f-5f04af40384a` (`id_course`);

--
-- Indices de la tabla `students_subjects`
--
ALTER TABLE `students_subjects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_30300849-e309-4c22-a39c-b93b2f46b5e8` (`id_subject`),
  ADD KEY `FK_bfb4c365-ed40-4e86-af4c-6041fdf206d7` (`id_student`);

--
-- Indices de la tabla `students_tasks`
--
ALTER TABLE `students_tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_6d2e4ee4-38dd-42f4-95e7-1d73be381f94` (`id_task`),
  ADD KEY `FK_b39cadec-f832-4b80-a430-a1a67a9e8c03` (`id_student`);

--
-- Indices de la tabla `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `subjects_tasks`
--
ALTER TABLE `subjects_tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_19464e73-ba70-4a9e-a7e9-1e3a2f8f9632` (`id_task`),
  ADD KEY `FK_151d44d2-d1b5-4dfb-9ce3-e706ac93babf` (`id_subject`);

--
-- Indices de la tabla `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `teachers_courses`
--
ALTER TABLE `teachers_courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_b54cd076-178e-44d0-908a-1f32d7959990` (`id_course`),
  ADD KEY `FK_0bdae3ae-c993-431f-b55a-e3e00a8c8292` (`id_teacher`);

--
-- Indices de la tabla `teachers_subjects`
--
ALTER TABLE `teachers_subjects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_5bf60774-b1a7-415a-8bbb-e951f1bbfc1d` (`id_subject`),
  ADD KEY `FK_3bcbf9df-807d-4057-b6a8-4813fc2adea2` (`id_teacher`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `courses_subjects`
--
ALTER TABLE `courses_subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `students_subjects`
--
ALTER TABLE `students_subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `students_tasks`
--
ALTER TABLE `students_tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `subjects_tasks`
--
ALTER TABLE `subjects_tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `teachers_courses`
--
ALTER TABLE `teachers_courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `teachers_subjects`
--
ALTER TABLE `teachers_subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `FK_1e6373a0-82f6-4fa6-b378-28237ca49e69` FOREIGN KEY (`id_student`) REFERENCES `students` (`id`),
  ADD CONSTRAINT `FK_79571daa-0e41-422c-aca0-23f0b6a98f25` FOREIGN KEY (`id_teacher`) REFERENCES `teachers` (`id`);

--
-- Filtros para la tabla `courses_subjects`
--
ALTER TABLE `courses_subjects`
  ADD CONSTRAINT `FK_37651c81-f391-42ac-a8fd-90049161e260` FOREIGN KEY (`id_subject`) REFERENCES `subjects` (`id`),
  ADD CONSTRAINT `FK_445c4808-ee94-4330-953e-53e686aa4071` FOREIGN KEY (`id_course`) REFERENCES `courses` (`id`);

--
-- Filtros para la tabla `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `FK_57d83a9b-a652-45d1-847f-5f04af40384a` FOREIGN KEY (`id_course`) REFERENCES `courses` (`id`);

--
-- Filtros para la tabla `students_subjects`
--
ALTER TABLE `students_subjects`
  ADD CONSTRAINT `FK_30300849-e309-4c22-a39c-b93b2f46b5e8` FOREIGN KEY (`id_subject`) REFERENCES `subjects` (`id`),
  ADD CONSTRAINT `FK_bfb4c365-ed40-4e86-af4c-6041fdf206d7` FOREIGN KEY (`id_student`) REFERENCES `students` (`id`);

--
-- Filtros para la tabla `students_tasks`
--
ALTER TABLE `students_tasks`
  ADD CONSTRAINT `FK_6d2e4ee4-38dd-42f4-95e7-1d73be381f94` FOREIGN KEY (`id_task`) REFERENCES `tasks` (`id`),
  ADD CONSTRAINT `FK_b39cadec-f832-4b80-a430-a1a67a9e8c03` FOREIGN KEY (`id_student`) REFERENCES `students` (`id`);

--
-- Filtros para la tabla `subjects_tasks`
--
ALTER TABLE `subjects_tasks`
  ADD CONSTRAINT `FK_151d44d2-d1b5-4dfb-9ce3-e706ac93babf` FOREIGN KEY (`id_subject`) REFERENCES `subjects` (`id`),
  ADD CONSTRAINT `FK_19464e73-ba70-4a9e-a7e9-1e3a2f8f9632` FOREIGN KEY (`id_task`) REFERENCES `tasks` (`id`);

--
-- Filtros para la tabla `teachers_courses`
--
ALTER TABLE `teachers_courses`
  ADD CONSTRAINT `FK_0bdae3ae-c993-431f-b55a-e3e00a8c8292` FOREIGN KEY (`id_teacher`) REFERENCES `teachers` (`id`),
  ADD CONSTRAINT `FK_b54cd076-178e-44d0-908a-1f32d7959990` FOREIGN KEY (`id_course`) REFERENCES `courses` (`id`);

--
-- Filtros para la tabla `teachers_subjects`
--
ALTER TABLE `teachers_subjects`
  ADD CONSTRAINT `FK_3bcbf9df-807d-4057-b6a8-4813fc2adea2` FOREIGN KEY (`id_teacher`) REFERENCES `teachers` (`id`),
  ADD CONSTRAINT `FK_5bf60774-b1a7-415a-8bbb-e951f1bbfc1d` FOREIGN KEY (`id_subject`) REFERENCES `subjects` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
