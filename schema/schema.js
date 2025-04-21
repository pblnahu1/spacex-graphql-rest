// schema combinando tipos

import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLID,
} from "graphql";
import {LaunchType} from "../types/launchType.js";
import { getLaunches, getLaunchById } from "../services/spacex.js";

// root query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            resolve: getLaunches,
        },
        launch: {
            type: LaunchType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve: getLaunchById,
        },
    },
});

export default new GraphQLSchema({
    query: RootQuery,
});