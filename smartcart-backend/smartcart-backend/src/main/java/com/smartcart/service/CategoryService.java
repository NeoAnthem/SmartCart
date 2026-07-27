package com.smartcart.service;

import com.smartcart.dto.CategoryDTO;
import com.smartcart.entity.Category;

import java.util.List;

public interface CategoryService {

    Category createCategory(
            CategoryDTO categoryDTO);

    List<Category> getAllCategories();

    Category updateCategory(
            Long id,
            CategoryDTO categoryDTO);

    void deleteCategory(Long id);
}