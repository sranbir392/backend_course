const BearerTokenFinder = (header) => {
  if (!header) return null;
  const token = header.split("Bearer")[1].trim();
  return token;
};

module.exports = BearerTokenFinder;
