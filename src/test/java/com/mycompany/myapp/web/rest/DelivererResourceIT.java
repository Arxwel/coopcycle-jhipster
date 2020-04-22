package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.CoopcycleApp;
import com.mycompany.myapp.domain.Deliverer;
import com.mycompany.myapp.repository.DelivererRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link DelivererResource} REST controller.
 */
@SpringBootTest(classes = CoopcycleApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class DelivererResourceIT {

    @Autowired
    private DelivererRepository delivererRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDelivererMockMvc;

    private Deliverer deliverer;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Deliverer createEntity(EntityManager em) {
        Deliverer deliverer = new Deliverer();
        return deliverer;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Deliverer createUpdatedEntity(EntityManager em) {
        Deliverer deliverer = new Deliverer();
        return deliverer;
    }

    @BeforeEach
    public void initTest() {
        deliverer = createEntity(em);
    }

    @Test
    @Transactional
    public void createDeliverer() throws Exception {
        int databaseSizeBeforeCreate = delivererRepository.findAll().size();

        // Create the Deliverer
        restDelivererMockMvc.perform(post("/api/deliverers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(deliverer)))
            .andExpect(status().isCreated());

        // Validate the Deliverer in the database
        List<Deliverer> delivererList = delivererRepository.findAll();
        assertThat(delivererList).hasSize(databaseSizeBeforeCreate + 1);
        Deliverer testDeliverer = delivererList.get(delivererList.size() - 1);
    }

    @Test
    @Transactional
    public void createDelivererWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = delivererRepository.findAll().size();

        // Create the Deliverer with an existing ID
        deliverer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDelivererMockMvc.perform(post("/api/deliverers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(deliverer)))
            .andExpect(status().isBadRequest());

        // Validate the Deliverer in the database
        List<Deliverer> delivererList = delivererRepository.findAll();
        assertThat(delivererList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDeliverers() throws Exception {
        // Initialize the database
        delivererRepository.saveAndFlush(deliverer);

        // Get all the delivererList
        restDelivererMockMvc.perform(get("/api/deliverers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(deliverer.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getDeliverer() throws Exception {
        // Initialize the database
        delivererRepository.saveAndFlush(deliverer);

        // Get the deliverer
        restDelivererMockMvc.perform(get("/api/deliverers/{id}", deliverer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(deliverer.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingDeliverer() throws Exception {
        // Get the deliverer
        restDelivererMockMvc.perform(get("/api/deliverers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDeliverer() throws Exception {
        // Initialize the database
        delivererRepository.saveAndFlush(deliverer);

        int databaseSizeBeforeUpdate = delivererRepository.findAll().size();

        // Update the deliverer
        Deliverer updatedDeliverer = delivererRepository.findById(deliverer.getId()).get();
        // Disconnect from session so that the updates on updatedDeliverer are not directly saved in db
        em.detach(updatedDeliverer);

        restDelivererMockMvc.perform(put("/api/deliverers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDeliverer)))
            .andExpect(status().isOk());

        // Validate the Deliverer in the database
        List<Deliverer> delivererList = delivererRepository.findAll();
        assertThat(delivererList).hasSize(databaseSizeBeforeUpdate);
        Deliverer testDeliverer = delivererList.get(delivererList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingDeliverer() throws Exception {
        int databaseSizeBeforeUpdate = delivererRepository.findAll().size();

        // Create the Deliverer

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDelivererMockMvc.perform(put("/api/deliverers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(deliverer)))
            .andExpect(status().isBadRequest());

        // Validate the Deliverer in the database
        List<Deliverer> delivererList = delivererRepository.findAll();
        assertThat(delivererList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDeliverer() throws Exception {
        // Initialize the database
        delivererRepository.saveAndFlush(deliverer);

        int databaseSizeBeforeDelete = delivererRepository.findAll().size();

        // Delete the deliverer
        restDelivererMockMvc.perform(delete("/api/deliverers/{id}", deliverer.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Deliverer> delivererList = delivererRepository.findAll();
        assertThat(delivererList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
