package com.hotelbooking.lakesidehotel.controller;


import com.hotelbooking.lakesidehotel.exception.UserAlreadyExistException;
import com.hotelbooking.lakesidehotel.model.User;
import com.hotelbooking.lakesidehotel.request.LoginRequest;
import com.hotelbooking.lakesidehotel.response.JwtResponse;
import com.hotelbooking.lakesidehotel.security.jwt.JwtUtils;
import com.hotelbooking.lakesidehotel.security.user.HotelUserDetails;
import com.hotelbooking.lakesidehotel.security.user.HotelUserDetailsService;
import com.hotelbooking.lakesidehotel.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
     private final UserService userService;
     private final AuthenticationManager authenticationManager;
     private final JwtUtils jwtUtils;

    @PostMapping("/register-user")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            userService.registerUser(user);
            return ResponseEntity.ok("Registration Successful.");
        } catch (UserAlreadyExistException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }


    @PostMapping("/login")
     public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest request){
         Authentication authentication = authenticationManager
                 .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

         SecurityContextHolder.getContext().setAuthentication(authentication);
         String jwt = jwtUtils.generateJwtTokenForUser(authentication);
         HotelUserDetails userDetails = (HotelUserDetails) authentication.getPrincipal();
         List<String> roles = userDetails.getAuthorities()
                 .stream()
                 .map(GrantedAuthority::getAuthority).toList();
         return ResponseEntity.ok(new JwtResponse(
                 userDetails.getId(),
                 userDetails.getEmail(),
                 jwt,
                 roles));

     }
}
