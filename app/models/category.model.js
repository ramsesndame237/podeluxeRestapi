module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("categorys", {
        idCategory: { 
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4()
        },
        name: {
            type: Sequelize.STRING
        },
        code: {
            type: Sequelize.STRING
        }
    });

    return Category;
};
