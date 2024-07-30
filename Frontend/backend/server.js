const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import cors package
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());  // Use cors middleware to handle CORS issues

// Paths to data files
const usersFilePath = path.join(__dirname, 'users.json');
const logsFilePath = path.join(__dirname, 'logs.json');

// Helper function to log events
function logEvent(event, username, status) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    username,
    status
  };

  fs.readFile(logsFilePath, 'utf8', (err, data) => {
    if (err && err.code === 'ENOENT') {
      // If the file does not exist, create it with an empty array
      fs.writeFile(logsFilePath, JSON.stringify([logEntry], null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Error creating logs file:', err);
        }
      });
    } else if (err) {
      console.error('Error reading logs file:', err);
    } else {
      const logs = JSON.parse(data);
      logs.push(logEntry);

      fs.writeFile(logsFilePath, JSON.stringify(logs, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Error writing to logs file:', err);
        }
      });
    }
  });
}

// Registration endpoint
app.post('/api/register', (req, res) => {
  const { username, email, password, age } = req.body;

  if (!username || !email || !password || !age) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading users file:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const users = JSON.parse(data);
    const userExists = users.some(user => user.email === email);

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = { username, email, password, age };
    users.push(newUser);

    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing to users file:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      // Log the registration event
      logEvent('registration', username, 'success');
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading users file:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const users = JSON.parse(data);
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      // Log the login event
      logEvent('login', user.username, 'success');
      res.status(200).json({ message: 'Login successful' });
    } else {
      // Log the failed login attempt
      logEvent('login', email, 'failure');
      res.status(400).json({ error: 'Invalid email or password' });
    }
  });
});

// Admin endpoint to get logs
app.get('/api/admin/logs', (req, res) => {
  fs.readFile(logsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading logs file:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.status(200).json(JSON.parse(data));
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
