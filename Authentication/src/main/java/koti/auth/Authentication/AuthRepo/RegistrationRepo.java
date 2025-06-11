package koti.auth.Authentication.AuthRepo;

import org.springframework.stereotype.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import koti.auth.Authentication.AuthEntitys.RegistrationEntity;

@Repository
public interface RegistrationRepo extends JpaRepository<RegistrationEntity, Long> {
    Optional<RegistrationEntity> findByUsername(String username);
}
