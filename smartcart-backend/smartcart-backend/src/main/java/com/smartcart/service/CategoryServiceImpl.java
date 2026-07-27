package com.smartcart.service;

import com.smartcart.dto.CategoryDTO;
import com.smartcart.entity.Category;
import com.smartcart.exception.CategoryNotFoundException;
import com.smartcart.repository.CategoryRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl
        implements CategoryService {

    private final CategoryRepository
            categoryRepository;

    public CategoryServiceImpl(
            CategoryRepository categoryRepository) {

        this.categoryRepository =
                categoryRepository;
    }

    @Override
    public Category createCategory(
            CategoryDTO categoryDTO) {

        Category category =
                new Category();

        category.setName(
                categoryDTO.getName());

        return categoryRepository
                .save(category);
    }

    @Override
    public List<Category>
    getAllCategories() {

        return categoryRepository
                .findAll();
    }

    @Override
    public Category updateCategory(
            Long id,
            CategoryDTO categoryDTO) {

        Category category =
                categoryRepository
                        .findById(id)
                        .orElseThrow(
                                () ->
                                        new CategoryNotFoundException(
                                                "Category Not Found"));

        category.setName(
                categoryDTO.getName());

        return categoryRepository
                .save(category);
    }

    @Override
    public void deleteCategory(
            Long id) {

        Category category =
                categoryRepository
                        .findById(id)
                        .orElseThrow(
                                () ->
                                        new CategoryNotFoundException(
                                                "Category Not Found"));

        categoryRepository
                .delete(category);
    }
}