module.exports = (sequelize, Sequelize) => {
    const users = sequelize.define('users', {
        id: {
            type: Sequelize.INTEGERE,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });
    return users;
}