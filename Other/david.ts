export function attack(Attacking_army: Army, castle: Castle): Boolean {
    let bool = false;
    let defense_army = castle.hp;
    const Attack = enqueue_army(Attacking_army);
    const Defense = enqueue_army(defense_army);
    while(bool !== true){

    }if(Attack[2].length === 0){      // If length of warrior queue is 0:
        return true; // temp return
    }else if(Defense[2].length === 0){
    //    return false; // temp return
    //}
}