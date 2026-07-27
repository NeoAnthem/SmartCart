package com.smartcart.service;

import com.smartcart.dto.ProductDTO;
import com.smartcart.entity.Category;
import com.smartcart.entity.Product;
import com.smartcart.exception.CategoryNotFoundException;
import com.smartcart.exception.ProductNotFoundException;
import com.smartcart.repository.CategoryRepository;
import com.smartcart.repository.ProductRepository;

import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

@Service
public class ProductServiceImpl
        implements ProductService {

    private final ProductRepository
            productRepository;

    private final CategoryRepository
            categoryRepository;

    public ProductServiceImpl(
            ProductRepository productRepository,
            CategoryRepository categoryRepository) {

        this.productRepository =
                productRepository;

        this.categoryRepository =
                categoryRepository;
    }

    @Override
    public Product createProduct(
            ProductDTO productDTO) {

        Category category =
                categoryRepository
                        .findById(
                                productDTO.getCategoryId())
                        .orElseThrow(
                                () ->
                                        new CategoryNotFoundException(
                                                "Category Not Found"));

        Product product =
                new Product();

        product.setName(
                productDTO.getName());

        product.setDescription(
                productDTO.getDescription());

        product.setPrice(
                productDTO.getPrice());

        product.setStock(
                productDTO.getStock());

        product.setImageUrl(
                productDTO.getImageUrl());

        product.setCategory(
                category);

        return productRepository
                .save(product);
    }

    @Override
    public List<Product>
    getAllProducts() {

        return productRepository
                .findAll();
    }

    @Override
    public Product getProductById(
            Long id) {

        return productRepository
                .findById(id)
                .orElseThrow(
                        () ->
                                new ProductNotFoundException(
                                        "Product Not Found"));
    }

    @Override
    public Product updateProduct(
            Long id,
            ProductDTO productDTO) {

        Product product =
                getProductById(id);

        product.setName(
                productDTO.getName());

        product.setDescription(
                productDTO.getDescription());

        product.setPrice(
                productDTO.getPrice());

        product.setStock(
                productDTO.getStock());

        product.setImageUrl(
                productDTO.getImageUrl());

        if (productDTO.getCategoryId() != null) {

            Category category =
                    categoryRepository
                            .findById(
                                    productDTO.getCategoryId())
                            .orElseThrow(
                                    () ->
                                            new CategoryNotFoundException(
                                                    "Category Not Found"));

            product.setCategory(
                    category);
        }

        return productRepository
                .save(product);
    }

    @Override
    public void deleteProduct(
            Long id) {

        Product product =
                getProductById(id);

        productRepository
                .delete(product);
    }

    @Override
    public List<Product>
    searchProducts(
            String keyword) {

        return productRepository
                .findByNameContainingIgnoreCase(
                        keyword);
    }

    @Override
    public Page<Product> getProducts(
            int page,
            int size) {

        return productRepository.findAll(
                PageRequest.of(page, size));
    }

    @Override
    public Product updateStock(
            Long productId,
            Integer stock) {

        Product product =
                getProductById(
                        productId);

        product.setStock(
                stock);

        return productRepository.save(
                product);
    }

    @Override
    public List<Product>
    getLowStockProducts() {

        return productRepository
                .findByStockLessThan(5);
    }

    @Override
    public List<Product>
    getProductsByCategory(
            Long categoryId) {

        return productRepository
                .findByCategoryId(
                        categoryId);
    }

    @Override
    public List<Product>
    getProductsByPriceAsc() {

        return productRepository
                .findAllByOrderByPriceAsc();
    }

    @Override
    public List<Product>
    getProductsByPriceDesc() {

        return productRepository
                .findAllByOrderByPriceDesc();
    }
}