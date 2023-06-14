import { DataTypes, QueryInterface, Model } from "sequelize"
import User from "../../Interfaces/User"

export default {
	async up(queryInterface: QueryInterface) {
		await queryInterface.createTable<Model<User>>('users', {
			id: {
				primaryKey: true,
				type: DataTypes.INTEGER,
				autoIncrement: true,
				allowNull: false,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			role: {
				type: DataTypes.STRING,
				allowNull: false,
			}
		})
	},
	async down(queryInterface: QueryInterface) {
		await queryInterface.dropTable('users')
	}
}