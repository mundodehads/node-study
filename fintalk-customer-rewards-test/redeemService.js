const { channelSubscriptionsAndRewards } = require('./constants');

function checkCustomerEligibility(customerAccountNumber, eligibilityService) {
  const eligibilityServiceOutput = eligibilityService(customerAccountNumber);

  const eligibilitys = {
    CUSTOMER_ELIGIBLE: () => (true),
    CUSTOMER_INELIGIBLE: () => { throw new Error(''); },
    'Technical failure exception': () => { throw new Error(''); },
    'Invalid account number exception': () => { throw new Error('the account number is invalid'); },
    default: () => { throw new Error(''); },
  };
  return (eligibilitys[eligibilityServiceOutput] || eligibilitys.default)();
}

function getRewardsByPortfolio(portfolio) {
  const rewards = [];

  portfolio.forEach((channelSubscription) => {
    const channelSubscriptionReward = channelSubscriptionsAndRewards.find(
      (value) => value.channel === channelSubscription,
    );

    if ((channelSubscriptionReward && channelSubscriptionReward.reward !== 'N/A')) {
      rewards.push(channelSubscriptionReward.reward);
    }
  });

  return rewards;
}

function rewardsService({ customerAccountNumber, portfolio, eligibilityService }) {
  let data = [];

  try {
    checkCustomerEligibility(customerAccountNumber, eligibilityService);
    data = getRewardsByPortfolio(portfolio);
  } catch (error) {
    return error.message
      ? { data, errors: [error.message] }
      : { data };
  }

  return { data };
}

module.exports = rewardsService;
