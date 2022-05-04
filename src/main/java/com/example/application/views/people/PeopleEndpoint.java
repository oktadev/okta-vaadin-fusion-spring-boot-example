package com.example.application.views.people;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.security.PermitAll;

import dev.hilla.Endpoint;

@Endpoint
public class PeopleEndpoint {

    // We'll use a simple list to hold data
    private final List<Person> people = new ArrayList<>();

    public PeopleEndpoint() {
        // Add one person so we can see that everything works
        people.add(new Person("Jane", "Doe"));
    }

    @PermitAll
    public List<Person> getPeople() {
        return people;
    }

    @PermitAll
    public Person addPerson(Person person) {
        people.add(person);
        return person;
    }
}
