package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A Role.
 */
@Entity
@Table(name = "role")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Role implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("roles")
    private UserAccount userroles;

    @ManyToMany(mappedBy = "notifications")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Notification> roles = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserAccount getUserroles() {
        return userroles;
    }

    public Role userroles(UserAccount userAccount) {
        this.userroles = userAccount;
        return this;
    }

    public void setUserroles(UserAccount userAccount) {
        this.userroles = userAccount;
    }

    public Set<Notification> getRoles() {
        return roles;
    }

    public Role roles(Set<Notification> notifications) {
        this.roles = notifications;
        return this;
    }

    public Role addRole(Notification notification) {
        this.roles.add(notification);
        notification.getNotifications().add(this);
        return this;
    }

    public Role removeRole(Notification notification) {
        this.roles.remove(notification);
        notification.getNotifications().remove(this);
        return this;
    }

    public void setRoles(Set<Notification> notifications) {
        this.roles = notifications;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Role)) {
            return false;
        }
        return id != null && id.equals(((Role) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Role{" +
            "id=" + getId() +
            "}";
    }
}
