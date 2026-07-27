package com.smartcart.dto;

import jakarta.validation.constraints.NotBlank;

public class CategoryDTO {

    @NotBlank
    private String name;

    public CategoryDTO() {
    }

    public String getName() {
        return name;
    }

    public void setName(
            String name) {
        this.name = name;
    }
}