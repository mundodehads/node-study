/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */

const { expect } = require('chai');
const redeemService = require('./redeemService');
const { eligibilityServiceMock } = require('./constants');

describe('Display customers available rewards', () => {
  describe('As a customer, if I am eligible for rewards, then I want to see which rewards are available based on my channel subscriptions', () => {
    it('Receive "CUSTOMER_ELIGIBLE" as output from Eligibility Service with "SPORTS" on portfolio', (done) => {
      const rewardsResult = redeemService({
        customerAccountNumber: 1,
        portfolio: ['SPORTS'],
        eligibilityService: eligibilityServiceMock,
      });

      expect(rewardsResult).to.have.property('data').with.lengthOf(1);
      expect(rewardsResult.data[0]).to.equal('CHAMPIONS_LEAGUE_FINAL_TICKET');
      done();
    });

    it('Receive "CUSTOMER_ELIGIBLE" as output from Eligibility Service with "KIDS" on portfolio', (done) => {
      const rewardsResult = redeemService({
        customerAccountNumber: 1,
        portfolio: ['KIDS'],
        eligibilityService: eligibilityServiceMock,
      });

      expect(rewardsResult).to.have.property('data').with.lengthOf(0);
      done();
    });

    it('Receive "CUSTOMER_ELIGIBLE" as output from Eligibility Service with "MUSIC" on portfolio', (done) => {
      const rewardsResult = redeemService({
        customerAccountNumber: 1,
        portfolio: ['MUSIC'],
        eligibilityService: eligibilityServiceMock,
      });

      expect(rewardsResult).to.have.property('data').with.lengthOf(1);
      expect(rewardsResult.data[0]).to.equal('KARAOKE_PRO_MICROPHONE');
      done();
    });

    it('Receive "CUSTOMER_ELIGIBLE" as output from Eligibility Service with "NEWS" on portfolio', (done) => {
      const rewardsResult = redeemService({
        customerAccountNumber: 1,
        portfolio: ['NEWS'],
        eligibilityService: eligibilityServiceMock,
      });

      expect(rewardsResult).to.have.property('data').with.lengthOf(0);
      done();
    });

    it('Receive "CUSTOMER_ELIGIBLE" as output from Eligibility Service with "MOVIES" on portfolio', (done) => {
      const rewardsResult = redeemService({
        customerAccountNumber: 1,
        portfolio: ['MOVIES'],
        eligibilityService: eligibilityServiceMock,
      });

      expect(rewardsResult).to.have.property('data').with.lengthOf(1);
      expect(rewardsResult.data[0]).to.equal('PIRATES_OF_THE_CARIBBEAN_COLLECTION');
      done();
    });

    it('Receive "CUSTOMER_ELIGIBLE" as output from Eligibility Service with "SPORTS, KIDS, MUSIC, NEWS and MOVIES" on portfolio', (done) => {
      const rewardsResult = redeemService({
        customerAccountNumber: 1,
        portfolio: ['SPORTS', 'KIDS', 'MUSIC', 'NEWS', 'MOVIES'],
        eligibilityService: eligibilityServiceMock,
      });

      expect(rewardsResult).to.have.property('data').with.lengthOf(3);
      expect(rewardsResult.data[0]).to.equal('CHAMPIONS_LEAGUE_FINAL_TICKET');
      expect(rewardsResult.data[1]).to.equal('KARAOKE_PRO_MICROPHONE');
      expect(rewardsResult.data[2]).to.equal('PIRATES_OF_THE_CARIBBEAN_COLLECTION');
      done();
    });

    it('Receive "CUSTOMER_INELIGIBLE" as output from Eligibility Service', (done) => {
      const rewardsResult = redeemService({
        customerAccountNumber: 2,
        portfolio: [],
        eligibilityService: eligibilityServiceMock,
      });

      expect(rewardsResult).to.have.property('data').with.lengthOf(0);
      done();
    });

    it('Receive "Technical failure exception" as output from Eligibility Service', (done) => {
      const rewardsResult = redeemService({
        customerAccountNumber: 3,
        portfolio: [],
        eligibilityService: eligibilityServiceMock,
      });

      expect(rewardsResult).to.have.property('data').with.lengthOf(0);
      done();
    });

    it('Receive "Invalid account number exception" as output from Eligibility Service', (done) => {
      const rewardsResult = redeemService({
        customerAccountNumber: 0,
        portfolio: [],
        eligibilityService: eligibilityServiceMock,
      });

      expect(rewardsResult).to.have.property('data').with.lengthOf(0);
      expect(rewardsResult).to.have.property('errors').with.lengthOf(1);
      expect(rewardsResult.errors[0]).to.equal('the account number is invalid');
      done();
    });
  });
});
