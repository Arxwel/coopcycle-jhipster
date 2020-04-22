package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * A Notification.
 */
@Entity
@Table(name = "notification")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Notification implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "date")
    private ZonedDateTime date;

    @ManyToOne
    @JsonIgnoreProperties("notifications")
    private Basket notification;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "notification_notifications",
               joinColumns = @JoinColumn(name = "notification_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "notifications_id", referencedColumnName = "id"))
    private Set<Role> notifications = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public Notification date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public Basket getNotification() {
        return notification;
    }

    public Notification notification(Basket basket) {
        this.notification = basket;
        return this;
    }

    public void setNotification(Basket basket) {
        this.notification = basket;
    }

    public Set<Role> getNotifications() {
        return notifications;
    }

    public Notification notifications(Set<Role> roles) {
        this.notifications = roles;
        return this;
    }

    public Notification addNotifications(Role role) {
        this.notifications.add(role);
        role.getRoles().add(this);
        return this;
    }

    public Notification removeNotifications(Role role) {
        this.notifications.remove(role);
        role.getRoles().remove(this);
        return this;
    }

    public void setNotifications(Set<Role> roles) {
        this.notifications = roles;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Notification)) {
            return false;
        }
        return id != null && id.equals(((Notification) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Notification{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
