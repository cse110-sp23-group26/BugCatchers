# Use json as the data format for storing data in our final project

## Context and Problem Statement

1. What data do we all need to store locally?

2. How big is the data we store expected to be?

3. What is the complexity of the data we store?

4. What data format should we use to store our data?

5. Can we master and use the data formats we use?

## Considered Options

- Local storage
- JSON
- CSV
- XML

## Decision Outcome

Chosen option: 
- Local storage
  - This is very straightforward and we belive we are able to complete our project with this data storage approach within the 4-week period. 
- JSON 
  - We mainly store two types of data locally: (1) user account and password data, and (2) user interaction data. The formats of these two types of data are very simple. Considering the size of our final project and the conditions of full localization, we will likely only need to serve a small number of users, so the data scale is not large. Finally, we have been exposed to json in class, so most of the team members will be familiar with json. To sum up, we choose json to store data in our final project.
- CSV
  - ALternative option.
- XML
  - ALternative option.
