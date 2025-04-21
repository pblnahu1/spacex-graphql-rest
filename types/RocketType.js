// rocket type

import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql"

export const RocketType = new GraphQLObjectType({
    name: "Rocket",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        type: {type: GraphQLString}
    })
})

export default RocketType;