const checkMillionDollarIdea = (req, res, next) => {
  const { numWeeks, weeklyRevenue } = req.body;
  if (isNaN(numWeeks) || isNaN(weeklyRevenue)) {
    res.status(400).send({ error: 'numWeeks and weeklyRevenue must be valid numbers!' });
  } else {
    const totalValue = Number(numWeeks) * Number(weeklyRevenue);
    if (totalValue < 1000000) {
      res.status(400).send({ error: 'Idea is not worth at least one million dollars!' });
    } else {
      next();
    }
  }
};
  
  // Leave this exports assignment so that the function can be used elsewhere
  module.exports = checkMillionDollarIdea;
  
  
  
