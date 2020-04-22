package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Notification;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Notification entity.
 */
@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query(value = "select distinct notification from Notification notification left join fetch notification.notifications",
        countQuery = "select count(distinct notification) from Notification notification")
    Page<Notification> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct notification from Notification notification left join fetch notification.notifications")
    List<Notification> findAllWithEagerRelationships();

    @Query("select notification from Notification notification left join fetch notification.notifications where notification.id =:id")
    Optional<Notification> findOneWithEagerRelationships(@Param("id") Long id);
}
