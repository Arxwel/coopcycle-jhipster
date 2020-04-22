package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.RestaurantOwner;
import com.mycompany.myapp.repository.RestaurantOwnerRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.RestaurantOwner}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RestaurantOwnerResource {

    private final Logger log = LoggerFactory.getLogger(RestaurantOwnerResource.class);

    private static final String ENTITY_NAME = "restaurantOwner";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RestaurantOwnerRepository restaurantOwnerRepository;

    public RestaurantOwnerResource(RestaurantOwnerRepository restaurantOwnerRepository) {
        this.restaurantOwnerRepository = restaurantOwnerRepository;
    }

    /**
     * {@code POST  /restaurant-owners} : Create a new restaurantOwner.
     *
     * @param restaurantOwner the restaurantOwner to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new restaurantOwner, or with status {@code 400 (Bad Request)} if the restaurantOwner has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/restaurant-owners")
    public ResponseEntity<RestaurantOwner> createRestaurantOwner(@RequestBody RestaurantOwner restaurantOwner) throws URISyntaxException {
        log.debug("REST request to save RestaurantOwner : {}", restaurantOwner);
        if (restaurantOwner.getId() != null) {
            throw new BadRequestAlertException("A new restaurantOwner cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RestaurantOwner result = restaurantOwnerRepository.save(restaurantOwner);
        return ResponseEntity.created(new URI("/api/restaurant-owners/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /restaurant-owners} : Updates an existing restaurantOwner.
     *
     * @param restaurantOwner the restaurantOwner to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated restaurantOwner,
     * or with status {@code 400 (Bad Request)} if the restaurantOwner is not valid,
     * or with status {@code 500 (Internal Server Error)} if the restaurantOwner couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/restaurant-owners")
    public ResponseEntity<RestaurantOwner> updateRestaurantOwner(@RequestBody RestaurantOwner restaurantOwner) throws URISyntaxException {
        log.debug("REST request to update RestaurantOwner : {}", restaurantOwner);
        if (restaurantOwner.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RestaurantOwner result = restaurantOwnerRepository.save(restaurantOwner);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, restaurantOwner.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /restaurant-owners} : get all the restaurantOwners.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of restaurantOwners in body.
     */
    @GetMapping("/restaurant-owners")
    public List<RestaurantOwner> getAllRestaurantOwners() {
        log.debug("REST request to get all RestaurantOwners");
        return restaurantOwnerRepository.findAll();
    }

    /**
     * {@code GET  /restaurant-owners/:id} : get the "id" restaurantOwner.
     *
     * @param id the id of the restaurantOwner to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the restaurantOwner, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/restaurant-owners/{id}")
    public ResponseEntity<RestaurantOwner> getRestaurantOwner(@PathVariable Long id) {
        log.debug("REST request to get RestaurantOwner : {}", id);
        Optional<RestaurantOwner> restaurantOwner = restaurantOwnerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(restaurantOwner);
    }

    /**
     * {@code DELETE  /restaurant-owners/:id} : delete the "id" restaurantOwner.
     *
     * @param id the id of the restaurantOwner to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/restaurant-owners/{id}")
    public ResponseEntity<Void> deleteRestaurantOwner(@PathVariable Long id) {
        log.debug("REST request to delete RestaurantOwner : {}", id);
        restaurantOwnerRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
