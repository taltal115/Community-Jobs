'use strict';

module.exports = {
  app: {
    title: 'RapidV',
    description: 'UI for supply/demand',
    keywords: 'publisher, advertiser, supply, demand',
    googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'GOOGLE_ANALYTICS_TRACKING_ID'
  },
  db: {
    promise: global.Promise
  },
  port: process.env.PORT || 3000,
  templateEngine: 'swig',
  // Session details
  // session expiration is set by default to 48 hours
  sessionExpiration:48 * (60 * 60 * 1000),
  // sessionSecret should be changed for security measures and concerns
  sessionSecret: 'COMMANDO',
  // sessionKey is set to the generic sessionId key used by PHP applications
  // for obsecurity reasons
  sessionKey: 'sessionId',
  sessionCollection: 'sessions',
  logo: 'modules/core/client/img/brand/logo.png',
  favicon: 'modules/core/client/img/brand/favicon.ico'
};
