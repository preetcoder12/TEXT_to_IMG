const signupUser = (req, res) => {
    const { username, email, password } = req.body;
    res.json({ message: "User signed up", username, email });
};

const signinUser = (req, res) => {
    const { email, password } = req.body;
    res.json({ message: "User signed in", email });
};

module.exports = { signupUser, signinUser };
