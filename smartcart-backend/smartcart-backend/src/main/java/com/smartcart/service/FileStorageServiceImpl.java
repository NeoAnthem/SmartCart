package com.smartcart.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageServiceImpl
        implements FileStorageService {

    private static final String
            UPLOAD_DIR =
            "D:/Software Development/Projects/Smartcart/uploads/images/";

    @Override
    public String uploadFile(
            MultipartFile file) {

        try {

            String fileName =
                    file.getOriginalFilename();

            Path uploadPath =
                    Paths.get(
                            UPLOAD_DIR);

            if (!Files.exists(
                    uploadPath)) {

                Files.createDirectories(
                        uploadPath);
            }

            Path filePath =
                    uploadPath.resolve(
                            fileName);

            Files.copy(
                    file.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING);

            return fileName;

        } catch (IOException e) {

            throw new RuntimeException(
                    "Image Upload Failed");
        }
    }
}