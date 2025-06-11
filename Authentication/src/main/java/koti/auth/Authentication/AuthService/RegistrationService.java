package koti.auth.Authentication.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import koti.auth.Authentication.AuthEntitys.RegistrationEntity;
import koti.auth.Authentication.AuthRepo.RegistrationRepo;

@Service
public class RegistrationService implements UserDetailsService  {
    
    @Autowired
    RegistrationRepo registrationRepo;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return registrationRepo.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }

    public UserDetails save(RegistrationEntity RegistrationEntity){
        return registrationRepo.save(RegistrationEntity);
    }

    public RegistrationEntity findByUsername(String username) {
        return registrationRepo.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }
}
