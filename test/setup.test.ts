import {type Army,
    type Castle,
    type Warrior,
    type Player} from '../types';

import { MatrixGraph } from '../lib/graphs';

import { create_castle,
    create_warrior,
    create_army,
    get_castle_array} from "../Functions/setup_functions";

import { get_random_int } from '../Functions/utility_functions';


describe('create_castle', () => {
    
    const wrr1 : Warrior = {attack : 5, health : 10, name : 'Alfred', alive : true};
    const wrr2 : Warrior = {attack : 3, health : 15, name : 'David', alive : true};
    const ex_army1 : Army = [wrr1, wrr2];

    it('Creates a castle', () => {
        expect(create_castle(ex_army1, 'Alfred', 2)).toEqual({hp : ex_army1, owner : 'Alfred', position : 2});
    });

});

describe('create_warrior', () => {
    
    it('Creates the warrior Bosse Brunklimp with 5 attack and 50 health', () => {
        expect(create_warrior(5, 50)).toEqual({attack : 5, health : 50, name : 'Bosse Brunklimp', alive : true});
    });

    const test_warrior1 : Warrior = create_warrior(get_random_int(1,5), get_random_int(50, 100));

    it('Warrior has the correct amount of attack', () => {
        expect(1 <= test_warrior1.attack && test_warrior1.attack <= 5).toBe(true);
    });

    it('Warrior has the correct amount of health', () => {
        expect(50 <= test_warrior1.health && test_warrior1.health <= 100).toBe(true);
    });

});

describe('create_army', () => {
    
    it('Creates an army with three soldiers', () => {
        expect(create_army().length).toBe(3);
    });

    it('A soldier has an attack stat between 3 and 5', () => {
        expect(3 <= create_army()[0].attack && create_army()[0].attack <= 5).toBe(true);
    });

    it('A soldier has 70 hp', () => {
        expect(create_army()[0].health).toBe(70);
    });

});


/*
describe('', () => {
    
    it('', () => {
        expect().toBe();
    });

    it('', () => {
        expect().toBe();
    });

});
*/