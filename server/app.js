const express = require('express');
const app = express();
const port = 3003;
const cors = require('cors');
app.use(cors());
const mysql = require('mysql');
const md5 = require('js-md5');
const uuid = require('uuid');
app.use(express.json({ limit: '50mb' }));


app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lesos',
});


const doAuth = function (req, res, next) {
  if (0 === req.url.indexOf('/admin')) {
    //admino routas
    const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
        `;
    con.query(sql, [req.headers['authorization'] || ''], (err, results) => {
      if (err) throw err;
      if (!results.length || results[0].role !== 'admin') {
        res.status(401).send({});
        req.connection.destroy();
      } else {
        next();
      }
    });
    //////////////////////////////
  } else if (
    0 === req.url.indexOf('/login-check') ||
    0 === req.url.indexOf('/login') ||
    0 == req.url.indexOf('/')
  ) {
    // kiti routai
    next();
  } 
};
app.use(doAuth);

// autorizacijos routai

app.get('/login-check', (req, res) => {
  let sql;
  let requests;
  if (req.query.role === 'admin') {
    sql = `
  SELECT
  name
  FROM users
  WHERE session = ? AND role = ?
  `;
    requests = [req.headers['authorization'] || '', req.query.role];
  }

  con.query(sql, requests, (err, result) => {
    if (err) throw err;
    if (!result.length) {
      res.send({ msg: 'error' });
    } else {
      res.send({ msg: 'ok' });
    }
  });
});

app.post('/login', (req, res) => {
  const key = uuid.v4();
  const sql = `
    UPDATE users
    SET session = ?
    WHERE name = ? AND pass = ?
    `;
  con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
    if (err) throw err;
    if (!result.affectedRows) {
      res.send({ msg: 'error', key: '' });
    } else {
      res.send({ msg: 'ok', key });
    }
  });
});

// create historys
app.post('/create', (req, res) => {
  const sql = `
    INSERT INTO istorijos
    ( title, content, max_sum, photo)
    VALUES ( ?, ?, ?, ?)
    `;
  con.query(
    sql,
    [req.body.title, req.body.content, req.body.maxSum, req.body.photo],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

// read historys
app.get('/historys', (req, res) => {
  const sql = `
  SELECT
  i.id, title, content, photo, GROUP_CONCAT(a.sum) AS aukos, max_sum, status
  FROM  istorijos AS i
  LEFT JOIN aukos AS a
  ON i.id = a.ist_id
  GROUP by i.id
  `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// read aukos
app.get('/aukos', (req, res) => {
  const sql = `
  SELECT
  *
  FROM  aukos
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// create aukos
app.post('/aukos', (req, res) => {
  const sql = `
    INSERT INTO aukos
    ( name, sum, ist_id)
    VALUES ( ?, ?, ?)
    `;
  con.query(
    sql,
    [req.body.name, req.body.sum, req.body.auk_id],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

// read historys
app.get('/admin/historys', (req, res) => {
  const sql = `
  SELECT
  i.id, title, content, photo, GROUP_CONCAT(a.sum) AS aukos, max_sum, status
  FROM  istorijos AS i
  LEFT JOIN aukos AS a
  ON i.id = a.ist_id
  GROUP by i.id
  `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//edit historys

app.put('/admin/historys/:id', (req, res) => {
  const sql = `
  UPDATE istorijos
  SET status = ?
  WHERE id = ?
  `;
  con.query(sql, [req.body.status, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// delete historys
app.delete('/admin/historys/:id', (req, res) => {
  const sql = `
  DELETE FROM istorijos
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// read aukos
app.get('/admin/aukos', (req, res) => {
  const sql = `
  SELECT
  *
  FROM  aukos
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});



app.listen(port, () => {
  console.log(`Lesas renkam ant ${port} porto`);
});
