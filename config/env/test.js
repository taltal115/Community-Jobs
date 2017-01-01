'use strict';

var defaultEnvConfig = require('./default');

module.exports = {
  db: {
    uri: 'mongodb://localhost/mvs-ui',
    options: {
        user: 'admin',
        pass: 'DevOps!1'
    },
    // Enable mongoose debug mode
    debug: false
  },
  seats: {
    "Positive Mobile": {
      connection: {
        host: 'pm-kibana.ministerial5.com',
        auth: 'technology:isAwesome!',
        protocol: 'https',
        port: 443
      },
      prefix:'index'
    },
    "Ybrant Digital": {
      connection: {
        host: 'ym-kibana.ministerial5.com',
        auth: 'technology:isAwesome!',
        protocol: 'https',
        port: 443
      },
      prefix:'ym'
    },
    "Positive Mobile LATAM": {
      connection: {
        host: 'pml-kibana.ministerial5.com',
        auth: 'technology:isAwesome!',
        protocol: 'https',
        port: 443
      },
      prefix:'pml'
    },
    "Positive Mobile Israel": {
      connection: {
        host: 'il-kibana.ministerial5.com',
        auth: 'technology:isAwesome!',
        protocol: 'https',
        port: 443
      },
      prefix:'il'
    },
    "Web3": {
      connection: {
        host: 'web3-kibana.ministerial5.com',
        auth: 'technology:isAwesome!',
        protocol: 'https',
        port: 443
      },
      prefix:'web3'
    },
    "Tabascom": {
      connection: {
        host: 'tabascom-kibana.ministerial5.com',
        auth: 'technology:isAwesome!',
        protocol: 'https',
        port: 443
      },
      prefix:'tbcm'
    },
    "Literally": {
      connection: {
        host: 'ltr-kibana.ministerial5.com',
        auth: 'technology:isAwesome!',
        protocol: 'https',
        port: 443
      },
      prefix:'ltr'
    },
    "Matomy":{
      connection: {
        host: 'mtm-kibana.ministerial5.com',
        auth: 'technology:isAwesome!',
        protocol: 'https',
        port: 443
      },
      prefix:'mtm'
    }
  },
  reporting: {
    hosts: [
      '10.0.103.69:5000',
      '10.0.64.61:5000'
    ],
    keepAlive:true
  },
  port: 8080,
  app: {
    title: defaultEnvConfig.app.title + ' - Test Environment',
    test: true
  },
    mailer: {
        from: 'Positive Mobile - Rapid UI Test <rapidv@positivemobile.com>'
    },
    seedDB:false,
    secure: true,
    reportsDebug: true,
    alertsApi: {
        host: '10.0.101.85',
        token: '0fri7og195r3jlkt7fyplc7o4t4kjnlha983hps92t7l50l6py6jmk675ozl4i67',
        port: 8071
    },
    supplyReportApi: {
        host: '10.0.101.85',
        token: '0fri7og195r3jlkt7fyplc7o4t4kjnlha983hps92t7l50l6py6jmk675ozl4i72',
        port: 8072
    },
    demandReportApi: {
        host: '10.0.101.85',
        token: '0fri7og195r3jlkt7fyplc7o4t4kjnlha983hps92t7l50l6py6jmk675ozl4i73',
        port: 8073
    },
    scheduleReportApi: {
      host: '10.0.101.85',
      token: '0fri7og195r3jlkt7fyplc7o4t4kjnlha983hps92t7l50l6py6jmk675ozl4i74',
      port: 8074
    }
};
