module.exports = (sequelize, DataTypes) => {
    const Character = sequelize.define("Character", {
        name: DataTypes.STRING,
        race: DataTypes.STRING,
        class: DataTypes.STRING,
        health: DataTypes.INTEGER,
        strength: DataTypes.INTEGER,
        defence: DataTypes.INTEGER,
        wisdom: DataTypes.INTEGER,
        luck: DataTypes.INTEGER,
        weapon: DataTypes.STRING,
        head: DataTypes.STRING,
        chest: DataTypes.STRING,
        hands: DataTypes.STRING,
        feet: DataTypes.STRING,
        amulet: DataTypes.STRING,
        healthPotions: DataTypes.INTEGER,
        gold: DataTypes.INTEGER
    }, {});

    Character.sync();
    return Character;
}

