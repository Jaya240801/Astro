import express from "express"
import mysql from "mysql"
import cors from "cors"
import midtransClient from "midtrans-client"

const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "codespace",
});

app.use(cors());
app.use(express.json());

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: 'SB-Mid-server-EHSak3_uAAvaFgT3QEG8w27I'
});

app.post('/create-transaction', async (req, res) => {
  const { amount, userEmail } = req.body;
 
  const parameter = {
    transaction_details: {
      order_id: 'order-' + new Date().getTime(),
      gross_amount: amount
    },
    credit_card: {
      secure: true
    },
    customer_details: {
      email : userEmail,
    }
  };

  try {
    const transaction = await snap.createTransaction(parameter);
    res.send({ transactionToken: transaction.token });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


app.post('/register', (req, res) => {
  const { email, username, password } = req.body;

  connection.query(
    'INSERT INTO login (email, username, password) VALUES (?, ?, ?)',
    [email, username, password],
    (error, results) => {
      if (error) res.send({ error });
      else return res.json(results);
    }
  );
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  connection.query(
    'SELECT * FROM login WHERE email = ? AND password = ?',
    [email, password],
    (error, results) => {
      if (error || results.length === 0) res.send({ error: 'Invalid credentials' });
      else res.send({ message: 'Logged in!', userEmail: email });
    }
  );
});

app.get('/product', (req, res) => {
  connection.query(
    'SELECT * FROM product',
    (error, results) => {
      if (error || results.length === 0) res.send({ error: 'Data not found!' });
      else res.send(results);
    }
  );
});

app.post('/save-order', (req, res) => {
  const { id_order, email, total_amount, status, orderDate, products } = req.body;

  connection.beginTransaction(function(err) {
    if (err) throw err;

    // Save to orders table
    connection.query('INSERT INTO orders (email, total_price, status, order_date) VALUES (?, ?, ?, ?)', [email, total_amount, status, orderDate], (error, results) => {
      if (error) {
        return connection.rollback(function() {
          throw error;
        });
      }

      const orderDetails = products.map(product => [id_order, product.id_product, product.price_product]);

      // Save to order_details table
      connection.query('INSERT INTO order_detail (id_order, id_product, price_product) VALUES ?', [orderDetails], (error, results) => {
        if (error) {
          return connection.rollback(function() {
            throw error;
          });
        }
        connection.commit(function(err) {
          if (err) {
            return connection.rollback(function() {
              throw err;
            });
          }
          res.send({ message: 'Order saved successfully!' });
        });
      });
    });
  });
});

app.listen(8800, () => {
  console.log('Server running on port 8800');
});