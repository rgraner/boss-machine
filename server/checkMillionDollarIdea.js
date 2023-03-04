const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body;
    const totalValue = Number(numWeeks) * Number(weeklyRevenue);
    if (totalValue < 1000000) {
      res.status(400).send('Idea is not worth at least one million dollars!');
    } else {
      next();
    }
  };
  
  // Leave this exports assignment so that the function can be used elsewhere
  module.exports = checkMillionDollarIdea;
  
