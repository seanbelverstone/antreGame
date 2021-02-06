module.exports = (sequelize, DataTypes) => {
    const Character = sequelize.define("Character", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        race: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        class: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        health: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        strength: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        defense: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        wisdom: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        luck: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        weapon: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "No weapon"
        },
        head: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "None"
        },
        chest: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Ragged shirt"
        },
        legs: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Ragged pants"
        },
        hands: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "None"
        },
        feet: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Old boots"
        },
        amulet: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "None"
        },
        healthPotions: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        gold: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        level: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "start"
        },
        time: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });

    Character.associate = function(models) {
        // Characters belong to users. The foreign key ensures one cant be created without a userId
        Character.belongsTo(models.User, {
          foreignKey: {
            
            allowNull: false
          }
        });
      };

    return Character;
}

