import {createPool} from 'mysql'

export default async (req, res) => {
  const connection = createPool({
    connectionLimit : 10,
    host: '92.53.96.120',
    user: 'cd96578_psk',
    password: 'pn2Md3Zj',
    database: 'cd96578_psk',
    multipleStatements: true
  });

  connection.getConnection(err => { if (err) throw err; });

  await connection.query(`
    SELECT * FROM categories_categories;
    SELECT * FROM categories_products;
  `, function(err, rows, fields) {
    if (rows.length === 0) {
      res.status(404).json({})
      return
    }

    const result = rows[0].map(item => {
      item.callback = rows[1].filter(el => el.category_id === item.id ).length !== 0
      return item
    })
    
    res.status(200).json(result);
  })
}