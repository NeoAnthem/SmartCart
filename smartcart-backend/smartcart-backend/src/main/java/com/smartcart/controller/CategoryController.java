package com.smartcart.controller;

import com.smartcart.dto.CategoryDTO;
import com.smartcart.entity.Category;
import com.smartcart.service.CategoryService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService
            categoryService;

    public CategoryController(
            CategoryService categoryService) {

        this.categoryService =
                categoryService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Category createCategory(
            @Valid
            @RequestBody
            CategoryDTO categoryDTO) {

        return categoryService
                .createCategory(
                        categoryDTO);
    }

    @GetMapping
    public List<Category>
    getAllCategories() {

        return categoryService
                .getAllCategories();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Category updateCategory(
            @PathVariable Long id,

            @RequestBody
            CategoryDTO categoryDTO) {

        return categoryService
                .updateCategory(
                        id,
                        categoryDTO);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteCategory(
            @PathVariable Long id) {

        System.out.println("DELETE API HIT");

        categoryService
                .deleteCategory(id);

        return "Category Deleted";
    }
}