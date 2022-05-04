package com.example.application;

import com.okta.spring.boot.oauth.Okta;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Override
    public void configure(WebSecurity web) throws Exception {
        // @formatter:off
        web.ignoring()
            .antMatchers(HttpMethod.OPTIONS, "/**")
            .antMatchers("/**/*.{js,html,css,webmanifest}");
        // @formatter:on
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // @formatter:off
        // Vaadin handles CSRF for its endpoints

        http
            .csrf().ignoringAntMatchers("/connect/**")
            .and()
            .cors().disable()
            .authorizeRequests()
            // allow access to everything, Vaadin will handle security
            .antMatchers("/**").permitAll()
            .and()
            .oauth2ResourceServer().jwt();
        // @formatter:on

        Okta.configureResourceServer401ResponseBody(http);
    }
}

