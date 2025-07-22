-- MySQL dump 10.13  Distrib 8.4.3, for Win64 (x86_64)
--
-- Host: localhost    Database: db_systemptb
-- ------------------------------------------------------
-- Server version	8.4.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `penimbangan`
--

DROP TABLE IF EXISTS `penimbangan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `penimbangan` (
  `id` char(36) COLLATE utf8mb4_general_ci NOT NULL DEFAULT (uuid()),
  `id_truk` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `berat_awal` float DEFAULT NULL,
  `berat_akhir` float DEFAULT NULL,
  `massa_barang` float DEFAULT NULL,
  `penimbang_id` char(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `relasi_type` enum('supplier','customer') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `relasi_nama` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `waktu_penimbangan` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` enum('pending','accepted','rejected') COLLATE utf8mb4_general_ci DEFAULT 'pending',
  `status_validasi` enum('pending','disetujui','ditolak') COLLATE utf8mb4_general_ci DEFAULT 'pending',
  `id_penimbangan` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_penimbangan` (`id_penimbangan`),
  KEY `truk_id` (`id_truk`),
  KEY `penimbang_id` (`penimbang_id`),
  CONSTRAINT `penimbangan_ibfk_1` FOREIGN KEY (`id_truk`) REFERENCES `truk` (`id`),
  CONSTRAINT `penimbangan_ibfk_2` FOREIGN KEY (`penimbang_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `penimbangan`
--

LOCK TABLES `penimbangan` WRITE;
/*!40000 ALTER TABLE `penimbangan` DISABLE KEYS */;
INSERT INTO `penimbangan` VALUES ('173dc73e-63e3-11f0-af24-dc454625ff52','d0760acd-62df-11f0-b6c7-dc454625ff52',100,100,0,NULL,'supplier','Pt','2025-07-18 21:25:00','pending','disetujui',3),('34b9e119-6320-11f0-bb5f-dc454625ff52','52c0827d-62dd-11f0-b6c7-dc454625ff52',100,100,0,NULL,'customer','PT Sinar Abadi','2025-07-17 22:10:00','pending','ditolak',1),('7fde57a8-64b1-11f0-92fd-dc454625ff52','73159913-62d7-11f0-b6c7-dc454625ff52',100,19,81,NULL,NULL,NULL,'2025-07-19 22:03:00','pending','ditolak',4),('aa880e60-6379-11f0-8da2-dc454625ff52','8ad2427e-6379-11f0-8da2-dc454625ff52',100,100,0,NULL,'supplier','PT Suray','2025-07-18 08:51:00','pending','disetujui',2),('d5a570bc-64b3-11f0-92fd-dc454625ff52','e987890a-64b2-11f0-92fd-dc454625ff52',100,100,0,NULL,'supplier','Pt rea Reo','2025-07-19 22:19:00','pending','disetujui',5),('ea9b13fd-64bb-11f0-92fd-dc454625ff52','d466885f-64bb-11f0-92fd-dc454625ff52',100,20,80,NULL,'supplier','PT Sejahtera Indah','2025-07-19 23:17:00','pending','disetujui',6);
/*!40000 ALTER TABLE `penimbangan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `nama_role` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES ('1','Satpam'),('2','Petugas Penimbang'),('3','Admin Logistik');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `surat_jalan`
--

DROP TABLE IF EXISTS `surat_jalan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `surat_jalan` (
  `id` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `penimbangan_id` char(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nomor_surat` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `waktu_cetak` datetime DEFAULT NULL,
  `admin_logistik_id` char(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `penimbangan_id` (`penimbangan_id`),
  KEY `admin_logistik_id` (`admin_logistik_id`),
  CONSTRAINT `surat_jalan_ibfk_1` FOREIGN KEY (`penimbangan_id`) REFERENCES `penimbangan` (`id`),
  CONSTRAINT `surat_jalan_ibfk_2` FOREIGN KEY (`admin_logistik_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `surat_jalan`
--

LOCK TABLES `surat_jalan` WRITE;
/*!40000 ALTER TABLE `surat_jalan` DISABLE KEYS */;
/*!40000 ALTER TABLE `surat_jalan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `truk`
--

DROP TABLE IF EXISTS `truk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `truk` (
  `id` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `no_polisi` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `nama_sopir` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `jenis_barang` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `waktu_masuk` datetime DEFAULT NULL,
  `waktu_keluar` datetime DEFAULT NULL,
  `satpam_id` char(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status_muatan` enum('masuk','keluar') COLLATE utf8mb4_general_ci DEFAULT 'masuk',
  `status_proses` varchar(50) COLLATE utf8mb4_general_ci DEFAULT 'pending_penimbangan',
  `relasi_nama` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `relasi_type` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `satpam_id` (`satpam_id`),
  CONSTRAINT `truk_ibfk_1` FOREIGN KEY (`satpam_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `truk`
--

LOCK TABLES `truk` WRITE;
/*!40000 ALTER TABLE `truk` DISABLE KEYS */;
INSERT INTO `truk` VALUES ('52c0827d-62dd-11f0-b6c7-dc454625ff52','B 1234 PTB','Pak Asep','Besi','2025-07-17 14:11:56',NULL,NULL,'masuk','siap_keluar','PT Sinar Abadi','perusahaan'),('73159913-62d7-11f0-b6c7-dc454625ff52','W 123 FE','supri','Kabel','2025-07-17 13:29:54',NULL,NULL,'masuk','siap_keluar',NULL,NULL),('8ad2427e-6379-11f0-8da2-dc454625ff52','B 789 UW','Zuhdi','Tembaga','2025-07-18 08:50:00','2025-07-18 10:14:47','241c2b0e-62cb-11f0-a8d8-dc454625ff52','keluar','selesai','PT Suray','Supplier'),('d0760acd-62df-11f0-b6c7-dc454625ff52','w 2213 BE','Sugiono','Tembaga','2025-07-17 14:29:00',NULL,NULL,'masuk','siap_keluar','Pt','Supplier'),('d466885f-64bb-11f0-92fd-dc454625ff52','W 3345 BU','Gombes','Pasir ','2025-07-19 23:17:00','2025-07-19 23:18:26','241c2b0e-62cb-11f0-a8d8-dc454625ff52','masuk','siap_keluar','PT Sejahtera Indah','Supplier'),('e987890a-64b2-11f0-92fd-dc454625ff52','w 2213 OK','Yanti','Besi','2025-07-19 22:13:00','2025-07-19 23:16:27','241c2b0e-62cb-11f0-a8d8-dc454625ff52','keluar','selesai','Pt rea Reo','Supplier'),('f72cbea0-62d9-11f0-b6c7-dc454625ff52','w 2213 se','Yanto','Besi','2025-07-17 13:47:54',NULL,NULL,'masuk','pending_penimbangan',NULL,NULL);
/*!40000 ALTER TABLE `truk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `nama` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role_id` char(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('241c2b0e-62cb-11f0-a8d8-dc454625ff52','satpam','satpam@gmail.com','$2b$10$I7oXH9rN/QxW/mUTf6mckuOczu1Y7HYaAqFLZc3YckGcej3CN0BZi','1'),('7ecabd0c-6219-11f0-8c7b-dc454625ff52','admin','admin123@gmail.com','$2b$10$KcrXTLIrMyTP/zHaGgwWM.EGYIfg.avW73s.V0r7Urne0zWBEQjBW','3'),('c1439d68-62d7-11f0-b6c7-dc454625ff52','penimbang','penimbang@gmail.com','$2b$10$frtXST0EwRgph7lob2wVYOYVUUzCJQXwtCb9ozmElCKy.E46QvGia','2');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-21 23:10:22
