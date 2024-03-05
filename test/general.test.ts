// Imports

import { MatrixGraph } from "../lib/graphs";

import {
    finds_paths, 
    check_if_cpu,
    remove_dead_warriors,
    train_warrior,
    is_choice_in_paths,
    get_first_warrior_name,
    merge_army,
    heal_warrior,
    get_order_castles,
    count_castles,
    get_position,
    includes,
    in_q,
    split_army } from "../Functions/general_functions";

import {
    get_random_int } from "../Functions/utility_functions";

import {
    type Army,
    type Castle,
    type Warrior,
    type Player } from "../types";

import {
    type Queue,
    empty,
    enqueue } from "../lib/queue_array";


// Tests

describe('getRandomInt', () => {

    let x : number = get_random_int(1, 5);

    it('the number is between 1 and 5: ', () => {
        expect(1 <= x && x <= 5).toEqual(true);

    });

});


describe('finds_paths', () => {
    
    const I = true;
    const O = false;
    const mormors_kudde: MatrixGraph = {
    size: 5,
    adj:[
        [O, I, I, I, O],  //0. from A 
        [I, O, I, O, I],  //1. from B
        [I, I, O, I, I],  //2. from C
        [I, O, I, O, I],  //3. from D
        [O, I, I, I, O],  //4. from E
    ]}
    const wrr1 : Warrior = {attack : 5, health : 5, name : 'Alfred', alive : true};
    const test_castle1 : Castle = {hp : [wrr1], owner : 'David', position : 3};
    const test_castle2 : Castle = {hp : [wrr1], owner : 'Felix', position : 2};

    it('Castle 3 can move to castle 1, 2, 4 and 5', () => {
        expect(finds_paths(test_castle1, mormors_kudde)).toEqual([1, 2, 4, 5]);

    });

    it('Castle 2 can move to castle 1, 3 and 5', () => {
        expect(finds_paths(test_castle2, mormors_kudde)).toEqual([1, 3, 5]);

    });
    
});


describe('check_if_cpu', () => {

    const wrr1 : Warrior = {attack : 5, health : 5, name : 'David', alive : true};
    const test_castle1 : Castle = {hp : [wrr1], owner : 'Alfred', position : 3};
    const test_player1 : Player = ['Alfred', [test_castle1, undefined]];
    const test_cpu1 : Player = ['CPU1', [undefined]];

    it('A player is not a cpu', () => {
        expect(check_if_cpu(test_player1)).toBe(false);
    });

    it('A player name returns false', () => {
        expect(check_if_cpu('Alfred')).toBe(false);
    });

    it('A cpu returns true', () => {
        expect(check_if_cpu(test_cpu1)).toBe(true);
    });

    it('A cpu name returns true', () => {
        expect(check_if_cpu('CPU1')).toBe(true);
    });

});


describe('remove_dead_warrior', () => {

    const wrr1 : Warrior = {attack : 5, health : 10, name : 'Alfred', alive : true};
    const wrr2 : Warrior = {attack : 3, health : 15, name : 'David', alive : true};
    const wrr3 : Warrior = {attack : 8, health : 16, name : 'Felix', alive : false};
    const ex_army1 : Army = [wrr1];
    const ex_army2 : Army = [wrr1, wrr2, wrr3];

    it('Returns the same army', () => {
        expect(remove_dead_warriors(ex_army1)).toEqual(ex_army1);
    });

    it('Removes the dead warrior', () => {
        expect(remove_dead_warriors(ex_army2)).toEqual([wrr1, wrr2]);
    });

});


describe('train_warrior', () => {
    
    const wrr1 : Warrior = {attack : 5, health : 10, name : 'Alfred', alive : true};
    const ex_army1 : Army = [wrr1];

    it('The warrior has gotten increased attack', () => {
        expect(train_warrior(ex_army1)[0].attack > 5).toBe(true);
    });

    it('The warrior has gotten increased health', () => {
        expect(train_warrior(ex_army1)[0].health > 10).toBe(true);
    });

});


describe('is_choice_in_paths', () => {
    
    const paths : Array<number> = [1, 2, 4];

    it('4 is in the paths array', () => {
        expect(is_choice_in_paths(paths, 4)).toBe(true);
    });

    it('5 is not in the paths array', () => {
        expect(is_choice_in_paths(paths, 5)).toBe(false);
    });

});


describe('get_first_warrior_name', () => {

    it('returns the first warrior name in the queue of names', () => {
        expect(get_first_warrior_name()).toBe('Eva Darulova');
    });

});


describe('merge_army', () => {
    
    const wrr1 : Warrior = {alive : true, attack : 5, health : 10, name : 'Alfred'};
    const wrr2 : Warrior = {alive : true, attack : 3, health : 15, name : 'David'};
    const wrr3 : Warrior = {alive : true, attack : 8, health : 16, name : 'Felix'};
    const wrr4 : Warrior = {alive : true, attack : 5, health : 10, name : 'Kalle'};
    const ex_army1 : Army = [wrr1];
    const ex_army2 : Army = [wrr2, wrr3, wrr4];
    const ex_army3 : Army = [];

    it('Merges two armies', () => {
        expect(merge_army(ex_army1, ex_army2)).toEqual([wrr1, wrr2, wrr3, wrr4]);
    });

    it('If one army is empty, the other army is returned', () => {
        expect(merge_army(ex_army1, ex_army3)).toEqual(ex_army1);
    });

});


describe('heal_warrior', () => {
    
    const wrr1 : Warrior = {attack : 5, health : 25, name : 'Felix', alive : true};

    it('heals a warrior', () => {
        expect(heal_warrior(wrr1)).toBe('Felix');
    });

});


describe('get_order_castles', () => {
    
    const wrr1 : Warrior = {attack : 5, health : 5, name : 'David', alive : true};
    const wrr2 : Warrior = {attack : 5, health : 10, name : 'Felix', alive : true};
    const test_castle1 : Castle = {hp : [wrr1], owner : 'Alfred', position : 3};
    const test_castle2 : Castle = {hp : [wrr1], owner : 'Felix', position : 3};
    const test_castle3 : Castle = {hp : [wrr1, wrr2], owner : 'Felix', position : 2};
    const test_player1 : Player = ['Alfred', [test_castle1]];
    const test_player2 : Player = ['Felix', [test_castle2, test_castle3 ]];
    const empty_queue : Queue<Castle> = empty();

    it('If you only have one castle it returns a queue with one element', () => {
        expect(get_order_castles(test_player1)[2][0]).toBe(test_castle1);
    });

    it('The first castle in castle queue', () => {
        expect(get_order_castles(test_player2)[2][0]).toBe(test_castle2);
    });

    it('The second castle in castle queue', () => {
        expect((get_order_castles(test_player2))[2][1]).toBe(test_castle3);
    });
    
});


describe('count_castles', () => {
    
    const wrr1 : Warrior = {attack : 5, health : 5, name : 'David', alive : true};
    const wrr2 : Warrior = {attack : 5, health : 10, name : 'Felix', alive : true};
    const test_castle1 : Castle = {hp : [wrr1], owner : 'Alfred', position : 3};
    const test_castle2 : Castle = {hp : [wrr2], owner : 'Felix', position : 3};
    const test_castle3 : Castle = {hp : [wrr1, wrr2], owner : 'Felix', position : 2};

    it('Counts a list of castles', () => {
        expect(count_castles([test_castle1, test_castle2])).toBe(2);
    });

    it('Removes undefined', () => {
        expect(count_castles([test_castle3, undefined])).toBe(1);
    });

});


describe('get_position', () => {
    
    const wrr1 : Warrior = {attack : 5, health : 5, name : 'David', alive : true};
    const wrr2 : Warrior = {attack : 5, health : 10, name : 'Felix', alive : true};
    const test_castle1 : Castle = {hp : [wrr1], owner : 'Alfred', position : 3};
    const test_castle2 : Castle = {hp : [wrr2], owner : 'Felix', position : 2};

    it('Returns position of castle', () => {
        expect(get_position([test_castle1, test_castle2], 3)).toBe(test_castle1);
    });

});


describe('includes', () => {
    
    const wrr1 : Warrior = {attack : 5, health : 5, name : 'David', alive : true};
    const wrr2 : Warrior = {attack : 5, health : 10, name : 'Felix', alive : true};
    const test_castle1 : Castle = {hp : [wrr1], owner : 'Felix', position : 3};
    const test_castle2 : Castle = {hp : [wrr1, wrr2], owner : 'Felix', position : 2};
    const test_player1 : Player = ['Felix', [test_castle1, test_castle2 ]];

    it('', () => {
        expect(includes(test_player1[1], 3, test_player1)).toBe(true);
    });

});


describe('in_q', () => {
    
    const wrr1 : Warrior = {attack : 5, health : 5, name : 'David', alive : true};
    const wrr2 : Warrior = {attack : 5, health : 10, name : 'Felix', alive : true};
    const test_castle1 : Castle = {hp : [wrr1], owner : 'Felix', position : 3};
    const test_castle2 : Castle = {hp : [wrr1, wrr2], owner : 'Felix', position : 2};
    const test_castle3 : Castle = {hp : [wrr2], owner : 'Alfred', position : 4};
    let cstl_q : Queue<Castle> = empty();
    enqueue(test_castle1, cstl_q);
    enqueue(test_castle2, cstl_q);

    it('The castle is in the queue', () => {
        expect(in_q(cstl_q, test_castle1)).toBe(true);
    });

    it('The castle is not in the queue', () => {
        expect(in_q(cstl_q, test_castle3)).toBe(false);
    });

});


describe('split_army', () => {
    
    const wrr1 : Warrior = {attack : 5, health : 5, name : 'David', alive : true};
    const wrr2 : Warrior = {attack : 5, health : 10, name : 'Felix', alive : true};
    const wrr3 : Warrior = {attack : 2, health : 39, name : 'Alfred', alive : true};
    const test_castle1 : Castle = {hp : [wrr1, wrr2, wrr3], owner : 'Felix', position : 3};

    it('Splits an army', () => {
        expect(split_army(test_castle1)).toEqual([[wrr1, wrr2], [wrr3]]);
    });

});