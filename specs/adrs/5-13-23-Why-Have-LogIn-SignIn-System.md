# Include Log in and Sign in system (user account control system) in our project

## Context and Problem Statement

1. We make a completely local web page, why do we need to include a user account system?

## Considered Options

- Include user account system and grant the authority for user to remove their account afterwards.
- Not include user account system.

## Decision Outcome

Chosen option: 
- Include user account system 
    We assume that our web page will run on a public computer, and that many users can reach this web page and interact with their own accounts when they are physically present in front of the device. This design would be very straightforward and doable in a 4-week period.
- Not inlcude
    The theme of our project is a social software, if there is only one user and it is completely local, the theme of "social" cannot be realized. We need to leverage some social aspect other than inter-communication among users.
