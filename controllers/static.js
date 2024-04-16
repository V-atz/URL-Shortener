async function handleGoToSignUpPage(req, res) {
  return res.render("signup");
}

async function handleGoToLoginPage(req, res) {
  return res.render("login");
}

module.exports = {
  handleGoToSignUpPage,
  handleGoToLoginPage,
};
