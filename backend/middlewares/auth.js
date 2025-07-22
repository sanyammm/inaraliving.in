// Empty file or just remove the contents completely as we no longer need it

export default (req, res, next) => {
  next(); // This just passes the request through, essentially skipping any authentication
};
