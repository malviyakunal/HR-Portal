package com.hr.server.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import org.springframework.security.core.Authentication;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // Securely generated 256-bit key for HS256 algorithm
    private final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // Generate JWT token for the user
    public String generateToken(Authentication authentication) {
        return Jwts.builder()
                .setSubject(authentication.getName())  // Get username (subject) from authentication object
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))  // Token validity for 1 hour
                .signWith(secretKey)  // Sign with the secure key
                .compact();
    }

    // Validate JWT token
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()  // Updated method to parse the JWT
                .setSigningKey(secretKey)  // Use the secure signing key
                .build()
                .parseClaimsJws(token);  // Parse the token
            return true;  // Valid token
        } catch (Exception e) {
            return false;  // Invalid token
        }
    }

    // Get username from the JWT token
    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(secretKey)  // Use the secure signing key
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();  // Get the subject (username)
    }
}
