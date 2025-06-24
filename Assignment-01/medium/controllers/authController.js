const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const z = require('zod');

const signupSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

exports.signup = async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors });
  }

  const { username, email, password } = parsed.data;
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ message: 'User created', token });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors });
  }

  const { email, password } = parsed.data;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};
