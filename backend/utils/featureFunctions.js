export const nextBillingDate = () => {
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
  return oneMonthFromNow;
};
export const renewPlan = (user) => {
  const today = new Date();
  return !user?.nextBillingDate || user?.nextBillingDate <= today;
};
