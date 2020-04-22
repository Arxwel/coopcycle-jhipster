package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Deliverer;
import com.mycompany.myapp.repository.DelivererRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Deliverer}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DelivererResource {

    private final Logger log = LoggerFactory.getLogger(DelivererResource.class);

    private static final String ENTITY_NAME = "deliverer";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DelivererRepository delivererRepository;

    public DelivererResource(DelivererRepository delivererRepository) {
        this.delivererRepository = delivererRepository;
    }

    /**
     * {@code POST  /deliverers} : Create a new deliverer.
     *
     * @param deliverer the deliverer to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new deliverer, or with status {@code 400 (Bad Request)} if the deliverer has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/deliverers")
    public ResponseEntity<Deliverer> createDeliverer(@RequestBody Deliverer deliverer) throws URISyntaxException {
        log.debug("REST request to save Deliverer : {}", deliverer);
        if (deliverer.getId() != null) {
            throw new BadRequestAlertException("A new deliverer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Deliverer result = delivererRepository.save(deliverer);
        return ResponseEntity.created(new URI("/api/deliverers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /deliverers} : Updates an existing deliverer.
     *
     * @param deliverer the deliverer to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated deliverer,
     * or with status {@code 400 (Bad Request)} if the deliverer is not valid,
     * or with status {@code 500 (Internal Server Error)} if the deliverer couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/deliverers")
    public ResponseEntity<Deliverer> updateDeliverer(@RequestBody Deliverer deliverer) throws URISyntaxException {
        log.debug("REST request to update Deliverer : {}", deliverer);
        if (deliverer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Deliverer result = delivererRepository.save(deliverer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, deliverer.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /deliverers} : get all the deliverers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of deliverers in body.
     */
    @GetMapping("/deliverers")
    public List<Deliverer> getAllDeliverers() {
        log.debug("REST request to get all Deliverers");
        return delivererRepository.findAll();
    }

    /**
     * {@code GET  /deliverers/:id} : get the "id" deliverer.
     *
     * @param id the id of the deliverer to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the deliverer, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/deliverers/{id}")
    public ResponseEntity<Deliverer> getDeliverer(@PathVariable Long id) {
        log.debug("REST request to get Deliverer : {}", id);
        Optional<Deliverer> deliverer = delivererRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(deliverer);
    }

    /**
     * {@code DELETE  /deliverers/:id} : delete the "id" deliverer.
     *
     * @param id the id of the deliverer to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/deliverers/{id}")
    public ResponseEntity<Void> deleteDeliverer(@PathVariable Long id) {
        log.debug("REST request to delete Deliverer : {}", id);
        delivererRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
