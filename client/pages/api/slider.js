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

  await connection.query('SELECT img_path FROM `categories_headerslider`', function(err, rows, fields) {
    if (rows.length === 0) {
      res.status(404).json([])
      return
    }

    res.status(200).json(rows);
  })
}