# Nudge

Nudge allows you to track daily goals as well as your mood. Define your own goals, update how you're doing daily and over time, gain insights on your habits. Every day Nudge will nudge you to update your goals, rate your day and ask you what you've been up to and how you're feeling.

# Repository

This is a prototype of a backend API using express, mysql and graphQL.

# Context

After 4 years of frontend development and many years of RoB backend development, I created this project to learn/experiment with GraphQL and how to structure codebase in an node environment. 

Here is a non exhaustive list of things that I would like to improve:
- Move the resolves into a service layer to handle more complicated use-cases for CRUDing resources
- Improve factories for testing. At the moment I just drop tables at the end of each tests but ideally each tests should be wrapped into a transaction and automatically rollback every resources that have been created.
- There are a couple of Polymorphic associations but they are more or less manually made Polymorphic: Investigate and cleanups!
- Make the API production, remove any dev configurations, etc.
- More than just integrations unit tests.
- Document the database schema better.
