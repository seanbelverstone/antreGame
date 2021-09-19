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
- Defense + 5
- Wisdom
- Luck
- Weapon
- Head
- Chest
- Legs
- Hands
- Feet
- Amulet
- Health Potions
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

User can drink a health potion either in battle (using up a turn), or after any text section. They can also
check their inventory, stats and other things during the game via a popout side menu

## **Fight Sequences**

All enemies have set health/defense/wisdom/luck.

Script creates a dice roll for both user and enemy attacks/defense

User has options:
- ### Normal attack
    - (weapon damage x dice) + (str x 2) / defense
    - Always hits
        
- ### Special attack
    - (3x weapon damage x dice) + (str x 3) / defense     
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
- Health: 80,
- Strength: 5,
- Defense: 4,
- Wisdom: 1,
- Luck: 2

Rogue:
- Health: 60,
- Strength: 3,
- Defense: 2
- Wisdom: 2,
- Luck: 5


Paladin:
- Health: 70,
- Strength: 3,
- Defense: 3,
- Wisdom: 4,
- Luck: 2

## **Inventory**

### Health Potions
Health potions heal (roll * roll + 15) health.

### Weapons
- No weapon - 1 damage
- Rusty shortsword - 3 damage
- Dagger - 3 damage
- Steel dagger - 4 damage
- Halberd - 6 damage
- Steel shortsword - 7 damage
- Obsidian Axes - 11 damage
- Black iron longsword - 12 damage
- Warhammer - 14 damage

### Armor
- Chainmail: +3 defense
- Leather helmet: +1 defense
- Plate boots: +4 defense + 1 strength
- Enchanted iron greaves: +4 defense + 2 luck + 2 wisdom

### Amulet
- Dragon relic - 2 strength
- Manticore tooth - 3 luck


## **Enemies**
Goblin
- Health: 40,
- Strength: 2,
- Defense: 2,
- Wisdom: 1,
- Luck: 1
- Weapon: Axe (3 damage)

Skeleton
- Health: 40,
- Strength: 1,
- Defense: 2,
- Wisdom: 1,
- Luck: 1
- Weapon: Dagger (4 damage)

Giant Rat
- Health: 60,
- Strength: 4,
- Defense: 2,
- Wisdom: 1,
- Luck: 3
- Weapon: Teeth (6 damage)

Dragon (young)
- Health: 70,
- Strength: 3,
- Defense: 3,
- Wisdom: 4,
- Luck: 2
- Weapon: Claws (8 damage)

Memory Knight
- Health: 50,
- Strength: 3,
- Defense: 3,
- Wisdom: 3,
- Luck: 2
- Weapon: Longsword (7 damage)

Memory Pikeman
- Health: 50,
- Strength: 2,
- Defense: 2,
- Wisdom: 2,
- Luck: 3
- Weapon: Pike (7 damage)

Blind Lizard
- Health: 90,
- Strength: 4,
- Defense: 1,
- Wisdom: 1,
- Luck: 2
- Weapon: Teeth (8 damage)

Skeletal Knight
- Health: 140,
- Strength: 6,
- Defense: 5,
- Wisdom: 2,
- Luck: 3
- Weapon: War Spear (10 damage)

Runed Manticore
- Health: 120,
- Strength: 6,
- Defense: 4,
- Wisdom: 5,
- Luck: 4
- Weapon: Rune Strike (11 damage)

Necro Beastmaster
- Health: 160 (if NBM has rez'd Manticore, reduce health to 110),
- Strength: 5,
- Defense: 3,
- Wisdom: 6,
- Luck: 3
- Weapon: Bladed Whip (12 damage)

Colossal Worm:
- Health: 180,
- Strength: 8,
- Defense: 5,
- Wisdom: 1,
- Luck: 2
- Weapon: Teeth (14 damage)

