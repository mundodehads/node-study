module.exports = {
  channelSubscriptionsAndRewards: [
    { channel: 'SPORTS', reward: 'CHAMPIONS_LEAGUE_FINAL_TICKET' },
    { channel: 'KIDS', reward: 'N/A' },
    { channel: 'MUSIC', reward: 'KARAOKE_PRO_MICROPHONE' },
    { channel: 'NEWS', reward: 'N/A' },
    { channel: 'MOVIES', reward: 'PIRATES_OF_THE_CARIBBEAN_COLLECTION' },
  ],
  eligibilityServiceMock: (accountNumber = 0) => ({
    0: 'Invalid account number exception',
    1: 'CUSTOMER_ELIGIBLE',
    2: 'CUSTOMER_INELIGIBLE',
    3: 'Technical failure exception',
  }[accountNumber] || 'Invalid account number exception'),
};
