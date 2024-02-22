import {type Army, type Castle, type Warrior, type Player} from '../types';
import { MatrixGraph } from '../lib/graphs';
import { create_castle, create_warrior, create_army, get_castle_array} from "../Functions/setup_functions";
import { get_name } from '../Functions/general_functions';

    // function create_warrior(): Warrior {
    //let name = get_name();
    
    // const warrior = { attack: 5, health: 100, name: name };
    // return warrior;


test('create_warrior', () => {
    let n_head = get_name()
    const warrior: Warrior = create_warrior(5, 100);
    expect(warrior).toEqual({attack: 5,
        health: 100,
        name: n_head, alive: true});

});
