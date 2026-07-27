package com.smartcart.controller;

import com.smartcart.service.FileStorageService;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/products")
public class FileUploadController {

    private final FileStorageService
            fileStorageService;

    public FileUploadController(
            FileStorageService fileStorageService) {

        this.fileStorageService =
                fileStorageService;
    }

    @PostMapping("/upload")
    public String uploadImage(

            @RequestParam("file")
            MultipartFile file) {

        return fileStorageService
                .uploadFile(file);
    }
}