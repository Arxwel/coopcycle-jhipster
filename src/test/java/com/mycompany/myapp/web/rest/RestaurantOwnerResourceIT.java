package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.CoopcycleApp;
import com.mycompany.myapp.domain.RestaurantOwner;
import com.mycompany.myapp.repository.RestaurantOwnerRepository;

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
 * Integration tests for the {@link RestaurantOwnerResource} REST controller.
 */
@SpringBootTest(classes = CoopcycleApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class RestaurantOwnerResourceIT {

    @Autowired
    private RestaurantOwnerRepository restaurantOwnerRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRestaurantOwnerMockMvc;

    private RestaurantOwner restaurantOwner;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RestaurantOwner createEntity(EntityManager em) {
        RestaurantOwner restaurantOwner = new RestaurantOwner();
        return restaurantOwner;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RestaurantOwner createUpdatedEntity(EntityManager em) {
        RestaurantOwner restaurantOwner = new RestaurantOwner();
        return restaurantOwner;
    }

    @BeforeEach
    public void initTest() {
        restaurantOwner = createEntity(em);
    }

    @Test
    @Transactional
    public void createRestaurantOwner() throws Exception {
        int databaseSizeBeforeCreate = restaurantOwnerRepository.findAll().size();

        // Create the RestaurantOwner
        restRestaurantOwnerMockMvc.perform(post("/api/restaurant-owners")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(restaurantOwner)))
            .andExpect(status().isCreated());

        // Validate the RestaurantOwner in the database
        List<RestaurantOwner> restaurantOwnerList = restaurantOwnerRepository.findAll();
        assertThat(restaurantOwnerList).hasSize(databaseSizeBeforeCreate + 1);
        RestaurantOwner testRestaurantOwner = restaurantOwnerList.get(restaurantOwnerList.size() - 1);
    }

    @Test
    @Transactional
    public void createRestaurantOwnerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = restaurantOwnerRepository.findAll().size();

        // Create the RestaurantOwner with an existing ID
        restaurantOwner.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRestaurantOwnerMockMvc.perform(post("/api/restaurant-owners")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(restaurantOwner)))
            .andExpect(status().isBadRequest());

        // Validate the RestaurantOwner in the database
        List<RestaurantOwner> restaurantOwnerList = restaurantOwnerRepository.findAll();
        assertThat(restaurantOwnerList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRestaurantOwners() throws Exception {
        // Initialize the database
        restaurantOwnerRepository.saveAndFlush(restaurantOwner);

        // Get all the restaurantOwnerList
        restRestaurantOwnerMockMvc.perform(get("/api/restaurant-owners?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(restaurantOwner.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getRestaurantOwner() throws Exception {
        // Initialize the database
        restaurantOwnerRepository.saveAndFlush(restaurantOwner);

        // Get the restaurantOwner
        restRestaurantOwnerMockMvc.perform(get("/api/restaurant-owners/{id}", restaurantOwner.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(restaurantOwner.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRestaurantOwner() throws Exception {
        // Get the restaurantOwner
        restRestaurantOwnerMockMvc.perform(get("/api/restaurant-owners/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRestaurantOwner() throws Exception {
        // Initialize the database
        restaurantOwnerRepository.saveAndFlush(restaurantOwner);

        int databaseSizeBeforeUpdate = restaurantOwnerRepository.findAll().size();

        // Update the restaurantOwner
        RestaurantOwner updatedRestaurantOwner = restaurantOwnerRepository.findById(restaurantOwner.getId()).get();
        // Disconnect from session so that the updates on updatedRestaurantOwner are not directly saved in db
        em.detach(updatedRestaurantOwner);

        restRestaurantOwnerMockMvc.perform(put("/api/restaurant-owners")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRestaurantOwner)))
            .andExpect(status().isOk());

        // Validate the RestaurantOwner in the database
        List<RestaurantOwner> restaurantOwnerList = restaurantOwnerRepository.findAll();
        assertThat(restaurantOwnerList).hasSize(databaseSizeBeforeUpdate);
        RestaurantOwner testRestaurantOwner = restaurantOwnerList.get(restaurantOwnerList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingRestaurantOwner() throws Exception {
        int databaseSizeBeforeUpdate = restaurantOwnerRepository.findAll().size();

        // Create the RestaurantOwner

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRestaurantOwnerMockMvc.perform(put("/api/restaurant-owners")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(restaurantOwner)))
            .andExpect(status().isBadRequest());

        // Validate the RestaurantOwner in the database
        List<RestaurantOwner> restaurantOwnerList = restaurantOwnerRepository.findAll();
        assertThat(restaurantOwnerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRestaurantOwner() throws Exception {
        // Initialize the database
        restaurantOwnerRepository.saveAndFlush(restaurantOwner);

        int databaseSizeBeforeDelete = restaurantOwnerRepository.findAll().size();

        // Delete the restaurantOwner
        restRestaurantOwnerMockMvc.perform(delete("/api/restaurant-owners/{id}", restaurantOwner.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RestaurantOwner> restaurantOwnerList = restaurantOwnerRepository.findAll();
        assertThat(restaurantOwnerList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
