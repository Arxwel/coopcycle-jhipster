package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Deliverer;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Deliverer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DelivererRepository extends JpaRepository<Deliverer, Long> {
}
