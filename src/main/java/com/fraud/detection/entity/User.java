package com.fraud.detection.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role; // ADMIN or ANALYST

    @Column(name = "normal_location")
    private String normalLocation;

    @Column(name = "primary_device_id")
    private String primaryDeviceId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public User() {
        this.createdAt = LocalDateTime.now();
    }

    public User(String username, String password, String role, String normalLocation, String primaryDeviceId) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.normalLocation = normalLocation;
        this.primaryDeviceId = primaryDeviceId;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getNormalLocation() {
        return normalLocation;
    }

    public void setNormalLocation(String normalLocation) {
        this.normalLocation = normalLocation;
    }

    public String getPrimaryDeviceId() {
        return primaryDeviceId;
    }

    public void setPrimaryDeviceId(String primaryDeviceId) {
        this.primaryDeviceId = primaryDeviceId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
