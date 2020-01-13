# Nudge

Nudge allows you to track daily goals as well as your mood. Define your own goals, update how you're doing daily and over time, gain insights on your habits. Every day Nudge will nudge you to update your goals, rate your day and ask you what you've been up to and how you're feeling.

# Repository

This is a prototype of a backend API using express, mysql and graphQL.

# Context

This is a work in progress app to explore building an API within the node ecosystem and how it compares to my profesionnal experience building RoR APIs.

Here are few things that needs to be improve:
- Move the resolvers into a service layer to handle more complicated use-cases for CRUDing resources.
- Improve factories for testing. Currently dropping tables after each test file. Room for improvement and wrap each tests into a transaction to programmatically rollback resources that have been created.
- Fix Polymorphic associations, too manual for now, either fix through sequelize or abstract the complexity somewhere else.
- More tests.
- Documentation on the schema.
- Fix GraphQL performance issue with n+1 queries
