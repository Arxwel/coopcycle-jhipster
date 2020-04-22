package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * The Product entity.
 */
@ApiModel(description = "The Product entity.")
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Size(min = 5, max = 280)
    @Column(name = "description", length = 280)
    private String description;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "price", nullable = false)
    private Float price;

    @NotNull
    @Column(name = "disponibility", nullable = false)
    private Boolean disponibility;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("products")
    private Restaurant products;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @NotNull
    @JoinTable(name = "product_baskets",
               joinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "baskets_id", referencedColumnName = "id"))
    private Set<Basket> baskets = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Product name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Product description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Float getPrice() {
        return price;
    }

    public Product price(Float price) {
        this.price = price;
        return this;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Boolean isDisponibility() {
        return disponibility;
    }

    public Product disponibility(Boolean disponibility) {
        this.disponibility = disponibility;
        return this;
    }

    public void setDisponibility(Boolean disponibility) {
        this.disponibility = disponibility;
    }

    public Restaurant getProducts() {
        return products;
    }

    public Product products(Restaurant restaurant) {
        this.products = restaurant;
        return this;
    }

    public void setProducts(Restaurant restaurant) {
        this.products = restaurant;
    }

    public Set<Basket> getBaskets() {
        return baskets;
    }

    public Product baskets(Set<Basket> baskets) {
        this.baskets = baskets;
        return this;
    }

    public Product addBaskets(Basket basket) {
        this.baskets.add(basket);
        basket.getProducts().add(this);
        return this;
    }

    public Product removeBaskets(Basket basket) {
        this.baskets.remove(basket);
        basket.getProducts().remove(this);
        return this;
    }

    public void setBaskets(Set<Basket> baskets) {
        this.baskets = baskets;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", price=" + getPrice() +
            ", disponibility='" + isDisponibility() + "'" +
            "}";
    }
}
