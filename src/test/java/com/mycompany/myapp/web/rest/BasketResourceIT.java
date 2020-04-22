package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.CoopcycleApp;
import com.mycompany.myapp.domain.Basket;
import com.mycompany.myapp.repository.BasketRepository;

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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.domain.enumeration.BasketState;
/**
 * Integration tests for the {@link BasketResource} REST controller.
 */
@SpringBootTest(classes = CoopcycleApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class BasketResourceIT {

    private static final BasketState DEFAULT_BASKET_STATE = BasketState.NOTFINISHED;
    private static final BasketState UPDATED_BASKET_STATE = BasketState.VALIDATED;

    private static final ZonedDateTime DEFAULT_EXPECTED_DELIVERY_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_EXPECTED_DELIVERY_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_DELIVERY_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_DELIVERY_ADDRESS = "BBBBBBBBBB";

    @Autowired
    private BasketRepository basketRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBasketMockMvc;

    private Basket basket;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Basket createEntity(EntityManager em) {
        Basket basket = new Basket()
            .basketState(DEFAULT_BASKET_STATE)
            .expectedDeliveryTime(DEFAULT_EXPECTED_DELIVERY_TIME)
            .deliveryAddress(DEFAULT_DELIVERY_ADDRESS);
        return basket;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Basket createUpdatedEntity(EntityManager em) {
        Basket basket = new Basket()
            .basketState(UPDATED_BASKET_STATE)
            .expectedDeliveryTime(UPDATED_EXPECTED_DELIVERY_TIME)
            .deliveryAddress(UPDATED_DELIVERY_ADDRESS);
        return basket;
    }

    @BeforeEach
    public void initTest() {
        basket = createEntity(em);
    }

    @Test
    @Transactional
    public void createBasket() throws Exception {
        int databaseSizeBeforeCreate = basketRepository.findAll().size();

        // Create the Basket
        restBasketMockMvc.perform(post("/api/baskets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(basket)))
            .andExpect(status().isCreated());

        // Validate the Basket in the database
        List<Basket> basketList = basketRepository.findAll();
        assertThat(basketList).hasSize(databaseSizeBeforeCreate + 1);
        Basket testBasket = basketList.get(basketList.size() - 1);
        assertThat(testBasket.getBasketState()).isEqualTo(DEFAULT_BASKET_STATE);
        assertThat(testBasket.getExpectedDeliveryTime()).isEqualTo(DEFAULT_EXPECTED_DELIVERY_TIME);
        assertThat(testBasket.getDeliveryAddress()).isEqualTo(DEFAULT_DELIVERY_ADDRESS);
    }

    @Test
    @Transactional
    public void createBasketWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = basketRepository.findAll().size();

        // Create the Basket with an existing ID
        basket.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBasketMockMvc.perform(post("/api/baskets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(basket)))
            .andExpect(status().isBadRequest());

        // Validate the Basket in the database
        List<Basket> basketList = basketRepository.findAll();
        assertThat(basketList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkBasketStateIsRequired() throws Exception {
        int databaseSizeBeforeTest = basketRepository.findAll().size();
        // set the field null
        basket.setBasketState(null);

        // Create the Basket, which fails.

        restBasketMockMvc.perform(post("/api/baskets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(basket)))
            .andExpect(status().isBadRequest());

        List<Basket> basketList = basketRepository.findAll();
        assertThat(basketList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDeliveryAddressIsRequired() throws Exception {
        int databaseSizeBeforeTest = basketRepository.findAll().size();
        // set the field null
        basket.setDeliveryAddress(null);

        // Create the Basket, which fails.

        restBasketMockMvc.perform(post("/api/baskets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(basket)))
            .andExpect(status().isBadRequest());

        List<Basket> basketList = basketRepository.findAll();
        assertThat(basketList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBaskets() throws Exception {
        // Initialize the database
        basketRepository.saveAndFlush(basket);

        // Get all the basketList
        restBasketMockMvc.perform(get("/api/baskets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(basket.getId().intValue())))
            .andExpect(jsonPath("$.[*].basketState").value(hasItem(DEFAULT_BASKET_STATE.toString())))
            .andExpect(jsonPath("$.[*].expectedDeliveryTime").value(hasItem(sameInstant(DEFAULT_EXPECTED_DELIVERY_TIME))))
            .andExpect(jsonPath("$.[*].deliveryAddress").value(hasItem(DEFAULT_DELIVERY_ADDRESS)));
    }
    
    @Test
    @Transactional
    public void getBasket() throws Exception {
        // Initialize the database
        basketRepository.saveAndFlush(basket);

        // Get the basket
        restBasketMockMvc.perform(get("/api/baskets/{id}", basket.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(basket.getId().intValue()))
            .andExpect(jsonPath("$.basketState").value(DEFAULT_BASKET_STATE.toString()))
            .andExpect(jsonPath("$.expectedDeliveryTime").value(sameInstant(DEFAULT_EXPECTED_DELIVERY_TIME)))
            .andExpect(jsonPath("$.deliveryAddress").value(DEFAULT_DELIVERY_ADDRESS));
    }

    @Test
    @Transactional
    public void getNonExistingBasket() throws Exception {
        // Get the basket
        restBasketMockMvc.perform(get("/api/baskets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBasket() throws Exception {
        // Initialize the database
        basketRepository.saveAndFlush(basket);

        int databaseSizeBeforeUpdate = basketRepository.findAll().size();

        // Update the basket
        Basket updatedBasket = basketRepository.findById(basket.getId()).get();
        // Disconnect from session so that the updates on updatedBasket are not directly saved in db
        em.detach(updatedBasket);
        updatedBasket
            .basketState(UPDATED_BASKET_STATE)
            .expectedDeliveryTime(UPDATED_EXPECTED_DELIVERY_TIME)
            .deliveryAddress(UPDATED_DELIVERY_ADDRESS);

        restBasketMockMvc.perform(put("/api/baskets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBasket)))
            .andExpect(status().isOk());

        // Validate the Basket in the database
        List<Basket> basketList = basketRepository.findAll();
        assertThat(basketList).hasSize(databaseSizeBeforeUpdate);
        Basket testBasket = basketList.get(basketList.size() - 1);
        assertThat(testBasket.getBasketState()).isEqualTo(UPDATED_BASKET_STATE);
        assertThat(testBasket.getExpectedDeliveryTime()).isEqualTo(UPDATED_EXPECTED_DELIVERY_TIME);
        assertThat(testBasket.getDeliveryAddress()).isEqualTo(UPDATED_DELIVERY_ADDRESS);
    }

    @Test
    @Transactional
    public void updateNonExistingBasket() throws Exception {
        int databaseSizeBeforeUpdate = basketRepository.findAll().size();

        // Create the Basket

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBasketMockMvc.perform(put("/api/baskets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(basket)))
            .andExpect(status().isBadRequest());

        // Validate the Basket in the database
        List<Basket> basketList = basketRepository.findAll();
        assertThat(basketList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBasket() throws Exception {
        // Initialize the database
        basketRepository.saveAndFlush(basket);

        int databaseSizeBeforeDelete = basketRepository.findAll().size();

        // Delete the basket
        restBasketMockMvc.perform(delete("/api/baskets/{id}", basket.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Basket> basketList = basketRepository.findAll();
        assertThat(basketList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
