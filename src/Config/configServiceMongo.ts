
// tslint:disable-next-line:no-var-requires
require('dotenv').config();

class ConfigServiceMongo {

  constructor(private env: { [k: string]: string | undefined }) { }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode !== 'DEV';
  }

  public getMongoConfig(): string {

    const host = this.getValue('DB_HOST');
    const port = this.getValue('DB_PORT');
    const username = this.getValue('DB_USERNAME');
    const password = this.getValue('DB_PASSWORD');
    const database = this.getValue('DB_NAME');
    console.log(`mongodb://${username}:${password}@${host}:${port}/${database}`);
    return `mongodb://${username}:${password}@${host}:${port}/${database}`;

    // return {
    //   type: 'mongodb',

    //   host: this.getValue('DB_HOST'),
    //   // tslint:disable-next-line:radix
    //   port: parseInt(this.getValue('DB_PORT')),
    //   username: this.getValue('DB_USERNAME'),
    //   password: this.getValue('DB_PASSWORD'),
    //   database: this.getValue('DB_DATABASE_NAME'),

    //   entities: ['dist/**/entities/**{.ts,.js}'],

    //   synchronize: true,

    //   logging: !this.isProduction(),

    //   migrationsTableName: 'migration',

    //   migrations: ['src/migration/*.ts'],

    //   cli: {
    //     migrationsDir: 'src/migration',
    //   },

    //   useUnifiedTopology: true,
    //   useNewUrlParser: true,

    //   ssl: this.isProduction(),
    // };
  }

}

const configServiceMongo = new ConfigServiceMongo(process.env)
  .ensureValues([
    'DB_HOST',
    'DB_PORT',
    'DB_USERNAME',
    'DB_PASSWORD',
    'DB_NAME'
  ]);

export { configServiceMongo };
