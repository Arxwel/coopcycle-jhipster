package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.CoopcycleApp;
import com.mycompany.myapp.domain.UserAccount;
import com.mycompany.myapp.repository.UserAccountRepository;

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
 * Integration tests for the {@link UserAccountResource} REST controller.
 */
@SpringBootTest(classes = CoopcycleApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class UserAccountResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SURNAME = "AAAAAAAAAA";
    private static final String UPDATED_SURNAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "Pj+P;@*%>#.m2$o>";
    private static final String UPDATED_EMAIL = "P\\FV]@DxC~k.m";

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE = "0754903455";
    private static final String UPDATED_PHONE = "0919238012";

    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUserAccountMockMvc;

    private UserAccount userAccount;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserAccount createEntity(EntityManager em) {
        UserAccount userAccount = new UserAccount()
            .name(DEFAULT_NAME)
            .surname(DEFAULT_SURNAME)
            .email(DEFAULT_EMAIL)
            .password(DEFAULT_PASSWORD)
            .address(DEFAULT_ADDRESS)
            .phone(DEFAULT_PHONE);
        return userAccount;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserAccount createUpdatedEntity(EntityManager em) {
        UserAccount userAccount = new UserAccount()
            .name(UPDATED_NAME)
            .surname(UPDATED_SURNAME)
            .email(UPDATED_EMAIL)
            .password(UPDATED_PASSWORD)
            .address(UPDATED_ADDRESS)
            .phone(UPDATED_PHONE);
        return userAccount;
    }

    @BeforeEach
    public void initTest() {
        userAccount = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserAccount() throws Exception {
        int databaseSizeBeforeCreate = userAccountRepository.findAll().size();

        // Create the UserAccount
        restUserAccountMockMvc.perform(post("/api/user-accounts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userAccount)))
            .andExpect(status().isCreated());

        // Validate the UserAccount in the database
        List<UserAccount> userAccountList = userAccountRepository.findAll();
        assertThat(userAccountList).hasSize(databaseSizeBeforeCreate + 1);
        UserAccount testUserAccount = userAccountList.get(userAccountList.size() - 1);
        assertThat(testUserAccount.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testUserAccount.getSurname()).isEqualTo(DEFAULT_SURNAME);
        assertThat(testUserAccount.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testUserAccount.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testUserAccount.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testUserAccount.getPhone()).isEqualTo(DEFAULT_PHONE);
    }

    @Test
    @Transactional
    public void createUserAccountWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userAccountRepository.findAll().size();

        // Create the UserAccount with an existing ID
        userAccount.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserAccountMockMvc.perform(post("/api/user-accounts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userAccount)))
            .andExpect(status().isBadRequest());

        // Validate the UserAccount in the database
        List<UserAccount> userAccountList = userAccountRepository.findAll();
        assertThat(userAccountList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = userAccountRepository.findAll().size();
        // set the field null
        userAccount.setName(null);

        // Create the UserAccount, which fails.

        restUserAccountMockMvc.perform(post("/api/user-accounts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userAccount)))
            .andExpect(status().isBadRequest());

        List<UserAccount> userAccountList = userAccountRepository.findAll();
        assertThat(userAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSurnameIsRequired() throws Exception {
        int databaseSizeBeforeTest = userAccountRepository.findAll().size();
        // set the field null
        userAccount.setSurname(null);

        // Create the UserAccount, which fails.

        restUserAccountMockMvc.perform(post("/api/user-accounts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userAccount)))
            .andExpect(status().isBadRequest());

        List<UserAccount> userAccountList = userAccountRepository.findAll();
        assertThat(userAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = userAccountRepository.findAll().size();
        // set the field null
        userAccount.setEmail(null);

        // Create the UserAccount, which fails.

        restUserAccountMockMvc.perform(post("/api/user-accounts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userAccount)))
            .andExpect(status().isBadRequest());

        List<UserAccount> userAccountList = userAccountRepository.findAll();
        assertThat(userAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPasswordIsRequired() throws Exception {
        int databaseSizeBeforeTest = userAccountRepository.findAll().size();
        // set the field null
        userAccount.setPassword(null);

        // Create the UserAccount, which fails.

        restUserAccountMockMvc.perform(post("/api/user-accounts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userAccount)))
            .andExpect(status().isBadRequest());

        List<UserAccount> userAccountList = userAccountRepository.findAll();
        assertThat(userAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAddressIsRequired() throws Exception {
        int databaseSizeBeforeTest = userAccountRepository.findAll().size();
        // set the field null
        userAccount.setAddress(null);

        // Create the UserAccount, which fails.

        restUserAccountMockMvc.perform(post("/api/user-accounts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userAccount)))
            .andExpect(status().isBadRequest());

        List<UserAccount> userAccountList = userAccountRepository.findAll();
        assertThat(userAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPhoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = userAccountRepository.findAll().size();
        // set the field null
        userAccount.setPhone(null);

        // Create the UserAccount, which fails.

        restUserAccountMockMvc.perform(post("/api/user-accounts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userAccount)))
            .andExpect(status().isBadRequest());

        List<UserAccount> userAccountList = userAccountRepository.findAll();
        assertThat(userAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUserAccounts() throws Exception {
        // Initialize the database
        userAccountRepository.saveAndFlush(userAccount);

        // Get all the userAccountList
        restUserAccountMockMvc.perform(get("/api/user-accounts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userAccount.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].surname").value(hasItem(DEFAULT_SURNAME)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD)))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS)))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE)));
    }
    
    @Test
    @Transactional
    public void getUserAccount() throws Exception {
        // Initialize the database
        userAccountRepository.saveAndFlush(userAccount);

        // Get the userAccount
        restUserAccountMockMvc.perform(get("/api/user-accounts/{id}", userAccount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(userAccount.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.surname").value(DEFAULT_SURNAME))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE));
    }

    @Test
    @Transactional
    public void getNonExistingUserAccount() throws Exception {
        // Get the userAccount
        restUserAccountMockMvc.perform(get("/api/user-accounts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserAccount() throws Exception {
        // Initialize the database
        userAccountRepository.saveAndFlush(userAccount);

        int databaseSizeBeforeUpdate = userAccountRepository.findAll().size();

        // Update the userAccount
        UserAccount updatedUserAccount = userAccountRepository.findById(userAccount.getId()).get();
        // Disconnect from session so that the updates on updatedUserAccount are not directly saved in db
        em.detach(updatedUserAccount);
        updatedUserAccount
            .name(UPDATED_NAME)
            .surname(UPDATED_SURNAME)
            .email(UPDATED_EMAIL)
            .password(UPDATED_PASSWORD)
            .address(UPDATED_ADDRESS)
            .phone(UPDATED_PHONE);

        restUserAccountMockMvc.perform(put("/api/user-accounts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserAccount)))
            .andExpect(status().isOk());

        // Validate the UserAccount in the database
        List<UserAccount> userAccountList = userAccountRepository.findAll();
        assertThat(userAccountList).hasSize(databaseSizeBeforeUpdate);
        UserAccount testUserAccount = userAccountList.get(userAccountList.size() - 1);
        assertThat(testUserAccount.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testUserAccount.getSurname()).isEqualTo(UPDATED_SURNAME);
        assertThat(testUserAccount.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testUserAccount.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testUserAccount.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testUserAccount.getPhone()).isEqualTo(UPDATED_PHONE);
    }

    @Test
    @Transactional
    public void updateNonExistingUserAccount() throws Exception {
        int databaseSizeBeforeUpdate = userAccountRepository.findAll().size();

        // Create the UserAccount

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserAccountMockMvc.perform(put("/api/user-accounts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userAccount)))
            .andExpect(status().isBadRequest());

        // Validate the UserAccount in the database
        List<UserAccount> userAccountList = userAccountRepository.findAll();
        assertThat(userAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserAccount() throws Exception {
        // Initialize the database
        userAccountRepository.saveAndFlush(userAccount);

        int databaseSizeBeforeDelete = userAccountRepository.findAll().size();

        // Delete the userAccount
        restUserAccountMockMvc.perform(delete("/api/user-accounts/{id}", userAccount.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserAccount> userAccountList = userAccountRepository.findAll();
        assertThat(userAccountList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
