import { Model, QueryInterface, DataTypes } from 'sequelize'
import Teams from '../../Interfaces/Teams'

export default {
	async up(queryInterface: QueryInterface) {
		await queryInterface.createTable<Model<Teams>>('teams', {
			id: {
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
				type: DataTypes.INTEGER
			},
			teamName: {
				field: 'team_name',
				allowNull: false,
				type: DataTypes.STRING
			}
		}) 
	},
	async down(queryInterface: QueryInterface) {
		await queryInterface.dropTable('temas')
	}
}