package com.smartcart.service;

import com.smartcart.dto.ProductDTO;
import com.smartcart.entity.Product;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {

    Product createProduct(
            ProductDTO productDTO);

    List<Product> getAllProducts();

    Product getProductById(
            Long id);

    Product updateProduct(
            Long id,
            ProductDTO productDTO);

    void deleteProduct(
            Long id);

    List<Product> searchProducts(
            String keyword);

    Page<Product> getProducts(
            int page,
            int size);

    Product updateStock(
            Long productId,
            Integer stock);

    List<Product> getLowStockProducts();

    List<Product> getProductsByCategory(
            Long categoryId);

    List<Product> getProductsByPriceAsc();

    List<Product> getProductsByPriceDesc();
}