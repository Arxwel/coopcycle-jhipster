package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * The Restaurant entity.
 */
@ApiModel(description = "The Restaurant entity.")
@Entity
@Table(name = "restaurant")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Restaurant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Size(max = 280)
    @Column(name = "address", length = 280)
    private String address;

    @NotNull
    @Pattern(regexp = "^((\\+)33|0)[1-9](\\d{2}){4}$")
    @Column(name = "tel", nullable = false)
    private String tel;

    @Size(min = 20, max = 512)
    @Column(name = "description", length = 512)
    private String description;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("restaurants")
    private RestaurantOwner restaurants;

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

    public Restaurant name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public Restaurant address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTel() {
        return tel;
    }

    public Restaurant tel(String tel) {
        this.tel = tel;
        return this;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getDescription() {
        return description;
    }

    public Restaurant description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public RestaurantOwner getRestaurants() {
        return restaurants;
    }

    public Restaurant restaurants(RestaurantOwner restaurantOwner) {
        this.restaurants = restaurantOwner;
        return this;
    }

    public void setRestaurants(RestaurantOwner restaurantOwner) {
        this.restaurants = restaurantOwner;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Restaurant)) {
            return false;
        }
        return id != null && id.equals(((Restaurant) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Restaurant{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", address='" + getAddress() + "'" +
            ", tel='" + getTel() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
