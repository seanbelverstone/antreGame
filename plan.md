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