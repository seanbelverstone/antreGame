# Antre
---

## Key Features
- Login and account creation
- Ability to save progress
- Multiple classes (warrior, mage, rogue etc)
- Medieval setting
- Turn based attack/defense/item usage
- Usage of RNG for moves, enhanced by equipped items
- Inventory
- Spiderweb-style structure of progression, 4 different options per encounter
- Upon death, game over

## Nice-to-haves
- Achievements
- Stats
- Level-up system
- Sprites?

# Psuedocode

## **Models**
### User
- Username
- Email
- Password (salted)
- Relational - 1 to many


### Character
- Name
- Race
- Class

The data below gets updated via a post when user saves the game. Name, Race and Class don't change

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

## **Text + Choices**

Store all inside a json object. Separate by names - eg. Cave decision - cave.inspect/cave.north/cave.cry/cave.nothing

for example:

- script:
    - cave: 
        - inspect: "text goes here",
        - north: "",
        - cry: "",
        - nothing: ""
    - goblinAttack:
        - fight: "",
        - bargain: "",
        - hide: "",
        - flee: ""

## **Fight Sequences**

All enemies have set health/defence/wisdom/luck.

Script creates a dice roll for both user and enemy attacks/defence

User has options:
- ### Normal attack
    - (weapon damage x dice) + (str x 2) / defence
    - Always hits
        
- ### Special attack
    - (2x weapon damage x dice) + (str x 4) / defence     
    - Then, roll 1 - 6 and add user luck value. If enemy luck roll is less, attack hits.


- ### Use potion
    - (disabled if none in inventory)
- ### Skill
    - Warrior:
        - Stalwart defense: Impervious to enemy damage for 1 round
    - Rogue:
        - Rapid attack: Doubles special attack damage
    - Paladin:
        - Holy Remedy: restores 30% health

All skills have cooldowns, based on the character's wisdom count.

### Wisdom level cooldown ratio:
1. *five turns*
2. *five turns*
3. *four turns*
4. *four turns*
5. *three turns*
6. *three turns*
7. *two turns*
8. *two turns*
9. *one turn*
10. *one turns*
11. *no cooldown*

## **Classes**
Warrior:
- Health: 60,
- Strength: 5,
- Defense: 4,
- Wisdom: 1,
- Luck: 2

Rogue:
- Health: 40,
- Strength: 2,
- Defense: 2
- Wisdom: 3,
- Luck: 5


Paladin:
- Health: 50,
- Strength: 3,
- Defense: 3,
- Wisdom: 4,
- Luck: 2

## **Inventory**

### Weapons
- No weapon - 2 damage
- Rusty axe - 3 damage
- Steel dagger - 4 damage
- Wizard's staff - 5 damage
- Steel shortsword - 7 damage
- Black iron sword - 11 damage
- Warhammer - 14 damage

### Armor
- Chainmail: +4 defense
- Leather helmet: +2 defense
- Plate boots: +5 defense + 1 strength
- Enchanted iron greaves: +4 defense + 2 luck + 2 wisdom

### Amulet
- Dragon relic - 2 strength
- Manticore tooth - 3 luck


## **Enemies**
Skeleton
- Health: 15,
- Strength: 1,
- Defense: 2,
- Wisdom: 1,
- Luck: 1

Colossal Worm:
- Health: 100,
- Strength: 8,
- Defense: 5,
- Wisdom: 1,
- luck: 2

