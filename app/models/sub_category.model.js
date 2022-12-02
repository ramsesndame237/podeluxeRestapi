module.exports = (sequelize, Sequelize) => {
    const SubCategory = sequelize.define("subcategorys", {
        idSubCategory: { 
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

    return SubCategory;
};
