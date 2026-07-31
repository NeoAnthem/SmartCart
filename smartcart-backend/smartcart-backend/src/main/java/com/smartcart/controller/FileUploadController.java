package com.smartcart.controller;

import com.smartcart.service.FileStorageService;
import org.springframework.http.MediaType;
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

    @PostMapping(
            value = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public String uploadImage(

            @RequestParam("file")
            MultipartFile file) {

        return fileStorageService
                .uploadFile(file);
    }
}