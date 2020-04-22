package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * The UserAccount entity.
 */
@ApiModel(description = "The UserAccount entity.")
@Entity
@Table(name = "user_account")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserAccount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "surname", nullable = false)
    private String surname;

    @NotNull
    @Pattern(regexp = "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @NotNull
    @Size(min = 8)
    @Column(name = "password", nullable = false)
    private String password;

    @NotNull
    @Size(max = 280)
    @Column(name = "address", length = 280, nullable = false)
    private String address;

    @NotNull
    @Pattern(regexp = "^((\\+)33|0)[1-9](\\d{2}){4}$")
    @Column(name = "phone", nullable = false)
    private String phone;

    @ManyToMany(mappedBy = "adminedCoops")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Cooperative> adminsys = new HashSet<>();

    @ManyToMany(mappedBy = "cooperatives")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Cooperative> members = new HashSet<>();

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

    public UserAccount name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public UserAccount surname(String surname) {
        this.surname = surname;
        return this;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public UserAccount email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public UserAccount password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAddress() {
        return address;
    }

    public UserAccount address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public UserAccount phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Set<Cooperative> getAdminsys() {
        return adminsys;
    }

    public UserAccount adminsys(Set<Cooperative> cooperatives) {
        this.adminsys = cooperatives;
        return this;
    }

    public UserAccount addAdminsys(Cooperative cooperative) {
        this.adminsys.add(cooperative);
        cooperative.getAdminedCoops().add(this);
        return this;
    }

    public UserAccount removeAdminsys(Cooperative cooperative) {
        this.adminsys.remove(cooperative);
        cooperative.getAdminedCoops().remove(this);
        return this;
    }

    public void setAdminsys(Set<Cooperative> cooperatives) {
        this.adminsys = cooperatives;
    }

    public Set<Cooperative> getMembers() {
        return members;
    }

    public UserAccount members(Set<Cooperative> cooperatives) {
        this.members = cooperatives;
        return this;
    }

    public UserAccount addMembers(Cooperative cooperative) {
        this.members.add(cooperative);
        cooperative.getCooperatives().add(this);
        return this;
    }

    public UserAccount removeMembers(Cooperative cooperative) {
        this.members.remove(cooperative);
        cooperative.getCooperatives().remove(this);
        return this;
    }

    public void setMembers(Set<Cooperative> cooperatives) {
        this.members = cooperatives;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserAccount)) {
            return false;
        }
        return id != null && id.equals(((UserAccount) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "UserAccount{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", surname='" + getSurname() + "'" +
            ", email='" + getEmail() + "'" +
            ", password='" + getPassword() + "'" +
            ", address='" + getAddress() + "'" +
            ", phone='" + getPhone() + "'" +
            "}";
    }
}
