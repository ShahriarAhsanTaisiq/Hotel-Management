package com.hotelbooking.lakesidehotel.security.jwt;

import com.hotelbooking.lakesidehotel.security.user.HotelUserDetails;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.List;

@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${auth.jwt.jwtsecret}")
    private String jwtSecret;
    @Value("${auth.jwt.expirationInMils}")
    private int jwtExpirationTime;


    public String generateJwtTokenForUser(Authentication authentication){
        HotelUserDetails userPrincipal = (HotelUserDetails) authentication.getPrincipal();
        List<String> roles = userPrincipal.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority).toList();
        return Jwts.builder().setSubject(userPrincipal.getUsername())
                .claim("roles", roles)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationTime))
                .signWith(key(), SignatureAlgorithm.HS256).compact();
    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

//    public String getUserNameFromToken(String token){
//        return Jwts.parserBuilder()
//                .setSigningKey(key())
//                .build()
//                .parseClaimsJwt(token)
//                .getBody()
//                .getSubject();
//    }


    public String getUserNameFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(token);
            logger.info("Token Claims: {}", claims.getBody());
            return true;
        } catch (Exception e) {
            logger.error("Token validation error: {}", e.getMessage(), e);
        }
        return false;
    }



}
