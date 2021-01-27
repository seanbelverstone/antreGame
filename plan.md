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
- Upon death, revert to start

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
    - Strength
    - Defence
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
    - *Normal attack*: roll is multipled by attacker's strength and is divided by enemy defence (eg, (4dmg x 4str) / 2 defence = 8dmg). Always hits
    - *Special attack*: same as normal attack, however strength is tripled, but a luck roll is incorporated. Roll 1 - 6 and add user luck value. If enemy luck roll is less, attack hits.
    - *Use potion* (disabled if none in inventory)
    - *Skill*

**Skills**
Warrior: {
    Stalwart defense: Impervious to enemy damage for 1 round
}

Rogue: {
    Rapid attack: Doubles special attack damage (5 turn cooldown)
}

Mage: {
    Heal: restores 30% health (5 turn cooldown)
}
