
// launch type
import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLBoolean } from "graphql";
import {RocketType} from "./rocketType.js";
import { getRocket } from "../services/spacex.js";

export const LaunchType = new GraphQLObjectType({
    name: "Launch",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        date_utc: {type: GraphQLString},
        success: {type: GraphQLBoolean},
        flight_number: {type: GraphQLInt},
        rocket: {
            type: RocketType,
            resolve: getRocket
        },
        launchpad: {type: GraphQLString},
    }),
});

export default LaunchType;