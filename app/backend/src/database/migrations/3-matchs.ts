import { DataTypes, QueryInterface, Model } from "sequelize"
import Matche from "../../Interfaces/Matche"

export default {
	async up(queryInterface: QueryInterface) {
		await queryInterface.createTable<Model<Matche>>('matches', {
			id: {
				primaryKey: true,
				type: DataTypes.INTEGER,
				autoIncrement: true,
				allowNull: false,
			},
			homeTeamId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'teams',
					key: 'id'
				},
				field: 'home_team_id'
			},
			homeTeamGoals: {
				type: DataTypes.INTEGER,
				allowNull: false,
				field: 'home_team_goals'
			},
			awayTeamId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'teams',
					key: 'id'
				},
				field: 'away_team_id'
			},
			awayTeamGoals: {
				type: DataTypes.INTEGER,
				allowNull: false,
				field: 'away_team_goals'
			},
			inProgress: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				field: 'in_progress'
			}
		})
	},
	async down(queryInterface: QueryInterface) {
		await queryInterface.dropTable('matches')
	}
}