import pool from '../utils/pool.js';

class Food {
  id;
  name;
  calories;
  country;

  constructor(row) {

    this.id = row.id;
    this.name = row.name;
    this.calories = row.calories;
    this.country = row.country;
  }


  static async insert({ name, calories, country }) {
    const { rows } = await pool.query(`
    INSERT INTO foods (name, calories, country)
    VALUES ($1, $2, $3)
    RETURNING *
    `, [name, calories, country]
    );
    return new Food(rows[0]);

  }

  static async findById(id) {
    const { rows } = await pool.query(`
    SELECT *
    FROM foods
    WHERE id = $1
    `, [id]
    );
    return new Food(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(`
    SELECT * FROM foods
    `);
    return rows.map(row => new Food(row));
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM foods
       WHERE id = $1
       RETURNING *`,
      [id]
    );
    return new Food(rows[0]);
  }

  static async put(name, calories, country, id) {
    const { rows } = await pool.query(`
    UPDATE foods
    SET name = $1,
        calories = $2,
        country = $3
    WHERE id = $4
    RETURNING *
    `, [name, calories, country, id]);
    return new Food(rows[0]);
  }

}

export default Food;
