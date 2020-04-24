const {
    gql
} = require('apollo-server')

const typeDefs = gql `
    type Launch {
        id: ID!
        site: String
        mission: Mission
        rocket: Rocket
        isBooked: Boolean!
    }

    type Rocket {
        id: ID!
        name: String
        type: String
    }

    type Mission {
        name: String
        # missionPatch(size: PatchSize): String
        missionPatch(mission: String, size: PatchSize): String
    }

    enum PatchSize {
        SMALL
        LARGE
    }

    type User {
        id: ID!
        email: String!
        trips: [Launch]!
    }

    type TripUpdateResponse {
        success: Boolean!
        message: String
        launches: [Launch]
    }

    type LaunchConnection {
        cursor: String!
        haseMore: Boolean!
        launches: [Launch]!
    }

    type Query {
        #launches: [Launch]!
        launches(pageSize: Int after: String): LaunchConnection! # pagenation purpose, we need to add cursor
        """ The number of results to show.Must be >= 1. Default = 20
            If you add a cursor here, it will only return results _after_ this cursor """

        launch(id: ID!): Launch
        me: User
    }

    type Mutation {
        bookTrips(launchIds: [ID]!): TripUpdateResponse!
        cancelTrip(launchID: ID!): TripUpdateResponse!
        login(email: String): String ### login token #
    }
`;

module.exports = typeDefs;