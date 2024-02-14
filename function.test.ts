import { create_army, create_castle, get_castle, type Player } from "./functions";



test("get_Casstle", () => {
    const player : Player = ["Felix", [create_castle(create_army(),"Felix",1)]];

    get_castle(player)
})
get_castle
