### Adventure Game (As yet untitled)

#### Key Features
- Login and account creation
- Ability to save progress
- Multiple classes (warrior, mage, rogue etc)
- Medieval setting
- Turn based attack/defense/item usage
- Usage of RNG for moves, enhanced by equipped items
- Inventory
- Spiderweb-style structure of progression, 4 different options per encounter
- Upon death, game over
#### Nice-to-haves
- Achievements
- Stats
- Level-up system
- Sprites?

#### Technologies
- React
- Node
- Material.ui

#### Psuedocode
**Models**
    *User*
    - Username
    - Email
    - Password (salted)
    - Relational - 1 to many

<!-- This data gets updated via a post when user saves the game. Name, Race and Class don't change -->
    *Character*
    - Name
    - Race
    - Class
    - Health
    - Strength + 3 
    - Defence + 5
    - Wisdom
    - Luck
    - Weapon
    - Head
    - Chest
    - Hands
    - Feet
    - Amulet
    - Gold

**Text + Choices**
Store all inside a json object. Separate by names - eg. Cave decision - cave.inspect/cave.north/cave.cry/cave.nothing

for example:

script {
    cave {
        inspect: "",
        north: "",
        cry: "",
        nothing: ""
    },
    goblinAttack {
        fight: "",
        bargain: "",
        hide: "",
        flee: ""
    }
}

**Fight Sequences**
All enemies have set health/defence/wisdom/luck.
Script creates a dice roll for both user and enemy attacks/defence
User has options:
    - **Normal attack**
        weapon damage x dice + (str x 2) / defence

        Always hits
        
    - **Special attack** 
        (2x weapon damage x dice) + (str x 4) / defence
    
        .then()
        
        Roll 1 - 6 and add user luck value. If enemy luck roll is less, attack hits.


    - **Use potion** (disabled if none in inventory)
    - **Skill**

**Skills**
Warrior: {
    Stalwart defense: Impervious to enemy damage for 1 round
}

Rogue: {
    Rapid attack: Doubles special attack damage (5 turn cooldown)
}

Paladin: {
    Heal: restores 30% health (5 turn cooldown)
}

**Classes**
Warrior: {
    health: 60,
    str: 5,
    def: 4,
    wisdom: 1,
    luck: 2
}

Rogue: {
    health: 40,
    str: 2,
    def: 2
    wisdom: 3,
    luck: 5
}

Paladin: {
    health: 50,
    str: 3,
    def: 3,
    wisdom: 4,
    luck: 2
}

**Weapons**
Rusty axe - 3 damage
Jeweled


**Enemies**
Skeleton: {
    health: 15,
    str: 1,
    def: 2,
    wisdom: 1,
    luck: 1
}

Colossal Worm: {
    health: 100,
    str: 8,
    def: 5,
    wisdom: 1,
    luck: 2
}
