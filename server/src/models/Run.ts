import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db/config';
import Robot from './Robot';

interface InterpreterSettings {
  maxConcurrency: number;
  maxRepeats: number;
  debug: boolean;
}

interface RunAttributes {
  id: string;
  status: string;
  name: string;
  robotId: string;
  startedAt: string;
  finishedAt: string;
  browserId: string;
  interpreterSettings: InterpreterSettings;
  log: string;
  runId: string;
  serializableOutput: Record<string, any[]>;
  binaryOutput: Record<string, any>;
}

interface RunCreationAttributes extends Optional<RunAttributes, 'id'> { }

class Run extends Model<RunAttributes, RunCreationAttributes> implements RunAttributes {
  public id!: string;
  public status!: string;
  public name!: string;
  public robotId!: string;
  public startedAt!: string;
  public finishedAt!: string;
  public browserId!: string;
  public interpreterSettings!: InterpreterSettings;
  public log!: string;
  public runId!: string;
  public serializableOutput!: Record<string, any[]>;
  public binaryOutput!: Record<string, any>;
}

Run.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    robotId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Robot,
        key: 'id',
      },
    },
    startedAt: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    finishedAt: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    browserId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    interpreterSettings: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    log: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    runId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    serializableOutput: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    binaryOutput: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'run',
    timestamps: false,
  }
);

Run.belongsTo(Robot, { foreignKey: 'robotId' });

export default Run;