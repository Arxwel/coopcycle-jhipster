package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.RestaurantOwner;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the RestaurantOwner entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RestaurantOwnerRepository extends JpaRepository<RestaurantOwner, Long> {
}
