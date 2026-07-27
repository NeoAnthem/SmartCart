package com.smartcart.controller;

import com.smartcart.dto.ProductDTO;
import com.smartcart.entity.Product;
import com.smartcart.service.ProductService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Page;

import org.springframework.security.access.prepost.PreAuthorize;

import com.smartcart.dto.InventoryDTO;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService
            productService;

    public ProductController(
            ProductService productService) {

        this.productService =
                productService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Product createProduct(
            @Valid
            @RequestBody
            ProductDTO productDTO) {

        return productService
                .createProduct(
                        productDTO);
    }

    @GetMapping
    public List<Product>
    getAllProducts() {

        return productService
                .getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(
            @PathVariable Long id) {

        return productService
                .getProductById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable Long id,

            @RequestBody
            ProductDTO productDTO) {

        return productService
                .updateProduct(
                        id,
                        productDTO);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteProduct(
            @PathVariable Long id) {

        productService
                .deleteProduct(id);

        return "Product Deleted";
    }

    @GetMapping("/category/{categoryId}")
    public List<Product>
    getProductsByCategory(

            @PathVariable
            Long categoryId) {

        return productService
                .getProductsByCategory(
                        categoryId);
    }

    @GetMapping("/search")
    public List<Product>
    searchProducts(
            @RequestParam
            String keyword) {

        return productService
                .searchProducts(
                        keyword);
    }

    @GetMapping("/sort/price-asc")
    public List<Product>
    getProductsByPriceAsc() {

        return productService
                .getProductsByPriceAsc();
    }

    @GetMapping("/sort/price-desc")
    public List<Product>
    getProductsByPriceDesc() {

        return productService
                .getProductsByPriceDesc();
    }

    @GetMapping("/paged")
    public Page<Product> getProductsPaged(

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "5")
            int size) {

        return productService.getProducts(
                page,
                size);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/stock")
    public Product updateStock(

            @PathVariable Long id,

            @RequestBody
            InventoryDTO dto) {

        return productService
                .updateStock(
                        id,
                        dto.getStock());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/low-stock")
    public List<Product>
    getLowStockProducts() {

        return productService
                .getLowStockProducts();
    }


}