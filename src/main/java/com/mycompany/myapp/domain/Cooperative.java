package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
 * The Cooperative entity.
 */
@ApiModel(description = "The Cooperative entity.")
@Entity
@Table(name = "cooperative")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Cooperative implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "area", nullable = false)
    private String area;

    @ManyToOne
    @JsonIgnoreProperties("cooperatives")
    private UserAccount dg;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "cooperative_admined_coops",
               joinColumns = @JoinColumn(name = "cooperative_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "admined_coops_id", referencedColumnName = "id"))
    private Set<UserAccount> adminedCoops = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "cooperative_cooperatives",
               joinColumns = @JoinColumn(name = "cooperative_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "cooperatives_id", referencedColumnName = "id"))
    private Set<UserAccount> cooperatives = new HashSet<>();

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

    public Cooperative name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getArea() {
        return area;
    }

    public Cooperative area(String area) {
        this.area = area;
        return this;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public UserAccount getDg() {
        return dg;
    }

    public Cooperative dg(UserAccount userAccount) {
        this.dg = userAccount;
        return this;
    }

    public void setDg(UserAccount userAccount) {
        this.dg = userAccount;
    }

    public Set<UserAccount> getAdminedCoops() {
        return adminedCoops;
    }

    public Cooperative adminedCoops(Set<UserAccount> userAccounts) {
        this.adminedCoops = userAccounts;
        return this;
    }

    public Cooperative addAdminedCoops(UserAccount userAccount) {
        this.adminedCoops.add(userAccount);
        userAccount.getAdminsys().add(this);
        return this;
    }

    public Cooperative removeAdminedCoops(UserAccount userAccount) {
        this.adminedCoops.remove(userAccount);
        userAccount.getAdminsys().remove(this);
        return this;
    }

    public void setAdminedCoops(Set<UserAccount> userAccounts) {
        this.adminedCoops = userAccounts;
    }

    public Set<UserAccount> getCooperatives() {
        return cooperatives;
    }

    public Cooperative cooperatives(Set<UserAccount> userAccounts) {
        this.cooperatives = userAccounts;
        return this;
    }

    public Cooperative addCooperatives(UserAccount userAccount) {
        this.cooperatives.add(userAccount);
        userAccount.getMembers().add(this);
        return this;
    }

    public Cooperative removeCooperatives(UserAccount userAccount) {
        this.cooperatives.remove(userAccount);
        userAccount.getMembers().remove(this);
        return this;
    }

    public void setCooperatives(Set<UserAccount> userAccounts) {
        this.cooperatives = userAccounts;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cooperative)) {
            return false;
        }
        return id != null && id.equals(((Cooperative) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Cooperative{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", area='" + getArea() + "'" +
            "}";
    }
}
